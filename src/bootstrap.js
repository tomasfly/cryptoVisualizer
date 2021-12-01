import Taapi from './lib/taapi'
import TaapiExchange from './lib/taapiExchange'
import usdtList from './constants'
import Volume from './operations/volume'
var colors = require('colors');
import './lib/taapi'

class Bootstrap {

    timeframe = "1m"
    candlesNumber = 10
    async launch() {
        console.log("launching".yellow)
        // Iterate through list of coins 

        // usdtList.forEach(coin => {            
        //     let volume = new Volume()            
        //     let response = await TaapiExchange.getCandlesAsync(coin,timeframe,10)
        //     let volumeInfo = volume.getVolume(response,coin,timeframe)
        //     console.log(volumeInfo)
        // });
        while (true) {
            console.log("Starting to retrieve coins volume at " + new Date().toISOString() + `with params timeframe: ${this.timeframe} candlesNumber:${this.candlesNumber}`)
            for (let index = 0; index < usdtList.length; index++) {
                let volume = new Volume()
                let volumeInfo
                let response = await TaapiExchange.getCandlesAsync(usdtList[index], this.timeframe, this.candlesNumber)
                if (response) {
                    volumeInfo = volume.getVolume(response, usdtList[index], this.timeframe)
                }
                //log Volume only if actual volume is higher compared with the average of the last {candlesNumber}
                if (volumeInfo) {
                    if (volumeInfo.isVolumeHigher) {
                        // logic to print different colors
                        if (volumeInfo.percentageIncrement > 250.0 && volumeInfo.percentageIncrement < 500.0) {
                            console.log(`[INFO ${new Date().toISOString()}] VALUE LARGER THAN 250 for ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}`.green)
                        }

                        if (volumeInfo.percentageIncrement > 500.0 && volumeInfo.percentageIncrement < 1000.0) {
                            console.log(`[INFO ${new Date().toISOString()}] VALUE LARGER THAN 500 for ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}`.yellow)
                        }

                        if (volumeInfo.percentageIncrement > 1000.0 && volumeInfo.percentageIncrement) {
                            console.log(`[INFO ${new Date().toISOString()}] VALUE LARGER THAN 1000 ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}`.red)
                        }
                    }
                }
            }
            console.log("Done retrieveing coins volume at " + new Date().toISOString())
        }
    }
}

export default Bootstrap
// CryptoList.getListUSDT()
// CryptoList.getFullList()
// Taapi.getIndicator()
// Warning! DDoSProtection: binance 418 I'm a teapot {"code":-1003,"msg":"Way too much request weight used; IP banned until 1638341192949. Please use the websocket for live updates to avoid bans."}
// usdtList.forEach(element => {
//     TaapiExchange.getCandles(element) 
// });