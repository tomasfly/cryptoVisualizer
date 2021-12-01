//https://www.npmjs.com/package/taapi
import { client as _client } from "taapi";
require('dotenv').config()
const client = _client(process.env.TAAPI_KEY);

class Taapi {
    Taapi() { }

    // This method does nothing relevant for now. Just testing what the API responds
    static getIndicator() {
        client.getIndicator("rsi", "binance", "XMR/USDT", "1h").then(function (result) {
            console.log("Result: ", result);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

export default Taapi