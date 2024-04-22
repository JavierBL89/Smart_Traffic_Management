// event emtiter for server communication
const EventEmitter = require('events');

// import the require clases
const VisualRecognitionSystem = require('../visualRecognitionSystem/VisualRecognitionSystem');
const TCSystemsListManager = require('../controlCentreSystem/TCSystemsListManager');
const TrafficLightSystem = require('../trafficLightSystem/TrafficLightSystem');


/**
* This class acts as the central control entity in a smart traffic management system, 
* handling the dynamic adjustments of traffic light timings based on real-time traffic data. 

* Responsibilities:
*- Traffic Cycle Management: Controls the sequence of green and yellow light phases 
*  based on the visual recognition data collected.
*- Data-Driven Decisions: Collected data from Visual Recognition Systems
*  and manges traffic light phases in response, ensuring that traffic flow is optimized.
*- Cycle Extension Management: Extends green light phases when high traffic density is detected.
*- Cycle Count Management: Ensures the traffic control system does not exceed a predefined number of cycles, preventing system overruns.
*- Data Collection and Analysis: Initiates and manages the data collection process from the Visual Recognition Systems and analyses this data to determine traffic light adjustments.
 */
class TrafficControlManager extends EventEmitter {

    /**
     * Constructor to initialise TrafficControlManager object with default values
     */
    constructor(listOfTrafficLightSystems) {
        super(); // call eventEmitter constructor
        this.tls1 = null;
        this.tls2 = null;

        this.extensionLimit = 15;
        this.standardCycleTimeInSeconds = 5;
        this.currentGreenPhaseTime = 0;
        this.minOfVehiclesForExtension = 50; // Vehicle count threshold for extension
        this.cycleCount = 1;
        this.greenCount = 0;
        this.maxCycles = 3;
        this.resetCycle = false;
        this.listOfTrafficLightSystems = listOfTrafficLightSystems;
    }


    // Setters

    /**
     * set tls1
     */
    setTls1(tls1) {
        this.tls1 = tls1;
    }

    /**
     * set tls2
     */
    setTls2(tls2) {
        this.tls2 = tls2;
    }

    /**
     * set extensionLimit
     */
    setExtensionLimit(extensionLimit) {
        this.extensionLimit = extensionLimit;
    }

    /**
     * set standardCycleTimeInSeconds
     */
    setStandardCycleTime(standardCycleTimeInSeconds) {
        this.standardCycleTimeInSeconds = standardCycleTimeInSeconds;
    }

    /**
     * set currentGreenPhaseTime
     */
    setCurrentGreenPhaseTime(currentGreenPhaseTime) {
        this.currentGreenPhaseTime = currentGreenPhaseTime;
    }

    /**
     * set minOfVehiclesForExtension
     */
    setMinOfVehiclesForExtension(minOfVehiclesForExtension) {
        this.minOfVehiclesForExtension = minOfVehiclesForExtension;
    }

    /**
     * set cycleCount
     */
    setCycleCount(cycleCount) {
        this.cycleCount = cycleCount;
    }

    /**
     * set greenCount
     */
    setGreenCount(greenCount) {
        this.greenCount = greenCount;
    }

    /**
     * set maxCycles
     */
    setMaxCycles(maxCycles) {
        this.maxCycles = maxCycles;
    }

    /**
     * set  resetCycle 
     */
    setResetCycle(resetCycle) {
        this.resetCycle = resetCycle;
    }

    // Getters


    /**
     * get tls1 
     */
    getTls1() {
        return this.tls1;
    }

    /**
   * get tls2 
   */
    getTls2() {
        return this.tls2;
    }


    /**
     * get extensionLimit 
     */
    getExtensionLimit() {
        return this.extensionLimit;
    }


    /**
     * get standardCycleTimeInSeconds 
     */
    getStandardCycleTime() {
        return this.standardCycleTimeInSeconds;
    }

    /**
     * get currentGreenPhaseTime 
     */
    getCurrentGreenPhaseTime() {
        return this.currentGreenPhaseTime;
    }

    /**
     * get minOfVehiclesForExtension 
     */
    getMinOfVehiclesForExtension() {
        return this.minOfVehiclesForExtension;
    }

    /**
     * get cycleCount 
     */
    getCycleCount() {
        return this.cycleCount;
    }

    /**
     *  get greenCount
     */
    getGreenCount() {
        return this.greenCount;
    }

    /**
     * get maxCycles
     * 
     */
    getMaxCycles() {
        return this.maxCycles;
    }

    /**
     * get resetCycle
     */
    getResetCycle() {
        return this.resetCycle;
    }

    // Additional getter for the list of traffic light systems
    getListOfTrafficLightSystems() {
        return this.listOfTrafficLightSystems;
    }

