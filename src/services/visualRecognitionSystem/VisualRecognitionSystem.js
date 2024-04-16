const TrafficDataCollector = require('./TrafficDataCollector');


/**
 * 
 */
class VisualRecognitionSystem {
    // vars
    static nextSystemID = 9022;

    // constructor

    /**
     * Initialises a new VisualRecognitionSystem object with custom parameters
     * **/
    constructor(trafficLightID, trafficLightSystemID) {
        this.systemID = ++VisualRecognitionSystem.nextSystemID;
        this.trafficLightSystemID = trafficLightSystemID;
        this.trafficLightID = trafficLightID;
        this.totalVehicles = 0;
        this.numOfTrafficScans = 0;
        this.scanLengthInSeconds = 0;
        this.anomalies = 0;
        this.tdc = new TrafficDataCollector();
    }

    //setters 

    /**
     * Set trafficLightID 
     */
    setTrafficLightID(trafficLightID) {
        this.trafficLightID = trafficLightID;
    }

    /**
     * Set trafficLightSsytemID the VRS is associated to 
     */
    setTrafficLightSystemID(TrafficLightSystemID) {
        this.trafficLightID = TrafficLightSystemID;
    }

    /**
     * Set number of micro traffic scans
     */
    setNumOfTrafficScans(numOfTrafficScans) {
        this.numOfTrafficScans = numOfTrafficScans;
    }

    /**
     * Set length of each micro traffic scan by seconds
     */
    setScanTime(scanLengthInSeconds) {
        this.scanLengthInSeconds = scanLengthInSeconds;
    }

    // getters

    /**
     * Get Traffic Light id the VRS is associated to
     */
    getTrafficLightID() {
        return this.trafficLightID;
    }

    /**
     * Get getNumOfTrafficScans
     */
    getNumOfTrafficScans() {
        return this.numOfTrafficScans;
    }

    /**
     * Get total of Vehicles per scan
     */

    getTotalVehicles() {
        this.totalVehicles = (this.tdc.getCarCounter() + this.tdc.getBikeCounter() + this.tdc.getBusCounter() + this.tdc.getTruckCounter());
        return this.totalVehicles;
    }

    /**
     * Get the number of anomalies found
     */
    getAnomalies() {
        return this.tdc.getAnomalies();
    }

    /**
     * Get trafficLightSsytemID the VRS is associated to 
     */
    getTrafficLightSystemID(TrafficLightSystemID) {
        return TrafficLightSystemID;
    }

    /**
     * Get getSYSTEMID
     */
    getSYSTEMID() {
        return this.systemID;
    }

    /**
     * Get length(on seconds) of each micro Traffic Scan
     * @return the scanTime
     */
    getScanTimeInNanoSeconds() {
        return this.scanLengthInSeconds;
    }

    // helper methods

    /**
     * Method to set visual recognition configurations.
     * - numOfTrafficScans is the number of micro scans per full scan cycle
     * - scanTime is the length in seconds of each micro scan 
     */
    configVisualRecognition(numOfTrafficScans, scanLengthInSeconds) {
        this.numOfTrafficScans = numOfTrafficScans;
        this.scanLengthInSeconds = scanLengthInSeconds;
    }

    /**
     * Methos responsible for startting visual recognition proccess
     * **/
    startDataCollectorCycle() {
        this.tdc.startDataCollector(this.numOfTrafficScans, this.scanLengthInSeconds);
    }

    /**
     * Methos responsible for startting visual recognition proccess
     * **/
    printDetailedScanReport() {
        this.tdc.printVehiclesCount();
    }

    toString() {
        let str = "";
        str += "Current Traffic Control Configuration:";
        str += "A traffic Scan cycle consists of " + this.getNumOfTrafficScans() +
            " micro scans of " + this.getScanTimeInNanoSeconds() + " seconds length each.";

        return str;
    }

    /**
     * @param args
     */
    static main(args) {
    }


}

// Export the VisualRecognitionSystem class
module.exports = VisualRecognitionSystem;
