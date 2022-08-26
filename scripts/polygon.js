import { restClient } from '@polygon.io/client-js';
import fs from 'fs';

const rest = restClient('_gTvIm5t09RBcsBsS_RO3UFAzMRsUH6W');

class Polygon {
  static async getCandlesAsync(symbol, interval, len) {
    let res;
    var todayDate = new Date().toISOString().slice(0, 10);
    res = await rest.stocks.aggregates(
      symbol,
      interval,
      'minute',
      todayDate,
      todayDate,
      {
        sort: 'asc',
      }
    );
    if (fs.existsSync('./stockSampleFull.json'))
      fs.unlinkSync('./stockSampleFull.json');
    fs.writeFileSync('./stockSampleFull.json', JSON.stringify(res.results));
    let returningValue = res.results.slice(
      res.results.length - len,
      res.results.length
    );

    return returningValue;
  }
}
async function getCandle() {
  const response = await Polygon.getCandlesAsync('MSFT', 1, 10);
  if (fs.existsSync('./stockSample.json')) fs.unlinkSync('./stockSample.json');
  fs.writeFileSync('./stockSample.json', JSON.stringify(response));
}
getCandle();
