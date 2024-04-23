
// import the require classes
const TCSystemsListManager = require('../controlCentreSystem/TCSystemsListManager');
const TrafficLightSystem = require('../trafficLightSystem/TrafficLightSystem');
const VisualRecognitionSystem = require('../visualRecognitionSystem/VisualRecognitionSystem');
const StateRecord = require('../trafficLightSystem/StateRecord');
const TrafficDataReportManager = require('./TrafficDataReportManager');
const async = require('async');
const TrafficControlManager = require('./TrafficControlManager');
const TrafficDataReport = require('./TrafficDataReport');
/**
 * The TrafficControlSystem class manages its associated Traffic Light Systems,
 * It orchestrates their operational cycles based on visual recognition data collected to optimize traffic flow.
 *
 * This class is responsible for:
 * - Initializing Traffic Light Systems
 * - Configure their visual recognition systems
 * - Executing traffic control cycles to ensure efficient traffic management.
 */
class TrafficControlSystem {
    /**
     * Constructor to initialise Traffic Control System object
     */
    constructor() {
        this.systemID = 2012;
        this.tls1 = null;
        this.tls2 = null;
        this.operative = true;
        this.numOfVisualRecognitionScans = 0;
        this.lengthOfVRScans = 0; // in nanoseconds
        this.cycleCount = 0;
        this.maxCycles = 3;
        this.listOfTrafficLightSystems = [];
        this.tlsStateHistory = [];
        this.trafficReportManager = new TrafficDataReportManager(this.listOfTrafficLightSystems);
        this.trafficControlManager = new TrafficControlManager(this.listOfTrafficLightSystems);
    }

    // setters

    // Set  tls1
    setTls1(value) {
        this.tls1 = value;
    }

    // Set  tls2
    setTls2(value) {
        this.tls2 = value;
    }

    // Set operative
    setIsOperative(value) {
        this.operative = value;
    }

    // Set numOfVisualRecognitionScans
    setNumOfVisualRecognitionScans(value) {
        this.numOfVisualRecognitionScans = value;
    }

    // set lengthOfVRScans
    setLengthOfVRScans(value) {
        this.lengthOfVRScans = value;
    }


    // Set maxCycles
    setMaxCycles(value) {
        this.maxCycles = value;
    }

    // Set tlsStateHistory
    setTlsStateHistory(value) {
        this.tlsStateHistory = value;
    }

    // getters 

    // Get systemID
    getSystemID() {
        return this.systemID;
    }

    // Get tls1
    getTls1() {
        return this.tls1;
    }

    // Get for tls2
    getTls2() {
        return this.tls2;
    }

    // Get numOfVisualRecognitionScans
    getGreenCycleLength() {
        return this.numOfVisualRecognitionScans;
    }

    // Get operative
    isOperative() {
        return this.operative;
    }

    // Get lengthOfVRScans
    getLengthOfVRScans() {
        return this.lengthOfVRScans;
    }

    // Get maxCycles
    getMaxCycles() {
        return this.maxCycles;
    }

    // Get trafficCycleLoops
    getTrafficCycleLoops() {
        return this.trafficCycleLoops;
    }

    // Get listOfTrafficLightSystems
    getListOfTrafficLightSystems() {
        return this.listOfTrafficLightSystems;
    }

    // Get tlsStateHistory
    geTlsStateHistory() {
        return this.tlsStateHistory;
    }

    // get trafficControlManager
    getTrafficControlManager() {
        return this.trafficControlManager;
    }

    // get trafficControlManager
    getTrafficReportManager() {
        return this.trafficReportManager;
    }
    // helper methods

    /**
     * Method initialise the 2 Traffic Light Systems associated to
     * this Traffic Control System.
     *
     * Synchronous TLSs initialitation process.
     *
     * @throws Exception if a TLS is not operative or if there's an issue initializing its components.
     */
    initTrafficLightSystems() {
        console.log("\n2- Initializing Traffic Light Systems...");

        this.initializeTLS1(); // init Traffic Light System 1
        this.initializeTLS2(); // init Traffic Light System 2
    }

