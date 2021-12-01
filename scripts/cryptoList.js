// Script to get list of symbols from Binance
// Source: https://stackoverflow.com/questions/55549499/how-to-retrieve-a-list-of-all-market-pairs-like-eth-btc-using-binance-api
var request = require('request');
var fs = require('fs')
var quote = "USDT"
var options = {
    'method': 'GET',
    'url': 'https://api.binance.com/api/v1/exchangeInfo',
    'headers': {
    }
};

class CryptoList {

    static getListUSDT() {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var symbols = JSON.parse(response.body).symbols
            var justUSDTpairs = symbols.map((x) => {
                if (x.quoteAsset.includes(quote)) {
                    return x.baseAsset
                }
            }).filter((x) => { if (x) { return x } })
            fs.writeFileSync('allTargets', JSON.stringify(justUSDTpairs))
        });
    }

    static getFullList() {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var symbols = JSON.parse(response.body).symbols
            var justUSDTpairs = symbols.map((x) => {
                    return x.baseAsset
            }).filter((x) => { if (x) { return x } })
            fs.writeFileSync('allTargets', JSON.stringify(justUSDTpairs))
        });
    }
}

CryptoList.getFullList()
// export default CryptoList