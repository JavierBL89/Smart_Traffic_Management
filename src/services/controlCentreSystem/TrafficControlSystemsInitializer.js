const TCSystemsListManager = require('./TCSystemsListManager');

/**
 * Class responsible for initializing all Traffic Control Systems managed within the Control Centre network. 
 * It ensures that each Traffic Control System is operational.
 */
class TrafficControlSystemsInitializer {
    /**
     * Constructor
     */
    constructor() {
        // Get list of Traffic Control Systems associated with Control Centre
        this.listOfTrafficControlSystems = TCSystemsListManager.getInstance();
    }

    /**
     * Method initializes all Traffic Control Systems within the network.
     * It encapsulates the process of starting up the traffic control systems and 
     * initiating the traffic control cycle with predefined initial states.
     * 
     * It iterates through each system in the list, checks their operational status,
     * and initializes the Traffic Light Systems associated with each Traffic Control System
     * or prints an error message if they are not operational.
     * 
     * The initialization process involves two primary actions:
     * 1. Initializing traffic control systems: Ensuring that all systems are set up and configured.
     * 2. Starting the traffic control cycle: Kicking off the cycle that governs traffic light changes,
     *    starting with predefined initial states to then be modified by traffic density changes.
     */
    async initTrafficControlSystems() {
        console.log("1- Initializing Traffic Control System...");

        // Iterate through each Traffic Control System in the list
        for (let tcs of this.listOfTrafficControlSystems) {
            if (tcs.isOperative()) {
                // Confirm that it has been successfully initialized
                console.log(`\nTraffic Control System ${tcs.getSystemID()} is up and running.`);
                console.log("\n--------");

                // Initialize the Traffic Light Systems associated with the Traffic Control System
                await tcs.initTrafficLightSystems();
            } else {
                // Print an error message if Traffic Control System is not operative
                console.log(`Error at initializing Traffic Control System with id ${tcs.getSystemID()}. This system is not operative`);
            }
        }
        console.log(" ");
    }

    /**
     * Method to start the traffic control cycle for all associated Traffic Control Systems.
     * It iterates over the list of associated Traffic Control Systems
     * and starts the cycle with a predefined initial state.
     */
    startTrafficControlCycle() {
        for (let tcs of this.listOfTrafficControlSystems) {
            tcs.startTrafficControlCycle("green");
        }
    }
}

// Export the TrafficControllSystemsInitializer class
module.exports = { TrafficControllSystemsInitializer };
