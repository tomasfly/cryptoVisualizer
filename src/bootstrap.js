var colors = require('colors');
import './lib/taapi'
var fs = require('fs');
import VolumeAnalyzerPipeline from './pipelines/volumeAnalyzer'
import SMACrossAnalyzerPipeline from './pipelines/smaCrossAnalyzer'


class Bootstrap {

    interval
    length
    params
    usdtList
    analysis

    constructor(interval, length, analysis) {
        if (!interval || !length) {
            throw new Error("No params provided")
        }
        this.interval = interval
        this.length = length
        this.params = ` interval is ${interval} and length is ${length}`
        this.usdtList = JSON.parse(fs.readFileSync('allTargets', 'utf8'));
        this.analysis = analysis
    }

    async launch() {
        console.log("Launching Crypto Analyzer".yellow)
        switch (this.analysis) {
            case 'VolumeAnalyzer':
                await VolumeAnalyzerPipeline.iterateThroughCoins(this.interval, this.length, this.params, this.usdtList)
                break
            case 'SMAAnalyzer':
                await SMACrossAnalyzerPipeline.iterateThroughCoins({ indicator: "sma", interval: this.interval, length: this.length })
                break
            default:
                throw new Error(`There is no analysis implemented for parameter ${analysis}`)
        }
        console.log("Done running pipeline".yellow)
    }
}

export default Bootstrap