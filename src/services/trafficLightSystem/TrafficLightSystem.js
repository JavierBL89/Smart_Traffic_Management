
const TrafficLight = require('./TrafficLight');
const VisualRecognitionSystem = require('../visualRecognitionSystem/VisualRecognitionSystem');
const StateRecord = require('./StateRecord');

/**
 * 
 */
class TrafficLightSystem {
    // vars
    static nextSystemID = 304;

    constructor() {
        this.systemID = ++TrafficLightSystem.nextSystemID;   // auto increment id
        this.operative = true;
        this.state = "";
        this.trafficLights = [];
        this.visualRecognitionSystems = [];
    }

    // setters

    /**
     * Set TLS state and the state of its traffic lights
     * @param {*} newState 
     */
    setState(newState) {
        this.state = newState;
        this.updateLightsState(this.state);
    }

    // getters

    /**
     * Get Traffic Light System status
     */
    getSystemId() {
        return this.systemID;
    }

    /**
     * Get Traffic Light System status
     */
    isOperative() {
        return this.operative;
    }

    /**
     * Get TLS state 
     */
    getState() {
        return this.state;
    }

    /**
     * Get Traffic Light A
     */
    getTlA() {
        return this.tlA;
    }

    /**
     * Get Traffic Light B
     */
    getTlB() {
        return this.tlB;
    }



    /**
     * Get list of all Traffic Lights associated to this system
     * @returns {Array} trafficLights list
     */
    getTrafficLights() {
        return this.trafficLights;
    }

    /**
     * Get list of all Visual Recognition Systems associated to this system
     * @returns {Array} visualRecognitionSystems list
     */
    getVisualRecognitionSystems() {
        return this.visualRecognitionSystems;
    }

    // helper methods

    /**
     * Method init the initialization procces of  the components of a Traffic Light System (TLS),
     * including Traffic Lights (TL) and Visual Recognition Systems (VRS).
     * 
     * Synchronous components initialitation.
     */
    initTLSComponents() {

        setTimeout(() => { }, 500);// delay
        console.log(`\n***Initialiting Traffic Light System ${this.getSystemId()}***`);

        setTimeout(() => { }, 500); // delay
        this.initTLSTrafficLights();      // init traffic lights systems

        setTimeout(() => { }, 500); // delay
        this.initTLSVisualRecognitionSystems();   // init visual recognition systems
    }

    /**
   * Method initialises the Traffic Lights (TL) components of a Traffic Light System (TLS),
   * 
   * Synchronous components initialitation.
   * 
   * Exception Handling:
   * The method includes error handling to manage any issues that may arise during the initialization 
   * of Traffic Lights. In the event of a failure, a detailed exception is thrown,
   * indicating what went wrong during the process.
   */
    initTLSTrafficLights() {
        console.log("\nInit Traffic Lights for TLS " + this.getSystemId());

        try {
            // Init 2 traffic lights
            const tlA = new TrafficLight(this.systemID);
            const tlB = new TrafficLight(this.systemID);

            this.tlA = tlA;
            this.tlB = tlB;
            console.log(`Traffic Light with id ${this.tlA.getTrafficLightID()} ${this.tlA.getPosition()} is up and running`);
            console.log(`Traffic Light with id ${this.tlB.getTrafficLightID()} ${this.tlB.getPosition()} is up and running`);

            setTimeout(() => { }, 500);  // delay

            console.log("\nInit Visual Recognition Systems for TLS " + this.getSystemId());

            setTimeout(() => { }, 500);  // delay

            // Add the TL and VRS to their respective lists, this lists will allow scalability and better accessibility
            this.trafficLights.push(this.tlA, this.tlB);
        } catch (error) {
            throw new Error(`Something went wrong and System components could not be initialized:\n Initialization error: ${error.message}`);
        }
    }

    /**
     * Method initialises the Visual Recognition Systems (VRS) components of a Traffic Light System (TLS),
     * 
     * Synchronous components initialitation.
     * 
     * Exception Handling:
     * The method includes error handling to manage any issues that may arise during the initialization 
     * of Traffic Lights. In the event of a failure, a detailed exception is thrown,
     * indicating what went wrong during the process.
     * 
     * * This method ensures that every operational traffic light 
     * has a corresponding VRS(camera) associated with it through their id. 
     */
    initTLSVisualRecognitionSystems() {

        console.log("\nInit Visual Recognition Systems for TLS " + this.getSystemId());

        try {
            setTimeout(() => { }, 500);  // delay

            // Init 2 visual recognition systems associated to each traffic light
            this.vrsA = new VisualRecognitionSystem(this.tlA.getTrafficLightID(), this.systemID);
            this.vrsB = new VisualRecognitionSystem(this.tlB.getTrafficLightID(), this.systemID);

            console.log(`Visual Recognition System with id ${this.vrsA.getTrafficLightID()} ${this.tlA.getPosition()} associated with Traffic Light ${this.tlA.getTrafficLightID()} is up and running`);
            console.log(`Visual Recognition System with id ${this.vrsB.getTrafficLightID()} ${this.tlB.getPosition()} associated with Traffic Light ${this.tlB.getTrafficLightID()} is up and running`);

            console.log(`\nTraffic Light System with id ${this.getSystemId()} has been successfully initialized.`);
            console.log("\n------------------------------------------------------------------------------------------");

            // Add the TL and VRS to their respective lists, this lists will allow scalability and better accessibility
            this.visualRecognitionSystems.push(this.vrsA, this.vrsB);
        } catch (error) {
            throw new Error(`Something went wrong and System components could not be initialized:\n Initialization error: ${error.message}`);
        }
    }

    /***
     * Method adds a new traffic light to the list of associated TL to this system
     */
    addTrafficLight(tl) {
        this.trafficLights.push(tl);
    }

    /***
     * Method adds a new visual recognition system to the list of associated VRS to this system
     */
    addVisualRecognitionSystem(vrs) {
        this.visualRecognitionSystems.push(vrs);
    }

    /***
     * Method updates the state of both traffic lights of the system
     */
    updateLightsState(newState) {
        this.state = newState;          // update Traffic Light System state 
        this.tlA.setState(newState);    // update state traffic Light A
        this.tlB.setState(newState);    // update state traffic Light B
    }

    /***
     * Method to start traffic data collection cycle
     */
    async startVRDataCollection() {
        // Iterates over the list of Visual Recognition Systems associated to this Traffic Light System
        for (let vrs of this.visualRecognitionSystems) {
            await vrs.startDataCollectorCycle();
            console.log("Data collection finished...");
        }
        console.log("Data collection started...");
    }

    /**
     * Method to print the last data collection report
     */
    reportDataCollection() {
        // Iterates over the list of Visual Recognition Systems associated to this Traffic Light System
        for (let vrs of this.visualRecognitionSystems) {
            vrs.printDetailedScanReport();
        }
    }
}

// Export the TrafficLightSystem class
module.exports = TrafficLightSystem;
