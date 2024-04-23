const EventEmitter = require('events');

// import required classes
const TrafficDataReport = require('./TrafficDataReport');

/**
 * The TrafficDataManager class is responsible collecting
 * data from various Traffic Light Systems and updates the TrafficDataReport 
 * with compiled results.
 */
class TrafficDataReportManager extends EventEmitter {

    constructor(listOfTrafficLightSystems) {
        super();
        this.tls1Report = new TrafficDataReport();
        this.tls2Report = new TrafficDataReport();
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

        this.tls1Report.setTLS(tls1);   // associate traffic report instance to a TLS1
        this.tls1Report.setTLS(tls2);  // associate traffic report instance to a TLS2 

        // grab the list of Visual Recognition Systems assocciated to each (TLS)
        this.tls1VRSystems = tls1.visualRecognitionSystems;
        this.tls2VRSystems = tls2.visualRecognitionSystems;
    }

    /**
   * Set isCars for both TLS traffic report instnace
   */
    reportCars() {
        this.tls1Report.isCars(true);
        this.tls2Report.isCars(true)
    };

    /**
    * Set isBuses for both TLS traffic report instnace
    */
    reportBuses() {
        this.tls1Report.isBuses(true);
        this.tls2Report.isBuses(true);
    };

    /**
    * Set isBikes for both TLS traffic report instnace
    */
    reportBikes() {
        this.tls1Report.isBikes(true);
        this.tls2Report.isBikes(true)
    };

    /**
    * Set isTrucks for both TLS traffic report instnace
    */
    reportTrucks() {
        this.tls1Report.isTrucks(true);
        this.tls2Report.isTrucks(true)
    };

    /**
    * Set isAnomalies for both TLS traffic report instnace
    */
    reportAnomalies() {
        this.tls1Report.isAnomalies(true);
        this.tls2Report.isAnomalies(true)
    }

    /**
      * Set isSpeedAverage for both TLS traffic report instnace
      */
    reportSpeedverage() {
        this.tls1Report.isSpeedAverage(true);
        this.tls2Report.isSpeedAverage(true)
    }

    /**
    * Set totalVehicles for both TLS traffic report instnace
    */
    reportTotalVehicles() {
        this.tls1Report.totalVehicles(true);
        this.tls2Report.totalVehicles(true)
    }

    /**
    * Set trafficDensityLevel for both TLS traffic report instnace
    */
    reportTrafficDensity() {
        this.tls1Report.trafficDensityLevel(true);
        this.tls2Report.trafficDensityLevel(true)
    }

    /***
     *  Get TLS1 report
     */
    getTLS1report() {

        this.emit('trafficTLS1Report', { report: this.tls2Report.getReport() });

        return this.tls1Report.getReport();
    }


    /***
     *  Get TLS1 report
     */
    getTLS2report() {

        this.emit('trafficTLS2Report', { report: this.tls2Report.getReport() });

        return this.tls2Report.getReport();
    }



}

module.exports = TrafficDataReportManager;
