import { getHomeData } from "./libs/getHomeData";
import { getNewsData } from "./libs/getNewsData";
import { getRankingData } from "./libs/getRankingData";

let functions = {
    getHomeData: getHomeData,
    getRankingData: getRankingData,
    getNewsData: getNewsData
}

function main() {

    getNewsData()
}

main()