class VolumeAnalysis {

    coin
    isVolumeHigher
    percentageIncrement
    timeFrame
    averageVolume
    lastVolume

    constructor(coin, isVolumeHigher, percentageIncrement, timeFrame, lastVolume) {
        this.coin = coin
        this.isVolumeHigher = isVolumeHigher
        this.percentageIncrement = percentageIncrement
        this.timeFrame = timeFrame
        this.lastVolume = lastVolume
    }
}

export default VolumeAnalysis