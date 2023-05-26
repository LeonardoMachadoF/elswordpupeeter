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
    getHomeData();
}

main()