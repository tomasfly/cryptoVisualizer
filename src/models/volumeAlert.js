class VolumeAlert {

    timestamp
    alert

    constructor(alert) {
        this.alert = alert
        this.timestamp = Date.now()
    }
}

export default VolumeAlert