    // helper methods


    /**
    * Manages the entire traffic control cycle for each Traffic Light System (TLS).
    * Manages the transition between green and yellow phases of traffic lights based on
    * previously analized dadta.
    * It also ensures the system does not exceed a predifined number of  cycles.
    *
    * @param {number} tlsId - The identifier for the Traffic Light System to be controlled.
    * @param {string} state - The state for the traffic cycle, typically 'green' or 'red'.
    * @param {boolean} resetCycle - Flag indicates if the cycle is a normal operation or a reset operation
    *                               if the maximum green time is been exceeded.
    *
    * The cycle operation:
    * 1. If the cycle count has reached or exceeded the maximum limit, the function logs this status and returns,
    *    preventing further cycle execution.
    * 2. Resets the current green phase time to zero at the start of each new cycle.
    * 3. If it's a reset cycle (when green time max is reached), it logs and performs a green to yellow transition
    * 4. If it's a normal cycle, it proceeds with the green phase followed by the yellow phase and logs each step.
    * 5. Increments the cycle count after a full green to yellow cycle and logs the cycle completition.
    * 6. Checks if the maximum cycle limit has been reached after incrementing to halt further cycles.
    */
    async startTrafficControlCycle(tlsId, state, resetCycle) {

        /**  prevent the app from run indefinetly. */
        if (this.cycleCount > this.maxCycles) {
            console.log("\nReached the maximum number of cycles.");
            // server stream message

            this.emit("maxumOfCyclesReached", { message: "Reached the maximum number of cycles." });
            return; // halts next cycle execution
        }

        // reset current Green Phase Timer
        this.currentGreenPhaseTime = 0;

        // set green Phase Length
        let greenPhaseLength = this.standardCycleTimeInSeconds;
        // set yellow Phase Length 
        let yellowPhaseLength = 2;

        /** this ensures the transition to a differente state for the next cycle
         *  when the green state has reached its maximun extention time (max time it remains in green)
         */
        if (state === "green" && resetCycle) {
            console.log("Reset cycle due to max time of green statate reached");
            // server stream message
            this.emit("resetCycle", { message: "Reset cycle due to max time of green statate reached" });

            console.log(`\nTRAFFIC CONTROL CYCLE NUMBER ${this.cycleCount}`);

            // server stream message
            this.emit("cycleStart", { cycleNumber: this.cycleCount, state, tlsId });

            await this.initGreenPhase(tlsId, state, greenPhaseLength);

            // transition to yellow phase 
            await this.initYellowPhase(tlsId, state, yellowPhaseLength);
            this.cycleCount++;    // increment cycle count

            // server stream message
            this.emit("cycleEnd", { cycleNumber: this.cycleCount, state, tlsId });

        } else {  // manage the normal cycle

            console.log(`\nTRAFFIC CONTROL CYCLE NUMBER ${this.cycleCount}`);
            await this.initGreenPhase(tlsId, state, greenPhaseLength);
            await this.initYellowPhase(tlsId, "yellow", yellowPhaseLength)
            this.cycleCount++;    // increment cycle count
        }

        // Check again after increment if the next cycle should initiated
        if (this.cycleCount >= this.maxCycles) {

            console.log("Reached the maximum number of cycles after completing this cycle.");
            // server stream message
            this.emit("maxumOfCyclesReached", { message: "Reached the maximum number of cycles. No more cycles after  completing this cycle" });
        }
    };

    /****
    * Method manages the green phase
    * 
    * @param state
    * @param greenPhaseLength
    * **/
    async initGreenPhase(tlsId, state, greenPhaseLength) {

        this.updateTrafficLightState(tlsId, state, state === "green" ? "red" : "green"); // update traffic light systems state

        // server stream message
        this.emit("greenPhaseStart", { phase: "green", tlsId });

        console.log("\nGREEN PHASE");
        console.log(`\nTraffic light System ${this.tls1.getSystemId()} state is '${this.tls1.getState()}': light 1 is '${this.tls1.getTlA().getState()}'; light 2 is '${this.tls1.getTlB().getState()}'`);
        console.log(`Traffic light System ${this.tls2.getSystemId()} state is '${this.tls2.getState()}': light 1 is '${this.tls2.getTlA().getState()}'; light 2 is '${this.tls2.getTlB().getState()}'`);

        await new Promise(resolve => setTimeout(resolve, greenPhaseLength * 1000));  // delay 



        /**************** Data collection and analysis ******************/

        /*** data colect process ***/
        console.log("\nData collection started...");
        // server stream message
        this.emit('dataCollectionStart', { message: "Collecting traffic data..." })

        this.startVRSDataCollection(); // start data collection
        await new Promise(resolve => setTimeout(resolve, 500));  // delay helps data retreiving completition

        console.log("Data collection finished...");
        // server stream message
        this.emit("dataCollectionEnd", { message: "Traffic data collection complete" });


        /*** data analyze process ***/
        console.log("Analyzing traffic data...");
        // server stream message
        this.emit("dataAnalizeStart", "Analyzing traffic data...");

        this.analyzeTrafficData();     // analyze data

        console.log("Data is been analized.");
        // server stream message
        this.emit("dataAnalizeEnd", "Data is been analized.");

    };

