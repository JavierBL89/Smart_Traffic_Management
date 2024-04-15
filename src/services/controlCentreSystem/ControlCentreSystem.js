/**
 * Javier Bastande
 */
const TrafficControlSystem = require('../trafficControlSystem/TrafficControlSystem'); // Import TrafficControlSystem module

/**
 * Class ats as Control Center of the Traffic Light Management System.
 * It is the starting point of system.
 * It manages the initialization and operation of multiple Traffic Control Systems within a control center. 
 * 
 * This class is responsible for setting up traffic control systems, configuring visual recognition systems,
 * and starting the traffic control cycle with predefined initial states.
 */
class ControlCenterServer {


    constructor() {
        this.systemID = 700;
        this.tcsInitializer = new TrafficControllSystemsInitializer();
        this.systemID++;
    }

    /**
     * Get system id
     * 
     * @return {number} the systemID
     */
    getSystemID() {
        return this.systemID;
    }

    // helper methods

    /**
     * Method to initialize all Traffic Control Systems managed by the Traffic Control System.
     * It uses Traffic Control System Initializer to start the process.
     * 
     * The initialization process involves two primary actions:
     * 1. Initializing traffic control systems: Ensuring that all systems are set up and configured.
     *    
     * 2. Starting the traffic control cycle: Kicking off the cycle that governs traffic light changes,
     *    starting with predefined initial states to then be modified by traffic density changes.
     */
    static initializeTrafficControlSystems() {
        const tcsInitializer = new TrafficControllSystemsInitializer();
        try {
            tcsInitializer.initTrafficControlSystems(); // call static method of TrafficControllSystemsInitializer class
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Method to configure the visual recognition parameters for all associated Visual Recognition Systems 
     * associated with the Traffic Control System that this Control Centre manages.
     * 
     * The configuration options include:
     * - The number of traffic scans within a whole scan cycle.
     * - The length of each of those traffic scans.
     * 
     * @param {number} numOfScanCycles
     * @param {number} scanLenghtInSeconds
     */
    static configureVisualRecognitionSystem(numOfScanCycles, scanLenghtInSeconds) {
        const listManager = TCSystemsListManager.getInstance(); // get instance of associated Traffic Control Systems list

        // iterate through list
        for (const tcs of listManager) {
            tcs.configAllVisualRecognitionSystems(numOfScanCycles, scanLenghtInSeconds); // Configure visual recognition parameters
        }
    }

    /**
     * Method adds a new Traffic Control System to the list of
     * Traffic Control Systems this Control Centre manages.
     * 
     * This method allows dynamic integration of new Traffic Control Systems which allows 
     * adding and removing Traffic Control Systems for maintenance.
     */
    static addTrafficControlSystem() {
        const instance = TCSystemsListManager.getInstance(); // get instance of associated Traffic Control Systems list
        instance.addTrafficContolSystem(new TrafficControlSystem()); // add new Traffic Control System
    }

    /**
     * Method starts the process of Traffic Control cycles.
     * It uses the Traffic Control Initializer class functionalities to trigger the process.
     * 
     * Traffic Light Systems will start to collect and analyze traffic data 
     * to manage the traffic lights state based on that data.
     */
    static startTrafficControlCycle() {
        const tcsInitializer = new TrafficControllSystemsInitializer();
        try {
            tcsInitializer.startTrafficControlCycle(); // init the Traffic Control Cycle with predefined initial states
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {string[]} args
     */
    static main(args) {
        const n = new ControlCenterSystem();

        addTrafficControlSystem();
        initializeTrafficControlSystems();
        configureVisualRecognitionSystem(/*numOfScans*/ 3, /*scanLengthInaNoSeconds*/ 2);

        startTrafficControlCycle();
    }
}

module.exports = ControlCenterServer; // Export ControlCenterServer class
