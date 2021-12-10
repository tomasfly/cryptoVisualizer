const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_CONNECTION_STRING;
require('dotenv').config()

class MongoDB {

    client

    constructor() {
    }

    // this one adds an what we log in the console. Something like:
    // [INFO 2021-12-06T09:26:30.336Z] VALUE LARGER THAN 500 for ALPACA with an incremental percentage value of 761.1107580860393 interval is 1m and length is 10

    async addAlertLog(log) {
        let client
        try {
            client = await MongoClient.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                tls: true,
                tlsCAFile: "./ca-certificate.crt"
            }).catch(err => { console.log(err); });
            let db = client.db('test')
            let col = db.collection("log")
            let insertValue = { log: log, timestamp: Date.now() }
            await col.insertOne(insertValue)
        } finally {
            await client.close()
        }
    }

    async updateSMAValue(smaInfo) {
        // Stores difference between 20 and 50 SMAs
        let client
        try {
            client = await MongoClient.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                tls: true,
                tlsCAFile: "./ca-certificate.crt"
            }).catch(err => { console.log(err); });
            let db = client.db('test')
            let col = db.collection("sma")
            await col.updateOne(
                {
                    coin: smaInfo.coin,
                    interval: smaInfo.interval
                },
                {
                    $set: {
                        smaDifference: smaInfo.smasDifference
                    }
                },
                {
                    upsert: true
                }
            )
        } finally {
            await client.close()
        }
    }

    async updateRSIValue(rsiInfo) {
        let client
        try {
            client = await MongoClient.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                tls: true,
                tlsCAFile: "./ca-certificate.crt"
            }).catch(err => { console.log(err); });
            let db = client.db('test')
            let col = db.collection("rsi")
            await col.updateOne(
                {
                    coin: rsiInfo.coin,
                    interval: rsiInfo.interval
                },
                {
                    $set: {
                        rsi: rsiInfo.rsi
                    }
                },
                {
                    upsert: true
                }
            )
        } finally {
            await client.close()
        }
    }

    // this one adds an object
    async addOneMinuteVolumeAlert(volumeAlert) {
        let client
        try {
            client = await MongoClient.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                tls: true,
                tlsCAFile: "./ca-certificate.crt"
            }).catch(err => { console.log(err); });
            let db = client.db("test")
            let col = db.collection("alerts")
            await col.insertOne(volumeAlert)
        } finally {
            await client.close()
        }
    }
}

export default MongoDB