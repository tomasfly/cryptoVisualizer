import Taapi from '../lib/taapi'

class SMACrossAnalyzerPipeline {
    static async iterateThroughCoins({ indicator: indicator, timeframe: timeframe, length: length }) {
        let res = await Taapi.getIndicatorAsync({ indicator: indicator, exchange: "binance", coin: "BTC", timeframe: timeframe, length: length })
        console.log(res)
    }
}

export default SMACrossAnalyzerPipeline