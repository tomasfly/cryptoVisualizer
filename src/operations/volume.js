import VolumeAnalysis from "../models/volumeAverage";

class Volume {   

    getVolumeList(response) {
        let volumeList = []
        response.forEach(element => {
            volumeList.push(element.volume)
        });
        return volumeList
    }

    getVolume(response, coin, timeframe) {
        // Fill up array with volumes for this coin
        let volumeList
        let count
        let lastVolume
        let volumeInfo
        // Get the array with volumes
        volumeList = this.getVolumeList(response)

        count = volumeList.length

        if (count > 0)
        {
            lastVolume = volumeList.pop(count)
            let volumeIncrementPercentage = this.getVolumeIncrementPercentage(volumeList, lastVolume)
            // create VolumeAnalysis instance
            let isVolumeHigher = lastVolume > volumeIncrementPercentage
            volumeInfo = new VolumeAnalysis(coin, isVolumeHigher, volumeIncrementPercentage, timeframe)
        }

        return volumeInfo
    }

    getAverageOfVolume(volumeList) {
        return volumeList.reduce((a, b) => a + b) / volumeList.length
    }

    getVolumeIncrementPercentage(volumeList, newVolume) {
        let percentageOfIncrement
        let average = this.getAverageOfVolume(volumeList)
        if (newVolume > average) {
            // Check in which percentage volume is larger than the average
            let incrementValue = newVolume - average
            percentageOfIncrement = (incrementValue / average) * 100
        }
        return percentageOfIncrement
    }

    triggerVolumeAlert(volumeIncrementPercentage, alertPercentage) {
        // if the volume incremented , return true only if there is a big increment defined by the alertPercentageValue
        return volumeIncrementPercentage >= alertPercentage
    }
}

export default Volume