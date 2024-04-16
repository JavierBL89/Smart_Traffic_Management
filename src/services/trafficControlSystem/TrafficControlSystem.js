const TCSystemsListManager = require('../controlCentreSystem/TCSystemsListManager');
const TrafficLightSystem = require('../trafficLightSystem/TrafficLightSystem');
const VisualRecognitionSystem = require('../visualRecognitionSystem/VisualRecognitionSystem');
const StateRecord = require('../trafficLightSystem/StateRecord');

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
        this.trafficCycleLoops = 0;
        this.cycleCount = 0;
        this.maxCycles = 3;
        this.listOfTrafficLightSystems = [];
        this.tlsStateHistory = [];
        // this.initTrafficLightSystems(); // call method to integrate the Traffic Light Systems
    }

    /**
     * Method initialise the 2 Traffic Light Systems associated to
     * this Traffic Control System.
     *
     * Synchronous TLSs initialitation process.
     *
     * @throws Exception if a TLS is not operative or if there's an issue initializing its components.
     */
    async initTrafficLightSystems() {
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
            this.tls1 = new TrafficLightSystem();
            if (!this.tls1.isOperative()) {
                throw new Error("Traffic Light System 1 is not operative and could not be initialized.");
            }

            this.listOfTrafficLightSystems.push(this.tls1); // Add TLS 1 to the list
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
            // Initialise the second Traffic Light System and its components
            this.tls2 = new TrafficLightSystem();
            if (!this.tls2.isOperative()) {
                throw new Error("Traffic Light System 2 is not operative and could not be initialized.");
            }
            this.listOfTrafficLightSystems.push(this.tls2); // Add TLS 2 to the list
            this.tls2.initTLSComponents(); // Initialise associated components

        } catch (e) {
            console.error("Error initializing Traffic Light System 2:", e.message);
        }
    }

    /**
     * Method Configures the visual recognition parameters for all associated Visual Recognition Systems.
     *
     * It uses Executor to asynchronously configure all VRS instances.
     * Using a fixed thread pool to improve performance and reduce configuration time.
     *
     * - The method logs the successful configuration of each VRS for tracking and verification purposes.
     * - If the thread pool does not terminate within a specified timeout, it attempts to shut down immediately to release resources.
     *
     * @param scanFrequency The frequency at which each VRS should perform scans.
     * @param scanResolution The resolution or detail level each VRS should use for scans.
     */
    configAllVisualRecognitionSystems(numOfScans, scanLengthInSeconds) {
        this.numOfVisualRecognitionScans = numOfScans;
        this.lengthOfVRScans = scanLengthInSeconds; // in seconds

        // Create a thread pool with as many threads as there are VRS instances
        const executor = Executors.newFixedThreadPool(this.listOfTrafficLightSystems.size());

        try {
            // Iterate over the list of TLSs associated
            for (let tls of this.listOfTrafficLightSystems) {
                // Iterate over the list of VRSs associated to each TLS
                for (let vrs of tls.getVisualRecognitionSystems()) {
                    executor.submit(() => {
                        vrs.setNumOfTrafficScans(numOfScans);
                        vrs.setScanTime(scanLengthInSeconds);
                        console.log(`Successfully configured VRS ${vrs.getSYSTEMID()} in TLS ${tls.getSystemId()}`);
                    });
                }
            }
        } finally {
            executor.shutdown();
            try {
                if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                    executor.shutdownNow();
                }
            } catch (ie) {
                executor.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }


    // setters

    // Set systemID
    set systemID(value) {
        this._systemID = value;
    }

    // Set  tls1
    set tls1(value) {
        this._tls1 = value;
    }

    // Set  tls2
    set tls2(value) {
        this._tls2 = value;
    }

    // Set operative
    set operative(value) {
        this._operative = value;
    }

    // Get numOfVisualRecognitionScans
    get numOfVisualRecognitionScans() {
        return this._numOfVisualRecognitionScans;
    }

    // Set numOfVisualRecognitionScans
    set numOfVisualRecognitionScans(value) {
        this._numOfVisualRecognitionScans = value;
    }

    // set lengthOfVRScans
    set lengthOfVRScans(value) {
        this._lengthOfVRScans = value;
    }

    // Set trafficCycleLoops
    set trafficCycleLoops(value) {
        this._trafficCycleLoops = value;
    }

    // Set maxCycles
    set maxCycles(value) {
        this._maxCycles = value;
    }


    // getters 

    // Get systemID
    get systemID() {
        return this._systemID;
    }

    // Get tls1
    get tls1() {
        return this._tls1;
    }

    // Get for tls2
    get tls2() {
        return this._tls2;
    }

    // Get operative
    get operative() {
        return this._operative;
    }
    // Get lengthOfVRScans
    get lengthOfVRScans() {
        return this._lengthOfVRScans;
    }

    // Get maxCycles
    get maxCycles() {
        return this._maxCycles;
    }

    // Get trafficCycleLoops
    get trafficCycleLoops() {
        return this._trafficCycleLoops;
    }

    // Get listOfTrafficLightSystems
    get listOfTrafficLightSystems() {
        return this._listOfTrafficLightSystems;
    }

    // Get tlsStateHistory
    get tlsStateHistory() {
        return this._tlsStateHistory;
    }

}

// Export the TrafficControlSystem class
module.exports = TrafficControlSystem;
