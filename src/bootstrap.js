import './lib/taapi';
var fs = require('fs');
import VolumeAnalyzerPipeline from './pipelines/volumeAnalyzer';
import SMACrossAnalyzerPipeline from './pipelines/smaCrossAnalyzer';
import RSIAnalyzer from './pipelines/rsiAnalyzer';
import MongoDB from './database/mongodb';

class Bootstrap {
  interval;
  length;
  params;
  usdtList;
  analysis;
  dbclient;

  constructor(interval, length, analysis) {
    if (!interval || !length) {
      throw new Error('No params provided');
    }
    this.interval = interval;
    this.length = length;
    this.params = ` interval is ${interval} and length is ${length}`;
    // List contaning stock market symbols
    this.usdtList = JSON.parse(fs.readFileSync('tickersParsed', 'utf8'));
    this.analysis = analysis;
    this.dbclient = new MongoDB();
  }

  async launch() {
    console.log('Launching Crypto Analyzer');
    switch (this.analysis) {
      case 'VolumeAnalyzer':
        await VolumeAnalyzerPipeline.iterateThroughCoins(
          this.interval,
          this.length,
          this.params,
          this.usdtList,
          this.dbclient
        );
        break;
      case 'SMAAnalyzer':
        // This one is under construction. Would be nice to leave it running to detect golden crosses
        // Under construction!!!!!
        await SMACrossAnalyzerPipeline.iterateThroughCoins({
          indicator: 'sma',
          interval: this.interval,
          usdtList: this.usdtList,
          dbClient: this.dbclient,
        });
        break;
      case 'RSIAnalyzer':
        await RSIAnalyzer.iterateThroughCoins({
          indicator: 'rsi',
          interval: this.interval,
          length: this.length,
          usdtList: this.usdtList,
          dbClient: this.dbclient,
        });
        break;
      default:
        throw new Error(
          `There is no analysis implemented for parameter ${analysis}`
        );
    }
    console.log('Done running pipeline');
  }
}

export default Bootstrap;
