class SMACalculations {
    // Goal of this function is to determine of averages are close or not. When they are too close, it means the are about to cross or they've just crossed
    // What should trigger an alert should be when this function returns any value between 1 and 10 meaning that averages are close between each other
    calculateDifferenceBetweenAverages(firstValue, secondValue) {
        let difference = Math.max(firstValue, secondValue) - Math.min(firstValue, secondValue)
        let percentageIncrement = (difference / Math.min(firstValue, secondValue)) * 100
        return percentageIncrement
    }
}

export default SMACalculations