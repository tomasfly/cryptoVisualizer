import Taapi from '../lib/taapi'
import SMACalculations from '../operations/SMACalculations'
var colors = require('colors')

// Leaving this for now. These golden crosses look good backtested with 1D candles but it will depend if market is bullish or bearish. Not so reliable as expected 
class SMACrossAnalyzerPipeline {
    // Hardcoding for now the slow and fast lines to use values 20 and 50. The goal is to find out if these averages are getting closer
    static async iterateThroughCoins({ indicator: indicator, interval: interval, fastLength: fastLength, slowLength: slowLength }) {
        let calculations = new SMACalculations()

        // Pending to iterate through coins. For now hardcoding this. This is not being used in cloud servers for now
        let coin = "BTC"

        // Hardcoded 20 Value
        let fastLengthSMA = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: coin, interval: interval, length: 20 })

        // Hardcoded 50 value
        let slowLengthSMA = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: coin, interval: interval, length: 50 })
        let diff = calculations.calculateDifferenceBetweenAverages(fastLengthSMA.value, slowLengthSMA.value)
        console.log(`The difference for ${coin} between 20 sma and 50 sma with interval ${interval} is ${diff}`.red)
    }
}

export default SMACrossAnalyzerPipeline