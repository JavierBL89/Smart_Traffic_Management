

const TrafficDataReport = require('./TrafficDataReport');

/**
 * The TrafficDataManager class is responsible collecting
 * data from various Traffic Light Systems and updates the TrafficDataReport 
 * with compiled results.
 */
class TrafficDataReportManager {

    constructor(listOfTrafficLightSystems) {
        this.trafficDataReport = new TrafficDataReport();
        this.listOfTrafficLightSystems = listOfTrafficLightSystems;
        this.tls1 = null;
        this.tls2 = null;
        this.tls1VRSystems = [];
        this.tls2VRSystems = [];
    }


    /**
     * Prepares and organizes data from associated Traffic Control Systems (TCS) by retrieving
     * the Traffic Light Systems (TLS) and their respective Visual Recognition Systems (VRS).
    * The method performs the following operations:
    * 
    * 1. Retrieves the first two Traffic Light Systems from a predefined list of systems.
    * 
    * 2. For each TLS retrieved, the method extracts and stores the array of associated VRS. 
    *    This allows the system to process and analyze data from multiple sources.
    */
    prepareDataFromTCSystems() {

        // grab the Traffic Light Systems (TLS) assocciated to this Traffic Control System
        this.tls1 = listOfTrafficLightSystems[0];
        this.tls2 = listOfTrafficLightSystems[1];

        // grab the list of Visual Recognition Systems assocciated to each (TLS)
        this.tls1VRSystems = tls1.visualRecognitionSystems;
        this.tls2VRSystems = tls2.visualRecognitionSystems;
    }

    /**
     * Collects traffic data from all Visual Recognition Systems (VRS) associated with two Traffic Light Systems (TLS),
     * aggregating the data into a TrafficDataReport instance.
     *
     * Operations Performed:
     * 1. Iterates over each VRS associated with TLS1 and TLS2.
     * 2. For each VRS, retrieves traffic data metrics such as total vehicles, anomalies, bikes, buses, cars, and trucks.
     * 3. Aggregates these metrics into a central TrafficDataReport object by updating its respective properties.
     */
    collecDataFromTCSystems() {

        // collect data from all VRS associated to TLS1
        this.tls1VRSystems.forEach(vrs => {
            try {
                this.trafficDataReport.setTotalVehicles(vrs.getTotalVehicles());
                this.trafficDataReport.setTotalAnomalies(vrs.getTotalAnomalies());
                this.trafficDataReport.setTotalBikes(vrs.getTotalBikes());
                this.trafficDataReport.setTotalBuses(vrs.getTotalBuses());
                this.trafficDataReport.setTotalCars(vrs.getTotalCars());
                this.trafficDataReport.setTotalTrucks(vrs.getTotalTrucks());
            } catch (error) {
                console.error(`Error updating repor data from VRS: ${error.message}`);
                // Handle specific error scenarios or log the error
            }
        });

        // collect data from all VRS associated to TLS2
        this.tls2VRSystems.forEach(vrs => {
            try {
                this.trafficDataReport.setTotalVehicles(vrs.getTotalVehicles());
                this.trafficDataReport.setTotalAnomalies(vrs.getTotalAnomalies());
                this.trafficDataReport.setTotalBikes(vrs.getTotalBikes());
                this.trafficDataReport.setTotalBuses(vrs.getTotalBuses());
                this.trafficDataReport.setTotalCars(vrs.getTotalCars());
                this.trafficDataReport.setTotalTrucks(vrs.getTotalTrucks());
            } catch (error) {
                console.error(`Error updating repor data from VRS: ${error.message}`);
                // Handle specific error scenarios or log the error
            }
        });

    }

    generateReport() {
        // Compile and return the traffic report
        console.log("Generating traffic report...");
        return this.trafficDataReport;
    }
}

module.exports = TrafficDataReportManager;
