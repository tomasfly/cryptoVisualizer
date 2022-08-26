// https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=_gTvIm5t09RBcsBsS_RO3UFAzMRsUH6W

import fs from 'fs';

let res = JSON.parse(fs.readFileSync('./allTickers.json'));
let tickersList = [];

// console.log(res.tickers);

res.tickers.forEach((element) => {
  tickersList.push(element.ticker);
});

// console.log(tickersList);

fs.writeFileSync('./tickersParsed', JSON.stringify(tickersList));
