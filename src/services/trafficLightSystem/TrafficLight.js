/**
 * 
 */
class TrafficLight {
    // vars
    static nextSystemID = 804;
    trafficLightID;
    trafficLightSystemID; // Traffic Light System id the VRS is associated to
    state;
    position;
    status;

    // default constructor
    constructor(trafficLightSystemID) {
        this.status = true;
        this.trafficLightID = ++TrafficLight.nextSystemID; // auto increment id
        this.trafficLightSystemID = trafficLightSystemID; // Traffic Light System id the TL is associated to
        this.position = "";
    }

    constructor(state) {
        this.state = state;
        this.status = true;
        this.trafficLightID = ++TrafficLight.nextSystemID; // auto increment id
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
