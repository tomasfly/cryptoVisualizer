import Volume from "../operations/volume"
import TaapiExchange from '../lib/taapiExchange'
import VolumeAlert from '../models/volumeAlert'

class VolumeAnalyzerPipeline {

    static async storeAlert(dbClient, volumeInfo, alertLog) {
        if (dbClient) {
            try {
                // this store object with more info
                // {"_id":{"$oid":"61add69d1081b8fb847562b4"},"coin":"NBS","isVolumeHigher":true,"percentageIncrement":{"$numberDouble":"2488.194845881574"},"interval":"1m","averageVolume":null,"lastVolume":{"$numberDouble":"1261605.8"},"timestamp":{"$numberDouble":"1.6387826206100E+12"}}
                await dbClient.addOneMinuteVolumeAlert(volumeInfo).catch(console.dir);
                // add just a string of what we log in console
                // Create alert object first and then add it to Mongodb
                let volumeAlert = new VolumeAlert(alertLog)
                await dbClient.addAlertLog(volumeAlert).catch(console.dir);
            } catch (error) {
                console.log(error)
            }

        }
    }

    static async iterateThroughCoins(interval, length, params, usdtList, dbClient = null) {
        console.log(`Starting to Analyze the volume of ${usdtList.length} coins at ${new Date().toISOString()} with params interval: ${interval} length:${length}`)
        for (let index = 0; index < usdtList.length; index++) {
            let volume = new Volume()
            let volumeInfo
            // Bring candles from stock exchange
            let response = await TaapiExchange.getCandlesAsync(usdtList[index], interval, length)
            if (response) {
                volumeInfo = volume.getVolume(response, usdtList[index], interval)
            }
            //log Volume only if actual volume is higher compared with the average of the last {length}
            if (volumeInfo) {


                if (volumeInfo.isVolumeHigher) {

                    // logic to print different colors
                    if (volumeInfo.percentageIncrement > 250.0 && volumeInfo.percentageIncrement < 500.0) {
                        let alertLog = `[INFO ${new Date().toISOString()}] VALUE LARGER THAN 250 for ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}${params}`
                        console.log(alertLog)
                        // Commenting this for now as we are not interested in low volume movements
                        if (dbClient) this.storeAlert(dbClient, volumeInfo,alertLog)
                    }

                    if (volumeInfo.percentageIncrement > 500.0 && volumeInfo.percentageIncrement < 1000.0) {
                        let alertLog = `[INFO ${new Date().toISOString()}] VALUE LARGER THAN 500 for ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}${params}`
                        console.log(alertLog)
                        // Commenting this for now. It will make it less verbose
                        if (dbClient) this.storeAlert(dbClient, volumeInfo,alertLog)
                    }

                    if (volumeInfo.percentageIncrement > 1000.0 && volumeInfo.percentageIncrement) {
                        let alertLog = `[INFO ${new Date().toISOString()}] VALUE LARGER THAN 1000 ${volumeInfo.coin} with an incremental percentage value of ${volumeInfo.percentageIncrement}${params}`
                        console.log(alertLog)
                        if (dbClient) this.storeAlert(dbClient, volumeInfo,alertLog)
                    }
                }
            }
        }
        console.log("Done retrieveing coins volume at " + new Date().toISOString())
    }
}

export default VolumeAnalyzerPipeline