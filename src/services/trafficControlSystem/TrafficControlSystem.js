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
        this.cycleCount = 0;
        this.maxCycles = 3;
        this.listOfTrafficLightSystems = [];
        this.tlsStateHistory = [];
        // this.initTrafficLightSystems(); // call method to integrate the Traffic Light Systems
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
    getNumOfVisualRecognitionScans() {
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


    // helper methods

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

        await this.initializeTLS1(); // init Traffic Light System 1
        await this.initializeTLS2(); // init Traffic Light System 2
    }

    /**
     * Method initialises Traffic System 1
     */
    initializeTLS1() {
        try {
            // Initialize the first Traffic Light System and its components
            const tls1 = new TrafficLightSystem(); // Create a new instance
            if (!tls1.isOperative()) {
                throw new Error("Traffic Light System 1 is not operative and could not be initialized.");
            }

            this.tls1 = tls1; // Assign the created instance to tls1 property
            console.log(this.tls1);
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
            const tls2 = new TrafficLightSystem(); // Create a new instance
            if (!tls2.isOperative()) {
                throw new Error("Traffic Light System 2 is not operative and could not be initialized.");
            }

            this.tls2 = tls2; // Assign the created instance to tls1 property
            this.listOfTrafficLightSystems.push(tls2); // Add TLS 1 to the list
            this.tls2.initTLSComponents(); // Initialise associated components

        } catch (e) {
            console.error("Error initializing Traffic Light System 1:", e.message);
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

}

// Export the TrafficControlSystem class
module.exports = TrafficControlSystem;
