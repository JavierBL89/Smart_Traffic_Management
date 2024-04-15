// Import necessary modules
const TrafficControlSystem = require('./trafficControlSystem');

/**
 * Singleton class represents a list with all the Traffic Control Systems associated with each Traffic Control System.
 * 
 * Class acts as a manager of this list to manage functionalities such as 
 * add, or remove Traffic Control Systems of the Control Centre network
 */
class TCSystemsListManager {
    // Constructor
    constructor() {
        this.trafficControlSystems = []; // initialize array to hold traffic control systems
    }

    /**
     * Static method to get the instance of TCSystemsListManager
     * @returns {TCSystemsListManager} The instance of TCSystemsListManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new TCSystemsListManager();
        }
        return this.instance;
    }

    /**
     * Get the list of traffic control systems
     * @returns {TrafficControlSystem[]} The list of traffic control systems
     */
    getTrafficControlSystems() {
        return this.trafficControlSystems;
    }

    // Helper methods

    /**
     * Method to add a new Traffic Control System to the list 
     * of Traffic Control Systems that Control Centre System manages
     * @param {TrafficControlSystem} newTCS The new Traffic Control System to add
     */
    addTrafficContolSystem(newTCS) {
        this.trafficControlSystems.push(newTCS);
    }

    /**
     * Returns an iterator for the traffic control systems list
     * @returns {Iterator} An iterator for the traffic control systems list
     */
    [Symbol.iterator]() {
        return this.trafficControlSystems.values();
    }
}

// Export the TCSystemsListManager class
module.exports = { TCSystemsListManager };
