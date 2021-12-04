//https://www.npmjs.com/package/taapi
import { client as _client } from "taapi";
require('dotenv').config()
const client = _client(process.env.TAAPI_KEY);

class Taapi {
    Taapi() { }

    // Async version
    static async getIndicatorAsync({ indicator: indicator, exchange: exchange, coin: coin, interval: interval, length: length }) {
        return await client.getIndicator(indicator, exchange, `${coin}/USDT`, interval, { optInTimePeriod: length })
    }

    // Same function but with promise resolve
    // static getIndicator({ indicator: indicator, exchange: exchange, coin: coin, interval: interval }) {
    //     client.getIndicator(indicator, exchange, `${coin}/USDT`, interval).then(function (result) {
    //         console.log("Result: ", result);
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }
}

export default Taapi