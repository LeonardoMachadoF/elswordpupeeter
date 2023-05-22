import { getHomeData } from "./libs/getHomeData";
import { getNewsData } from "./libs/getNewsData";
import { getRankingData } from "./libs/getRankingData";
import fs from 'fs';
import news from './news.json'
import chars from './el.json'

let functions = {
    getHomeData: getHomeData,
    getRankingData: getRankingData,
    getNewsData: getNewsData
}

function main() {
    // let pureNews: {
    //     imageUrl: string;
    //     linkToNews: string;
    //     type: string;
    //     title: string;
    //     data: string;
    //     categoryLink: string;
    //     resume: string;
    // }[] = [];

    // news.map((i) => {
    //     let res = pureNews.every((pure) => pure.title !== i.title);
    //     if (res) {
    //         pureNews.push(i);
    //     }
    // })

    // fs.writeFile('all.json', JSON.stringify(pureNews, null, 2), (err: NodeJS.ErrnoException | null) => {
    //     if (err) throw err;
    //     console.log('O arquivo foi criado!');
    // })
    getHomeData()

    // let format:
    //     {
    //         name: string;
    //         alias: string;
    //         classes: {
    //             path: number;
    //             name: string;
    //             description: string;
    //             imageUrl: string;
    //             portrait: string;
    //         }[];
    //         portrait: string;
    //         videoUrl: string;
    //     }[]
    //     = [];

    // let classes: { character: string, class: string, path: number, portrait: string }[] = [];
    // chars.forEach(char => {
    //     char.classes.forEach(classe => {
    //         classes.push({ character: char.name[0].toUpperCase() + char.name.substring(1), class: classe.name, path: classe.path, portrait: classe.portrait })
    //     })
    // })

}

main()