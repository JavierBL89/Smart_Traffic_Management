/**
 * 
 */
class TrafficLight {
    // vars
    static nextSystemID = 804;

    // constructor
    constructor(trafficLightSystemID, state = null) {
        this.trafficLightID = ++TrafficLight.nextSystemID;
        this.trafficLightSystemID = trafficLightSystemID;
        this.state = state;
        this.position = "";
        this.status = true;
    }

    // setters

    /**
     * Set TL state
     */
    setState(state) {
        this.state = state;
    }

    /**
     * Set TL status
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     * Set TL position
     */
    setPosition(position) {
        this.position = position;
    }

    // getters

    /**
     * Get Traffic Light Id the TL is associated to
     */
    getTrafficLightID() {
        return this.trafficLightID;
    }

    /**
     * Get Traffic Light System Id the TL is associated to
     */
    getTrafficLightSystemID() {
        return this.trafficLightID;
    }

    /**
     * Get TL state
     */
    getState() {
        return this.state;
    }

    /**
     * Get TL position
     */
    getPosition() {
        return this.position;
    }

    /**
     * Get TL status
     */
    isStatus() {
        return this.status;
    }
}

// Export the TrafficLight class
module.exports = TrafficLight;
