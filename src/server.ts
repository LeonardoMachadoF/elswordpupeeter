import { getHomeData } from "./libs/getHomeData";
import { getNewsData } from "./libs/getNewsData";
import { getRankingData } from "./libs/getRankingData";
import fs from 'fs';
import news from './news.json'

let functions = {
    getHomeData: getHomeData,
    getRankingData: getRankingData,
    getNewsData: getNewsData
}

function main() {
    let pureNews: {
        imageUrl: string;
        linkToNews: string;
        type: string;
        title: string;
        data: string;
        categoryLink: string;
        resume: string;
    }[] = [];

    news.map((i) => {
        let res = pureNews.every((pure) => pure.title !== i.title);
        if (res) {
            pureNews.push(i);
        }
    })

    fs.writeFile('all.json', JSON.stringify(pureNews, null, 2), (err: NodeJS.ErrnoException | null) => {
        if (err) throw err;
        console.log('O arquivo foi criado!');
    })
}

main()