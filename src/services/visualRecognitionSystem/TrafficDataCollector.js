/**
 * * Class simulates the monitoring of traffic flow by counting and recognising various types of vehicles 
 * - cars, trucks, bikes, and buses - passing through the control point within specified time intervals.
 * 
 * This class aims to provide a realistic representation of traffic data collection, 
 * which can be used to analyse traffic patterns, optimize traffic light timing, and identify potential traffic anomalies.
 * 
 * 
 *  * Functionalities:
 *  
 * - Real-time Traffic Data Simulation: Simulates the collection of traffic data in real time through periodic scans, 
 *   where each scan counts the number of different types of vehicles passing through the intersection.
 * - Anomaly Detection: Identifies traffic anomalies during data collection, such as vehicles stopped for an extended 
 *   period or occupying multiple lanes, which could indicate traffic incidents or unusual conditions.   
 * - Configurable Scan Parameters: Allows customization of the traffic scan parameters, including the number of scans 
 *   per cycle and the duration of each scan, to adapt the data collection process to varying traffic conditions.
 * - Data Reporting: Provides a summary of the collected traffic data and detected anomalies at the end of each scan cycle, 
 *   offering insights into traffic flow and potential issues at the control point.
 *    
 * Usage:
 * 
 * This class is designed to be instantiated for each traffic control point ( traffic light ) where data collection is necessary. 
 * 
 */
class TrafficDataCollector {
    constructor() {
        this.numOfTrafficScans = 0;
        this.scanLengthInSeconds = 0;
        this.totalVehicles = 0;
        this.bikeCounter = 0;
        this.carCounter = 0;
        this.truckCounter = 0;
        this.busCounter = 0;
        this.anomalies = 0;
        this.randomNumber = 0;
    }


    //setters 

    /**
     * Set setCycleTime
     */
    setScanTime(scanLengthInSeconds) {
        this.scanLengthInSeconds = scanLengthInSeconds;
    }

    /**
     * Set setCycleTime
     */
    setBusCounter(busCounter) {
        this.busCounter = busCounter;
    }

    /**
     * Set setCycleTime
     */
    setNumOfTrafficScans(numOfCycles) {
        this.numOfTrafficScans = numOfCycles;
    }

    /**
     * Set carCounter
     */
    setCarCounter(carCounter) {
        this.carCounter = carCounter;
    }

    /**
     * Set truckCounter
     */
    setTruckCounter(truckCounter) {
        this.truckCounter = truckCounter;
    }

    /**
     * Set bikeCounter
     */
    setBikeCounter(bikeCounter) {
        this.bikeCounter = bikeCounter;
    }



    // getters


    /**
     * Get getNumOfTrafficScans
     */
    getNumOfTrafficScans() {
        return this.numOfTrafficScans;
    }

    /**
     * Get get scan time in nanoseconds
     */
    getScanTime() {
        return this.scanLengthInSeconds;
    }

    /**
     * Get getBusCounter
     */
    getBusCounter() {
        return this.busCounter;
    }

    /**
     * Get getCarCounter
     */
    getCarCounter() {
        return this.carCounter;
    }

    /**
     * Get getTruckCounter
     */
    getTruckCounter() {
        return this.truckCounter;
    }

    /**
     * Get getBikeCounter
     */
    getBikeCounter() {
        return this.bikeCounter;
    }


    // helper methods

    /***
     * Method starts collecting real time data through visual recongnition.
     * 
     * Count vehicles passing for periods of n seconds 3 times before reporting data
     * to Control Centre.
     * 
     * Logic uses a while loop to keep rack the number of scans, and uses Thread.sleep to delay every scan 2 seconds.
     * This way it simulates a real word scenario to schedule a traffic scan  for n seconds 
     * per n number of times to complete a traffic scan cycle where would be more appropriate to use a timer.
     * **/
    async startDataCollector() {

        this.carCounter = 0;
        this.truckCounter = 0;
        this.bikeCounter = 0;
        this.busCounter = 0;

        try {

            this.carCounter += this.getRandomNumber();
            this.truckCounter += this.getRandomNumber();
            this.bikeCounter += this.getRandomNumber();
            this.busCounter += this.getRandomNumber();

        } catch (e) {
            console.error("Error occurred while collecting traffic data: " + e.message);
            return;
        }
        getAnomalies();            // check traffic anomalies
    }

    /***
     * Method generates a random number to simulate vehicle counting.
     * 
     * It uses an instance of the Random class
     * **/
    getRandomNumber() {
        return Math.floor(Math.random() * 10); // generate a random number between 0 and 20
    }


    /***
     * Method detects any traffic anomalies such as;
     * 
     * - Any vehicles stopped for a period of time while should be on the move
     * - Any vehicles stopped for a period of occupying 2 different leans while should be on the move
     * **/
    getAnomalies() {

        const chancesArray = [0, 0, 1]; // array of possible anomalies during traffic scan
        const randomNum = Math.floor(Math.random() * chancesArray.length);
        this.anomalies = chancesArray[randomNum];
        if (this.anomalies == 1) {
            console.log("ALERT !! " + this.anomalies + " anomalies encountered. " +
                "Please check camera for anomalies and turn off alert " +
                "or emergency services will be allert in 10 seconds");
        }
        return this.anomalies;
    }


    /****
     * Method prints the total of vehicles counted during the traffic scan cycle.
     * 
     * - Total number of cars
     * - Total number of trucks
     * - Total number of bus
     * - Total number of bikes
     **/
    printVehiclesCount() {
        let str = "";
        str += "\nCars " + this.carCounter;
        str += "\nTrucks " + this.truckCounter;
        str += "\nBikes " + this.bikeCounter;
        str += "\nBuses " + this.busCounter;
        str += "\nTraffic anomalies " + this.anomalies;
        console.log(str);
    }

    /**
   * Get total of Vehicles per scan
   */
    getTotalVehicles() {
        this.totalVehicles = (this.tdc.getCarCounter() + this.tdc.getBikeCounter() + this.tdc.getBusCounter() + this.tdc.getTruckCounter());
        return this.totalVehicles;
    }

}

// Export the VisualRecognitionSystem class
module.exports = TrafficDataCollector;
