
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

    constructor(tls) {
        this.totalVehicles = 0;
        this.totalBikes = 0;
        this.totalCars = 0;
        this.totalTrucks = 0;
        this.totalBuses = 0;
        this.totalAnomalies = 0;
        this.speedAverage = 0;
        this.trafficDensityLevel = "";
        this.tls = tls;
        this.cars = false;
        this.bikes = false;
        this.trucks = false;
        this.buses = false;
        this.anomalies = false;
        this.tDensity = false;
        this.tVehicles = false;

    }


    /****
     * 
     */
    setTLS(tls) {
        this.tls = tls;
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
     * get tDensityLevel
     */
    getDensityLevel() {
        return this.tDensityLevel;
    };

    /**
    * set TotalVehicles
    */
    setTotalVehicles(totalVehicles) {
        this.checkNegativeValue(totalVehicles, "totalVehicles");
        this.totalVehicles += totalVehicles;
    };

    /**
     * set TotalBikes
     */
    setTotalBikes(totalBikes) {
        this.checkNegativeValue(totalBikes, "totalBikes");
        this.totalBikes += totalBikes;
    };

    /**
     * set totalCars
     */
    setTotalCars(totalCars) {
        this.checkNegativeValue(totalCars, "totalCars");
        this.totalCars += totalCars;
    };

    /**
     * set totalTrucks
     */
    setTotalTrucks(totalTrucks) {
        this.checkNegativeValue(totalTrucks, "totalTrucks");
        this.totalTrucks += totalTrucks;
    };

    /**
     * set totalBuses
     */
    setTotalBuses(totalBuses) {
        this.checkNegativeValue(totalBuses, "totalBuses");
        this.totalBuses += totalBuses;
    };

    /**
     * set totalAnomalies
     */
    setTotalAnomalies(totalAnomalies) {
        this.checkNegativeValue(totalAnomalies, "totalAnomalies");
        this.totalAnomalies += totalAnomalies;
    };

    /**
     * set speedAverage
     */
    setSpeedAverage(speedAverage) {
        this.checkNegativeValue(speedAverage, "speedAverage");
        this.speedAverage += speedAverage;
    };


    // helper methods

    isBikes(boolean) {
        this.bikes = boolean;
    };

    isTrucks(boolean) {
        this.trucks = boolean;
    };

    isBuses(boolean) {
        this.buses = boolean;

    };
    isAnomalies(boolean) {
        this.anomalies = boolean;
    };

    isCars(boolean) {
        this.cars = boolean;
    }

    istDensityLevel(boolean) {
        this.tDensity = boolean;
    }

    isSpeedAverage() {
        this.sAverage = boolean;
    }

    isTotalVehicles(boolean) {
        this.tVehicles = boolean;
    }

    /***
    * Method determines traffic density level
    * and sets the traffic density report field accordinly
    */
    calcTrafficDensityLevel() {
        if (this.totalVehicles <= 20) {
            this.trafficDensityLevel = "LOW";  // set traffic report field
        } else if (this.totalVehicles > 20) {
            this.trafficDensityLevel = "MEDIUM"; // set traffic report field
        } else if (this.totalVehicles >= 40) {
            this.trafficDensityLevel = "HIGH";  // set traffic report field
        }

        return this.trafficDensityLevel;
    }


    /***
    * Method simulates the operation of calculating the vehicles speed average
    */
    calcSpeedAverage() {
        // generate a speed between 20 and 70
        let average = Math.round(totalVehicles / Math.floor(Math.random() * (70 - 20 + 1)) + 20);
        this.speedAverage = average;
        return this.speedAverage;
    }

    /**
     * Method checks for negative values
     * 
     * @param {*} value 
     * @param {*} fieldName 
     */
    checkNegativeValue(value, fieldName) {
        if (value < 0) {
            throw new Error(`Invalid data type for ${fieldName}. Must be a positive number.`);
        }
    }


    /**
     * Generates a string representation of a traffic data report
     * @returns report
     */
    getReport() {

        let report = "";
        report += "Traffic data report of TLS " + this.tls.getSystemId();
        if (this.cars) { report += "- Total cars " + this.getTotalCars() };
        if (this.bikes) { report += "- Total bikes " + this.getTotalBikes() };
        if (this.trucks) { report += "- Total trucks " + this.getTotalTrucks() };
        if (this.buses) { report += "- Total buses " + this.getTotalBuses() };
        if (this.anomalies) { report += "- Total anomalies " + this.getTotalAnomalies() };
        if (this.tVehicles) { report += "- Total of vehicles reported " + this.getTotalVehicles() };
        if (this.tDensity) { report += "- Total of vehicles reported " + this.calcTrafficDensityLevel() };
        if (this.sAverage) { report += "- Total speed average " + this.calcSpeedAverage() };


        return report.trim();

    }

}

// Export the VisualRecognitionSystem class
module.exports = TrafficDataReport;
