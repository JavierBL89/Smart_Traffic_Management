

const TrafficDataReport = require('./TrafficDataReport');

/**
 * The TrafficDataManager class is responsible for managing the flow of traffic data
 * from multiple visual recognition systems. It collects, processes, and correlates
 * data from various sources and updates the TrafficDataReport with compiled and
 * analyzed results.
 *
 * This class can initiate traffic scan cycles, collect data metrics, detect anomalies,
 * and provide consolidated traffic reports. It ensures data integrity and synchronizes
 * the activities of different traffic data collection systems.
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
     * 
     */
    prepareDataFromTCSystems() {

        // grab the Traffic Light Systems (TLS) assocciated to this Traffic Control System
        this.tls1 = listOfTrafficLightSystems[0];
        this.tls2 = listOfTrafficLightSystems[1];

        // grab the list of Visual Recognition Systems assocciated to each (TLS)
        this.tls1VRSystems = tls1.visualRecognitionSystems;
        this.tls2VRSystems = tls2.visualRecognitionSystems;
    }

    /****
     * 
     */
    collecDataFromTCSystems() {

        // collect data from all VRS associated to TLS1
        this.tls1VRSystems.forEach(vrs => {

            this.trafficDataReport.setTotalVehicles(vrs.getTotalVehicles());
            this.trafficDataReport.setTotalAnomalies(vrs.getTotalAnomalies());
            this.trafficDataReport.setTotalBikes(vrs.getTotalBikes());
            this.trafficDataReport.trafficDataReportsetTotalBuses(vrs.getTotalBuses());
            this.trafficDataReport.setTotalCars(vrs.getTotalCars());
            this.trafficDataReport.setTotalTrucks(vrs.getTotalTrucks());
        });


        // collect data from all VRS associated to TLS2
        this.tls1VRSystems.forEach(vrs => {

            this.trafficDataReport.setTotalVehicles(vrs.getTotalVehicles());
            this.trafficDataReport.setTotalAnomalies(vrs.getTotalAnomalies());
            this.trafficDataReport.setTotalBikes(vrs.getTotalBikes());
            this.trafficDataReport.trafficDataReportsetTotalBuses(vrs.getTotalBuses());
            this.trafficDataReport.setTotalCars(vrs.getTotalCars());
            this.trafficDataReport.setTotalTrucks(vrs.getTotalTrucks());
        });
    }


    analyzeTrafficData() {
        // Implement analysis logic here
        // Example: Detect anomalies
        this.trafficDataReport.setTotalAnomalies(this.detectAnomalies());
    }

    detectAnomalies() {
        // Placeholder for anomaly detection logic
        // Return the number of detected anomalies
        return Math.random() * 5;  // Example random logic
    }

    generateReport() {
        // Compile and return the traffic report
        console.log("Generating traffic report...");
        return this.trafficDataReport;
    }
}

module.exports = TrafficDataReportManager;
