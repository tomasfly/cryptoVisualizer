const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_CONNECTION_STRING;
require('dotenv').config()

class MongoDB {

    client

    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    // this one adds an what we log in the console. Something like:
    // [INFO 2021-12-06T09:26:30.336Z] VALUE LARGER THAN 500 for ALPACA with an incremental percentage value of 761.1107580860393 interval is 1m and length is 10

    async addAlertLog(log) {

        try {
            this.client = await MongoClient.connect(uri, { useNewUrlParser: true }).catch(err => { console.log(err); });
            let db = this.client.db("test")
            let col = db.collection("log")
            let insertValue = { log: log, timestamp: Date.now() }
            await col.insertOne(insertValue)
            await this.client.close()

        } catch (error) {
            console.log(error)
        }
    }

    // this one adds an object
    async addOneMinuteVolumeAlert(volumeAlert) {

        try {
            this.client = await MongoClient.connect(uri, { useNewUrlParser: true }).catch(err => { console.log(err); });
            let db = this.client.db("test")
            let col = db.collection("alerts")
            await col.insertOne(volumeAlert)
            await this.client.close()

        } catch (error) {
            console.log(error)
        }
    }
}

export default MongoDB