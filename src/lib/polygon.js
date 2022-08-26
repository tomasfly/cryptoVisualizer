import { restClient } from '@polygon.io/client-js';

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
    let returningValue;
    if (res.results) {
      try {
        returningValue = res.results.slice(
          res.results.length - len,
          res.results.length
        );
      } catch {}
    }

    return returningValue;
  }
}

export default Polygon;
