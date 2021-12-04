import Volume from "../operations/volume"
import TaapiExchange from '../lib/taapiExchange'
var colors = require('colors')

class VolumeAnalyzerPipeline {
    static async iterateThroughCoins(timeframe, candlesNumber, params, usdtList) {
        console.log(`Starting to Analyze the volume of ${usdtList.length} coins at ${new Date().toISOString()} with params timeframe: ${timeframe} candlesNumber:${candlesNumber}`)
        for (let index = 0; index < usdtList.length; index++) {
            let volume = new Volume()
            let volumeInfo
            let response = await TaapiExchange.getCandlesAsync(usdtList[index], timeframe, candlesNumber)
            if (response) {
                volumeInfo = volume.getVolume(response, usdtList[index], timeframe)
            }
            //log Volume only if actual volume is higher compared with the average of the last {candlesNumber}
            if (volumeInfo) {
                if (volumeInfo.isVolumeHigher) {
                    // logic to print different colors
                    if (volumeInfo.percentageIncrement > 250.0 && volumeInfo.percentageIncrement < 500.0) {
                        console.log(`[INFO ${new Date().toISOString()}] VALUE LARGER THAN 250 for ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}${params}`.green)
                    }

                    if (volumeInfo.percentageIncrement > 500.0 && volumeInfo.percentageIncrement < 1000.0) {
                        console.log(`[INFO ${new Date().toISOString()}] VALUE LARGER THAN 500 for ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}${params}`.yellow)
                    }

                    if (volumeInfo.percentageIncrement > 1000.0 && volumeInfo.percentageIncrement) {
                        console.log(`[INFO ${new Date().toISOString()}] VALUE LARGER THAN 1000 ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}${params}`.red)
                    }
                }
            }
        }
        console.log("Done retrieveing coins volume at " + new Date().toISOString())
    }
}

export default VolumeAnalyzerPipeline