    /****
    * Method manages the yellow phase
    * 
    * @param state
    * @param greenPhaseLength
    * **/
    async initYellowPhase(tlsId, state, yellowPhaseLength) {

        this.updateTrafficLightState(tlsId, state === "green" ? "yellow" : "red", state === "green" ? "red" : "yellow");

        // server stream message
        this.emit('yellowPhaseStart', { phase: state, tlsId });

        console.log("\nYELLOW PHASE");
        console.log(`\nTraffic light System ${this.tls1.getSystemId()} state: light 1 ${this.tls1.getTlA().getState()}; light 2 ${this.tls1.getTlB().getState()}`);
        console.log(`Traffic light System ${this.tls2.getSystemId()} state: light 1 ${this.tls2.getTlA().getState()}; light 2 ${this.tls2.getTlB().getState()}`);

        await new Promise(resolve => setTimeout(resolve, yellowPhaseLength * 1000));
        // server stream message
        this.emit('yellowPhaseEnd', { phase: state, tlsId });
    };


    /**
    * Method responsible for updating the state of Traffic Light Systems for each pahse of the cycle
    * ***/
    updateTrafficLightState(tlsId, newState, oposedState) {

        if (tlsId == this.tls1.getSystemId()) {
            this.tls1.setState(newState);
            this.tls2.setState(oposedState);
            console.log(`Updated TLS ${this.tls1.getSystemId()} to ${newState} and TLS ${this.tls2.getSystemId()} to ${oposedState}`);

            // server stream message
            this.emit('updateState', { tls1: `${this.tls1.getSystemId()}`, tls1State: `${newState}`, tls2: `${this.tls2.getSystemId()}`, tls2State: `${oposedState}` });

        } else if (tlsId === this.tls2.getSystemId()) {
            this.tls2.setState(newState);
            this.tls1.setState(oposedState);
            console.log(`Updated TLS ${this.tls2.getSystemId()} to ${newState} and TLS ${this.tls1.getSystemId()} to ${oposedState}`);

            // server stream message
            this.emit('updateState', { tls2: `${this.tls2.getSystemId()}`, tls2State: `${newState}`, tls1: `${this.tls1.getSystemId()}`, tls1State: `${oposedState}` });

        } else {
            console.log("Error: No matching TLS found for the given ID.");
            // server stream message
            this.emit('notTLSFoundError', { message: "Error: No matching TLS found for the given ID." });

        }

        console.log(`\nCurrent states - TLS ${this.tls1.getSystemId()}: ${this.tls1.getState()}, TLS ${this.tls2.getSystemId()}: ${this.tls2.getState()}`);
    };


    /***********************  END TRAFFIC CONTROL CYCLE MANAGER ******************/



    /**
    * Method start procces of traffic data collection of All Visual Recognition Systems
    * **/
    startVRSDataCollection() {

        // JavaScript does not have native threading like Java, but you can simulate concurrent operations with async functions
        this.listOfTrafficLightSystems.forEach(tls => {
            tls.startVRDataCollection();
        });

    };


    /**
    * Method starts the process of traffic data analysing, and reports detailing the traffic data collected 
    * by all Visual Recognition Systems (VRS) within each Traffic Light System (TLS).
    * 
    * It retrieves the data collected from each VRS associated to each of the TLS,
    * and stores data in a key-value structure Map<TLS_id, totalOfVehicles> to then pass it into compareTLSTrafficData()
    * 
    * **/
    analyzeTrafficData() {

        // map to stores a key-value pair ( <Traffic Light System id> : <total of vehicles scanned> )
        const tlsVehicleCounts = new Map();

        console.log("\nAnalyzing traffic data...");

        this.listOfTrafficLightSystems.forEach(tls => {

            console.log(`\n**LAST SCAN REPORT** from Traffic Light System ${tls.getSystemId()}`);


            // server stream message
            this.emit('reportTitle', { message: `**LAST SCAN REPORT** from Traffic Light System ${tls.getSystemId()}` });

            let totalVehicles = 0;
            // iterate list of VRS associated to each TLS (2 per TLS)
            tls.getVisualRecognitionSystems().forEach(vrs => {
                totalVehicles += vrs.getTotalVehicles();
                console.log(`*VRS ${vrs.getSYSTEMID()} assocciated to TL ${vrs.getTrafficLightID()} reports:`);
                console.log(`- Total vehicles: ${vrs.getTotalVehicles()}\n`);

                // server stream message
                this.emit('scanReport', {
                    message: `*VRS ${vrs.getSYSTEMID()} assocciated to TL ${vrs.getTrafficLightID()}
                           reports: ${vrs.getTotalVehicles()} total vehicles`
                });

            });

            tlsVehicleCounts.set(tls.getSystemId(), totalVehicles);
        });

        this.compareTLSTrafficData(tlsVehicleCounts);
    };


