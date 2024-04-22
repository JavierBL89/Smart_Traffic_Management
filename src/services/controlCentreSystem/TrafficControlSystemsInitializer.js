// event emtiter for server communication
const EventEmitter = require('events');

// import required classes
const TCSystemsListManager = require('./TCSystemsListManager');
const TrafficControlSystem = require('../trafficControlSystem/TrafficControlSystem'); // Import TrafficControlSystem module


/**
 * Class responsible for initializing all Traffic Control Systems managed within the Control Centre network. 
 * It ensures that each Traffic Control System is operational.
 */
class TrafficControlSystemsInitializer extends EventEmitter {
    /**
     * Constructor
     */
    constructor() {
        super();
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
    initTrafficControlSystems() {
        console.log("1- Initializing Traffic Control System...");

        // Iterate through each Traffic Control System in the list
        console.log(this.listOfTrafficControlSystems);
        for (let tcs of this.listOfTrafficControlSystems) {
            if (tcs.isOperative()) {
                // Confirm that it has been successfully initialized
                console.log(`\nTraffic Control System with id ${tcs.getSystemID()} is up and running.`);
                console.log("\n--------");

                // Initialize the Traffic Light Systems associated with the Traffic Control System
                tcs.initTrafficLightSystems();
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
    async startTrafficControlCycle() {


        for (let tcs of this.listOfTrafficControlSystems) {
            // server stream message
            this.emit("cycleStart", { cycleNumber: 1, state: "green", tls: tcs.getTls1().getSystemId() });

            await new Promise(resolve => setTimeout(resolve, 500));  // delay to catch up emit messa before method runs
            tcs.startTrafficControlCycle(tcs.getTls1().getSystemId(), "green", "red", false);
        }
    }
}

// Export the TrafficControllSystemsInitializer class
module.exports = TrafficControlSystemsInitializer;
