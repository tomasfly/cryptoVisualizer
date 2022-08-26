const finnhub = require('finnhub');
const fs = require('fs');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'sandbox_c6jr27aad3ic1ei3q6i0';
// api_key.api_key = 'c988ciiad3ibrc521bg0';
const finnhubClient = new finnhub.DefaultApi();

// var ONE_DAY_MS = 86400000;
// var TEN_MINS_MS = 600000;

var toDate = new Date();
var toMilliseconds = Date.parse(toDate);
var fromMilliseconds = toMilliseconds - 5 * 60 * 1000;
fromDate = new Date(fromMilliseconds);

console.log(`toDate is ${toDate} fromDate is ${fromDate}`);

var outputFilPath = './outputData.json';
finnhubClient.stockCandles(
  'AAPL',
  'D',
  fromMilliseconds,
  toMilliseconds,
  (error, data, response) => {
    data.t.forEach((element) => {
      console.info(new Date(element));
    });

    if (fs.existsSync(outputFilPath)) {
      fs.unlinkSync(outputFilPath);
    }
    fs.writeFileSync(outputFilPath, JSON.stringify(data));
  }
);
