class VolumeAnalysis {

    coin
    isVolumeHigher
    percentageIncrement
    timeFrame
    averageVolume

    constructor(coin, isVolumeHigher, percentageIncrement, timeFrame,averageVolume) {
        this.coin = coin
        this.isVolumeHigher = isVolumeHigher
        this.percentageIncrement = percentageIncrement
        this.timeFrame = timeFrame
        this.averageVolume = averageVolume
    }
}

export default VolumeAnalysis