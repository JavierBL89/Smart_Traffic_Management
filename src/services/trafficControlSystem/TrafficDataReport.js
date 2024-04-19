/**
 * The TrafficDataReport class encapsulates all the relevant data related
 * to traffic analysis in a centralized report format. 
 * 
 * This class provides methods to set and retrieve various traffic metrics 
 * such as the number of vehicles, bikes, cars,
 * trucks, and buses, as well as traffic density levels and speed averages.
 *
 */
class TrafficDataReport {

    constructor() {
        this.totalVehicles = 0;
        this.totalBikes = 0;
        this.totalCars = 0;
        this.totalTrucks = 0;
        this.totalBuses = 0;
        this.totalAnomalies = 0;
        this.speedAverage = 0;
        this.trafficDensityLevel = 0;
    }


    /**
     * get TotalVehicles
     */
    getTotalVehicles() {
        return this.totalVehicles;
    };

    /**
     * get TotalBikes
     */
    getTotalBikes() {
        return this.totalBikes;
    };


    /**
     * get TotalCars
     */
    getTotalCars() {
        return this.totalCars;
    };

    /**
     * get TotalTrucks
     */
    getTotalTrucks() {
        return this.totalTrucks;
    };


    /**
     * get TotalBuses
     */
    getTotalBuses() {
        return this.totalBuses;
    };

    /**
     * get TotalAnomalies
     */
    getTotalAnomalies() {
        return this.totalAnomalies;
    };

    /**
     * get speedAverage
     */
    getSpeedAverage() {
        return this.speedAverage;
    };

    /**
     * get TrafficDensityLevel
     */
    getTrafficDensityLevel() {
        return this.trafficDensityLevel;
    };

    /**
         * set TotalVehicles
         */
    setTotalVehicles(totalVehicles) {
        this.totalVehicles = totalVehicles;

    };

    /**
     * set TotalBikes
     */
    setTotalBikes(totalBikes) {
        this.totalBikes = totalBikes;
    };

    /**
     * set totalCars
     */
    setTotalCars(totalCars) {
        this.totalCars = totalCars;
    };

    /**
     * set totalTrucks
     */
    setTotalTrucks(totalTrucks) {
        this.totalTrucks = totalTrucks;
    };

    /**
     * set totalBuses
     */
    setTotalBuses(totalBuses) {
        this.totalBuses = totalBuses;
    };

    /**
     * set totalAnomalies
     */
    setTotalAnomalies(totalAnomalies) {
        this.totalAnomalies = totalAnomalies;
    };

    /**
     * set speedAverage
     */
    setTspeedAverage(speedAverage) {
        this.setTspeedAverage = speedAverage;
    };

    /**
     * set trafficDensityLevel
     */
    setTrafficDensityLevel(trafficDensityLevel) {
        this.setTrafficDensityLevel = trafficDensityLevel;
    };


}

// Export the VisualRecognitionSystem class
module.exports = TrafficDataCollector;
