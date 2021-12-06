class VolumeAnalysis {

    coin
    isVolumeHigher
    percentageIncrement
    interval
    averageVolume
    lastVolume
    timestamp

    constructor(coin, isVolumeHigher, percentageIncrement, interval, lastVolume) {
        this.coin = coin
        this.isVolumeHigher = isVolumeHigher
        this.percentageIncrement = percentageIncrement
        this.interval = interval
        this.lastVolume = lastVolume
        this.timestamp = Date.now()
    }
}

export default VolumeAnalysis