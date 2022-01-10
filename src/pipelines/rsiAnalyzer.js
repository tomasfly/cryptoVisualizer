import Taapi from '../lib/taapi'

class RSIAnalyzer {

    static async storeAlert(dbClient, rsiInfo) {
        if (dbClient) {
            try {
                dbClient.updateRSIValue(rsiInfo)

            } catch (error) {
                console.log(error)
            }

        }
    }

    static async iterateThroughCoins({ indicator: indicator, interval: interval, length: length, usdtList: usdtList, dbClient: dbClient }) {

        let rsi = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: "BTC", interval: interval, length: length })
        // Store value in DB. If exists, update it. Then in FE we plan to show all the list of RSIs descendant to see extreme values for opportunities
        this.storeAlert(dbClient, { rsi: rsi.value, interval: interval, coin: "BTC" })

        for (let index = 0; index < usdtList.length; index++) {
            try {
                let rsi = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: usdtList[index], interval: interval, length: length })
                // Store value in DB. If exists, update it. Then in FE we plan to show all the list of RSIs descendant to see extreme values for opportunities
                console.log(rsi)
                this.storeAlert(dbClient, { rsi: rsi.value, interval: interval, coin: usdtList[index] })
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}

export default RSIAnalyzer