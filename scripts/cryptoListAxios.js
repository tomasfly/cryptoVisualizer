const axios = require('axios');
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
        axios.get(options.url)
            .then(function (response) {
                var symbols = response.data.symbols
                var justUSDTpairs = symbols.map((x) => {
                    if (x.quoteAsset.includes(quote)) {
                        return x.baseAsset
                    }
                }).filter((x) => { if (x) { return x } })
                fs.writeFileSync('allTargets', JSON.stringify(justUSDTpairs))
            });
    }

    static getFullList() {
        axios.get(options.url)
            .then(function (response) {
                var symbols = response.data.symbols
                var justUSDTpairs = symbols.map((x) => {
                    return x.baseAsset
                }).filter((x) => { if (x) { return x } })
                fs.writeFileSync('allTargets', JSON.stringify(justUSDTpairs))
            });
    }
}

CryptoList.getListUSDT();