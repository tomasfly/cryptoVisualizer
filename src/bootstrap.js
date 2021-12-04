var colors = require('colors');
import './lib/taapi'
var fs = require('fs');
import VolumeAnalyzerPipeline from './pipelines/volumeAnalyzer'
import SMACrossAnalyzerPipeline from './pipelines/smaCrossAnalyzer'


class Bootstrap {

    timeframe
    candlesNumber
    params
    usdtList

    constructor(timeframe, candlesNumber) {
        if (!timeframe || !candlesNumber) {
            throw new Error("No params provided")
        }
        this.timeframe = timeframe
        this.candlesNumber = candlesNumber
        this.params = ` timeframe is ${timeframe} and candlesNumber is ${candlesNumber}`
        this.usdtList = JSON.parse(fs.readFileSync('allTargets', 'utf8'));
    }

    async launch() {
        console.log("Launching Crypto Analyzer".yellow)
        // await VolumeAnalyzerPipeline.iterateThroughCoins(this.timeframe, this.candlesNumber, this.params, this.usdtList)
        await SMACrossAnalyzerPipeline.iterateThroughCoins({ indicator: "sma", timeframe: this.timeframe, length: this.candlesNumber })
        console.log("Done running pipeline".yellow)
    }
}

export default Bootstrap