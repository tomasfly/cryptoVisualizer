import Taapi from '../lib/taapi'
import SMACalculations from '../operations/SMACalculations'
var colors = require('colors')

// Leaving this for now. These golden crosses look good backtested with 1D candles but it will depend if market is bullish or bearish. Not so reliable as expected 
class SMACrossAnalyzerPipeline {

    static async storeAlert(dbClient, smaInfo) {
        if (dbClient) {
            try {
                dbClient.updateSMAValue(smaInfo)

            } catch (error) {
                console.log(error)
            }

        }
    }

    // Hardcoding for now the slow and fast lines to use values 20 and 50. The goal is to find out if these averages are getting closer
    static async iterateThroughCoins({ indicator: indicator, interval: interval, usdtList: usdtList, dbClient: dbClient }) {
        let calculations = new SMACalculations()

        for (let index = 0; index < usdtList.length; index++) {
            try {
                // Hardcoded 50 value
                let fastLengthSMA = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: usdtList[index], interval: interval, length: 20 })

                // Hardcoded 50 value
                let slowLengthSMA = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: usdtList[index], interval: interval, length: 50 })

                let diff = calculations.calculateDifferenceBetweenAverages(fastLengthSMA.value, slowLengthSMA.value)

                this.storeAlert(dbClient, { smasDifference: diff, interval: interval, coin: usdtList[index] })

                console.log(`The difference for ${usdtList[index]} between 20 sma and 50 sma with interval ${interval} is ${diff}`.red)
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}

export default SMACrossAnalyzerPipeline