    /**
     * Method initialises Traffic System 1
     */
    initializeTLS1() {
        try {
            // Initialize the first Traffic Light System and its components
            const tls1 = new TrafficLightSystem(new TrafficDataReport()); // Create a new instance
            if (!tls1.isOperative()) {
                throw new Error("Traffic Light System 1 is not operative and could not be initialized.");
            }

            this.tls1 = tls1; // Assign the created instance to tls1 property
            this.trafficControlManager.setTls1(this.tls1);  // set tls1 in traffic control manager
            this.listOfTrafficLightSystems.push(tls1); // Add TLS 1 to the list
            this.tls1.initTLSComponents(); // Initialise associated components

        } catch (e) {
            console.error("Error initializing Traffic Light System 1:", e.message);
        }
    }

    /**
     * Method initialises Traffic System 1
     */
    initializeTLS2() {
        try {
            // Initialize the first Traffic Light System and its components
            const tls2 = new TrafficLightSystem(new TrafficDataReport()); // Create a new instance
            if (!tls2.isOperative()) {
                throw new Error("Traffic Light System 2 is not operative and could not be initialized.");
            }

            this.tls2 = tls2; // Assign the created instance to tls1 property
            this.trafficControlManager.setTls2(this.tls2);  // set tls1 in traffic control manager
            this.listOfTrafficLightSystems.push(tls2); // Add TLS 1 to the list
            this.tls2.initTLSComponents(); // Initialise associated components

        } catch (e) {
            console.error("Error initializing Traffic Light System 1:", e.message);
        }
    }

    /**
     * Method Configures the visual recognition parameters for all associated Visual Recognition Systems.
     *
     * - The method logs the successful configuration of each VRS for tracking and verification purposes.
     * - Array creates a thread pool to store a queue of tasks
     *
     * @param numOfScans number of mirco scans per scan cycle
     * @param scanLengthInSeconds length of micro scans.
     */
    configAllVisualRecognitionSystems(numOfScans, scanLengthInSeconds) {
        this.numOfVisualRecognitionScans = numOfScans;
        this.lengthOfVRScans = scanLengthInSeconds; // in seconds

        // Create a thread pool with as many threads as there are VRS instances
        const promisesQueue = [];


        // Iterate over the list of TLSs associated
        for (let tls of this.listOfTrafficLightSystems) {
            // Iterate over the list of VRSs associated to each TLS
            for (let vrs of tls.getVisualRecognitionSystems()) {
                promisesQueue.push((callback) => {
                    vrs.setNumOfTrafficScans(numOfScans);
                    vrs.setScanTime(scanLengthInSeconds);
                    console.log(`Successfully configured VRS ${vrs.getSYSTEMID()} in TLS ${tls.getSystemId()}`);
                    callback(); // Call the callback function to indicate completion
                })

            };
        }

        // Execute all promises in promisesQueue asynchronously
        Promise.all(promisesQueue)
            .then(() => {
                console.log('All VRS configured successfully.');
            })
            .catch((err) => {
                console.error('Error configuring VRS:', err);
            });
    }



    /**
     * Method Configures traffic control (greenCycleLength) parameter for all associated Traffic Light Systems.
     * - The method logs the successful configuration of each VRS 
     * 
     * @param greenCycleLength 
     */
    configTCSGreenCycleLength(greenCycleLength) {

        try {
            this.trafficControlManager.setStandardCycleTime(greenCycleLength)
            console.log(`Successfully configured length in seconds of green cycle.`);
        } catch (error) {
            onsole.error(`Error configuring TCS`, error);
        }



    }

    /**
     * Method Configures traffic control (numbOfTotalCycles) parameter for all associated Traffic Light Systems.
     * - The method logs the successful configuration
     *
     * @param numbOfTotalCycles .
     */
    configTCSNumOfTotalCycles(numbOfTotalCycles) {

        try {
            this.trafficControlManager.setMaxCycles(numbOfTotalCycles);
            console.log(`Successfully configured the max number of traffic light cycles to ${numbOfTotalCycles}`);

        } catch (error) {
            console.error(`Error configuring max number of traffic light cycles`, error);

        }

    }

    startTrafficControlCycle(tlsId, initialState, oposedState, resetCycle) {

        this.trafficControlManager.updateTrafficLightState(tlsId, initialState, oposedState);
        // start traffic control cycle with predifined values
        this.trafficControlManager.startTrafficControlCycle(tlsId, initialState, resetCycle);
    }
}

// Export the TrafficControlSystem class
module.exports = TrafficControlSystem;
