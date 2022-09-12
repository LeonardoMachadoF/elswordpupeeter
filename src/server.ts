import puppeteer from 'puppeteer';
import fs from 'fs';
import { json } from 'express';

export type ClassType = {
    path: number;
    name: string;
    description: string;
    imageUrl: string;
    portrait: string;
}

export type Character = {
    name: string;
    alias: string;
    classes: ClassType[];
    portrait: string;
    videoUrl: string;
}

const getData = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://elsword.koggames.com/', { waitUntil: 'networkidle2', timeout: 0 });
    const characters = await page.$$('#character-select ul li')
    const classes = await page.$$('#characters > div.et_pb_column.et_pb_column_1_3.et_pb_column_7.et_pb_css_mix_blend_mode_passthrough.et-last-child > div.et_pb_module.et_pb_code.et_pb_code_3.character-paths > div > ul > li > img')
    let relatorio: Character[] = [];

    let logos: any = [];
    let links: any = [];

    for (let i in characters) {
        let character: Character = {
            name: '',
            alias: '',
            classes: [
                {
                    path: 0,
                    name: '',
                    description: '',
                    imageUrl: '',
                    portrait: '',
                },
                {
                    path: 0,
                    name: '',
                    description: '',
                    imageUrl: '',
                    portrait: '',
                },
                {
                    path: 0,
                    name: '',
                    description: '',
                    imageUrl: '',
                    portrait: '',
                },
            ],
            portrait: '',
            videoUrl: ''
        }

        await characters[i].click();
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const { name, portrait } = await characters[i].evaluate((i) => {
            let charName = i.firstElementChild?.getAttribute('alt');
            let portrait = i.firstElementChild?.getAttribute('src');
            return { name: charName, portrait: `https://elsword.koggames.com${portrait}` }
        })
        character.name = (name as string);
        character.portrait = (portrait as string);

        let video = await page.$('#widget2');
        let url = await video?.evaluate((e: any) => e.src);
        character.videoUrl = url;

        for (let k = 0; k < 3; k++) {
            await classes[k].click()
            await new Promise((resolve) => setTimeout(resolve, 1000))
            let { alias, description, name } = await page.evaluate(async () => {
                const items = [...document.querySelectorAll("#characters > div.et_pb_column.et_pb_column_1_3.et_pb_column_7.et_pb_css_mix_blend_mode_passthrough.et-last-child div p")]
                let name = items[1].innerHTML;
                let description = items[2].innerHTML
                let alias = items[0].innerHTML

                return { alias, description, name }
            })
            character.alias = alias;
            character.classes[k].path = k + 1;
            character.classes[k].description = description;
            character.classes[k].name = name

            let { portrait } = await classes[k].evaluate((z) => {
                return { portrait: (z.getAttribute('src') as string) }
            })
            character.classes[k].portrait = portrait

            let list = await page.evaluate(() => {
                let lista = [...document.querySelectorAll("#character-preview > div.et_pb_module.et_pb_image span img")];
                let listOfLinks: any = [];
                lista.map((i, z) => {
                    listOfLinks.push(i.getAttribute('src'))
                })
                return listOfLinks;
            })
            logos.push([...list]);

        }

        relatorio.push(character);
    }

    logos.map((i: any) => {
        i.map((link: any) => {
            links.push(link)
        })
    })

    let repetido: any = [];
    relatorio.map((character: Character) => {
        links.map((i: string) => {
            if (i.indexOf(character.name) > -1) {
                repetido.push(i)
            }
        })
    })

    let newArray = [...new Set(repetido)]


    relatorio.map((i: Character) => {
        i.classes.map((z: ClassType) => {
            newArray.map((k: any) => {
                if (k.indexOf(i.name) > -1 && (k.indexOf(`${z.path.toString()}st`) > -1 || k.indexOf(`${z.path.toString()}nd`) > -1 || k.indexOf(`${z.path.toString()}rd`) > -1)) {
                    z.imageUrl = k
                }
            })
        })
    })

    fs.writeFile('el.json', JSON.stringify(relatorio, null, 2), (err) => {
        if (err) throw err;
        console.log('O arquivo foi criado!');
    })

};

getData()