    /**
    * Method compares the traffic data of each of the Traffic Ligth Systems, 
    * and sets the next state of the Traffic Light Systems for the next traffic control cycle.
    * 
    * The method identifies which TLS has higher or lower vehicle traffic and performs actions based on these comparisons.
    * 
    * 
    * /**
 * Compares the traffic data of each Traffic Light System and decides the next state based on the traffic density.
 * Extends the green phase duration if high traffic density is detected, with a maximum extension limit.
 */
    compareTLSTrafficData(tlsVehicleCounts) {

        if (!tlsVehicleCounts || tlsVehicleCounts.size === 0) {
            console.log("No traffic data available to compare.");

            // server stream message
            this.emit("noDataToCompare", { messsage: " No traffic data available to compare" });
            return;
        }

        const tlsIds = [...tlsVehicleCounts.keys()];   // access map list of 
        const vehiclesCountTLS1 = tlsVehicleCounts.get(tlsIds[0]);
        const vehiclesCountTLS2 = tlsVehicleCounts.get(tlsIds[1]);


        if (vehiclesCountTLS1 >= vehiclesCountTLS2) {
            console.log(`\n****Traffic Light System ${tlsIds[0]} reports HIGHER traffic density****`)

            // server stream message
            this.emit("trafficDensity", { message: "*Traffic Light System ${tlsIds[0]} reports HIGHER traffic density*" });

            this.smartCycle(tlsIds[0], vehiclesCountTLS1, "green");

        } else {
            console.log(`\n****Traffic Light System ${tlsIds[1]} reports HIGHER traffic density****`)

            // server stream message
            // server stream message
            this.emit('trafficDensity', `*Traffic Light System ${tlsIds[1]} reports HIGHER traffic density*`);


            this.smartCycle(tlsIds[1], vehiclesCountTLS2);
        }

    };


    async smartCycle(tlsId, vehiclesCount) {

        // check if the total of vehicles reported is greater than minOfVehiclesForExtension for a potential extention
        if (vehiclesCount > this.minOfVehiclesForExtension && this.currentGreenPhaseTime < (this.standardCycleTimeInSeconds + this.extensionLimit)) {
            let extensionTime = 5; // Extend by 5 seconds, not exceeding max

            console.log(`\nExtending green phase for TLS ${tlsId} by ${extensionTime} seconds due to high traffic density.`);
            // server stream message
            this.emit('extendGreenPhase', `Extending green phase for TLS ${tlsId} by ${extensionTime} seconds due to high traffic density.`);

            this.currentGreenPhaseTime += extensionTime;
            //  console.log(this.currentGreenPhaseTime + "");

            await new Promise(resolve => setTimeout(resolve, extensionTime * 1000)); // Pause before re-checking
            // this.startTrafficControlCycle(tlsId, "green");
            // this.startTrafficControlCycle(tlsId, "green", this.resetCycle = false);

            /**************** Data collection and analysis ******************/

            /*** data collection process ***/
            console.log("\nData collection started...")
            // server stream message
            this.emit('dataCollectionStart', "Collecting traffic data...");

            this.startVRSDataCollection();   // collect data
            new Promise(resolve => setTimeout(resolve, 500));  // delay helps data retreiving completition

            console.log("Data collection finished.")
            // server stream message
            this.emit("dataCollectionEnd", "Data collection finished.");


            /*** data analitycs process ***/
            console.log("Analyzing traffic data...")
            // server stream message
            this.emit("dataAnalizeStart", "Analyzing traffic data...");

            this.analyzeTrafficData();    //  analyze data

            console.log("Data is been analized.");
            // server stream message
            this.emit("dataAnalizeEnd", "Data is been analized.");

            // this.startVRSDataCollection();
            // this.analyzeTrafficData()
        } else {

            this.startTrafficControlCycle(tlsId, "green", this.resetCycle = true);  // restart cycle
        }
    }


}

// Export the TrafficControlSystem class
module.exports = TrafficControlManager;
