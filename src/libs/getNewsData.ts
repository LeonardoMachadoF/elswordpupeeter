import puppeteer from "puppeteer";
import fs from 'fs';

export const getNewsData = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://elsword.koggames.com/news/', { waitUntil: 'networkidle2', timeout: 0 });
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let relatorio = await page.evaluate(async () => {
        const news = [...document.querySelectorAll(".column article")];
        const newsFinal: any[] = [];

        for (let i = 0; i < 26; i++) {
            await new Promise((resolve) => setTimeout(resolve, 5000))
            let next: any = document.querySelector('.current')!.nextElementSibling;
            news.map((i: Element) => {
                let news: {
                    imageUrl: string;
                    linkToNews: string;
                    type: string;
                    title: string;
                    data: string;
                    categoryLink: string;
                    resume: string,
                } = {
                    imageUrl: '',
                    linkToNews: '',
                    type: '',
                    title: '',
                    data: '',
                    categoryLink: '',
                    resume: '',
                }


                news.imageUrl = i.children[0].children[0].children[0].getAttribute('src') as string;
                news.linkToNews = i.children[1].children[0].getAttribute('href') as string;
                news.type = i.children[1].children[0].children[0].innerHTML as string;
                news.title = i.children[1].children[0].innerHTML.split('>')[i.children[1].children[0].innerHTML.split('>').length - 1] as string;
                news.data = i.children[2].children[0].innerHTML as string;
                news.categoryLink = i.children[2].children[1].getAttribute('href') as string;
                news.resume = i.children[3].children[0].children[0].innerHTML as string;

                newsFinal.push(news)
            })
            await new Promise((resolve) => setTimeout(resolve, 2000))
            i !== 25 ? next.click() : "";
        }


        return JSON.stringify(newsFinal, null, 2);
    })

    fs.writeFile('news.json', relatorio, (err: NodeJS.ErrnoException | null) => {
        if (err) throw err;
        console.log('O arquivo foi criado!');
    })
}