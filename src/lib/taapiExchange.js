// Require taapi
const taapi = require("taapi");

// Init
const exchangeData = taapi.exchangeData();

class TaapiExchange {
    static getCandles(symbol) {
        exchangeData.getCandles("binance", `${symbol}/USDT`, "1h", 0, 1).then(function (result) {
            console.log("Result: ", result);
        }).catch(function (error) {
            console.error(error);
        });
    }

    static async getCandlesAsync(symbol, interval, length) {
        let res
        try {
            res = await exchangeData.getCandles("binance", `${symbol}/USDT`, interval, 0, length);
        }
        catch (e) {
            //console.log(e)
        }
        return res
    }
}
export default TaapiExchange

