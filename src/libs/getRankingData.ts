import puppeteer from "puppeteer";
import fs from 'fs';

export const getRankingData = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://elsword.koggames.com/community/rankings/', { waitUntil: 'load', timeout: 0 });
    await new Promise((resolve) => setTimeout(resolve, 3000))
    let relatorio: any = [];


    for (let i = 0; i < 167; i++) {
        let res = await page.evaluate(async () => {
            let pageOfUsers: any = [];
            await new Promise((resolve) => setTimeout(resolve, 500))

            let users = await document.querySelectorAll('tbody tr');
            for (let i = 0; i < users.length; i++) {
                let fetchedUser = {
                    rank: '',
                    img: '',
                    name: '',
                    classe: '',
                    level: '',
                    pvpRank: '',
                    wins: ''
                }

                fetchedUser.img = users[i].children[1].children[0].getAttribute('src') as string;;
                fetchedUser.name = users[i].children[1].children[1].innerHTML;
                fetchedUser.classe = users[i].children[2].innerHTML;
                fetchedUser.level = [...users[i].children[3].children][0].innerHTML;
                fetchedUser.pvpRank = users[i].children[4].children[0].getAttribute('src') as string;
                fetchedUser.wins = users[i].children[5].innerHTML;

                let childrens = [...users[i].children];
                if ([...childrens[0].children].length > 0) {
                    fetchedUser.rank = childrens[0].children[0].getAttribute('src') as string;

                } else {
                    fetchedUser.rank = users[i]?.firstElementChild?.innerHTML as string
                }
                pageOfUsers.push(fetchedUser)
            }


            let active: any = await document.querySelector("#right_nav > a.next");
            await new Promise((resolve) => setTimeout(resolve, 500))
            active.click();
            return pageOfUsers;
        })

        relatorio = [...relatorio, ...res]
    }

    fs.writeFile('char.json', JSON.stringify(relatorio, null, 2), (err) => {
        if (err) throw err;
        console.log('O arquivo foi criado!');
    })
}