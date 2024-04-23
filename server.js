
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Import necessary modules
const ControlCentreSystem = require('./src/services/controlCentreSystem/ControlCentreSystem'); // Import ControlCenterServer module


// import gRPC service generated classes

const { InitRequest, InitResponse } = require('./protos/init_traffic_control_system_pb');

const { ConfigRequest, ConfigResponse } = require('./protos/config_tcs_pb');

const { StartRequest, StartResponse } = require('./protos/start_traffic_control_pb');
const { ReportConfig, ReportResponse } = require('./protos/traffic_report_pb');


var PROTO_PATH_1 = __dirname + '/protos/init_traffic_control_system.proto';
var PROTO_PATH_2 = __dirname + '/protos/config_tcs.proto';
var PROTO_PATH_3 = __dirname + '/protos/start_traffic_control.proto';
var PROTO_PATH_4 = __dirname + '/protos/traffic_report.proto';


let packageDefinition1 = protoLoader.loadSync(PROTO_PATH_1, {
    keepCase: true, longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

let packageDefinition2 = protoLoader.loadSync(PROTO_PATH_2, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

let packageDefinition3 = protoLoader.loadSync(PROTO_PATH_3, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

let packageDefinition4 = protoLoader.loadSync(PROTO_PATH_4, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

var protoDescriptor1 = grpc.loadPackageDefinition(packageDefinition1);
var protoDescriptor2 = grpc.loadPackageDefinition(packageDefinition2);
var protoDescriptor3 = grpc.loadPackageDefinition(packageDefinition3);
var protoDescriptor4 = grpc.loadPackageDefinition(packageDefinition4);

const initTrafficControlSystemProto = protoDescriptor1.init_traffic_control_system;
const configTrafficControlSystemProto = protoDescriptor2.config_tcs;
const startTrafficControlProtoProto = protoDescriptor3.start_traffic_control;
const configureTrafficReportProto = protoDescriptor4.traffic_report;

const server = new grpc.Server();
let controlCenterInstance;


/****
* Service allows a user to initialize all systems Traffic Control Systems
* associated to this server
* The user sends the request, the server proccess it, inits systems, 
* and reports user with a single response.
*
**** URINARY COMMUNICATION *****
**/
server.addService(initTrafficControlSystemProto.InitTrafficControlSystem.service, {

    InitTrafficControlSystem: (call, callback) => {

        try {
            const feedback = initTrafficControlSystems();  // init
            call.write({ message: feedback })  // send initialization feedback to the user
            call.end();

        } catch (error) { // error handling
            console.error('Error in InitTrafficControlSystem:', error);
            callback({
                code: grpc.status.INTERNAL,
                message: error.message,
            });

        }
    }
});


/*****
 * Method is responsible for initializing the traffic control systems. 
 * It tryes to execute the main method of the ControlCentreSystem module, and 
 * if successful, it returns a message indicating that the systems have been initialized. 
 * If an error occurs during initialization, it logs the error and passes it 
 * to the provided callback function indicating an internal server error.
 * 
 * @returns {string} A message indicating the result of the initialitation proccess.
 */
const initTrafficControlSystems = () => {

    try {
        // Instantiate ControlCenterServer
        controlCenterInstance = new ControlCentreSystem();
        controlCenterInstance.initializeTrafficControlSystems();
        return "\nTraffic control systems have been initialized";

    } catch (error) {
        console.error('An error occurred in InitTrafficControlSystem:', error);
        return "Failed to initialize traffic control systems: " + error.message;
    }
}


/****
* Service allows a user to configure Visual Recognition Systems . 
* The user specifies parameters for traffic scans and their length,  
* which are then sent to the server, proccess them independantly, 
* and reports user with a stream of messages.
*
**** BIDIRECTIONAL CLIENT STREAM-SERVER STREAM COMMUNICATION *****
**/
server.addService(configTrafficControlSystemProto.ConfigTrafficControlSytem.service, {

    ConfigTrafficControlSytem: (call) => {

        call.on('data', (request) => {
            const greenCycleLength = request.greenCycleLength;
            const numbOfTotalCycles = request.numbOfTotalCycles;
            console.log(`Received greenCycleLength: ${greenCycleLength}, numbOfTotalCycles: ${numbOfTotalCycles}`);

            /*** handle each parameter independatly ***/

            // process and report the number of scans
            try {
                controlCenterInstance.configTCSGreenCycleLength(greenCycleLength);
                call.write({ status: true, message: `Length of green light phase set for ${request.greenCycleLength} seconds` });
            } catch (error) {
                call.write({ status: false, message: `Error setting length of green ligh phase: ${error.message}` });
            }

            // process and report the scan length in seconds
            try {
                controlCenterInstance.configTCSNumOfTotalCycles(numbOfTotalCycles);
                call.write({ status: true, message: `Max number of traffic control cycles set to ${request.numbOfTotalCycles} whole cycles` });
            } catch (error) {
                call.write({ status: false, message: `Error setting the num of max traffic control cycles: ${error.message}` });
            }

            call.on('end', () => {
                call.end(); // close stream
            });

            call.on('error', (error) => {
                call.write({ status: false, message: `Error : ${error.message}` });
                call.end(); // close stream
            });
        });
    }
});




/*****
* CLENT STREAM RPC
*
*  Service handles custmo traffic report requests. 
* It iterates through a list of traffic control systems associated with a Control Center
* System, retrieves the traffic report manager instance for each system, and then calls a function
* `handleTrafficReport` passing the traffic report manager, the gRPC call object, and a callbac function. 
* If an error occurs during the process, it logs the error and sends an error message back
* to the client through the gRPC call object.
 */
server.addService(configureTrafficReportProto.TrafficReport.service, {

    ConfigureReport: (call) => {

        try {
            let trafficDataReportManager;
            // iterate through the list of traffic control systems associated to Control Center System
            for (let tcs of controlCenterInstance.getListTCSManager()) {
                trafficDataReportManager = tcs.getTrafficReportManager();  // grab instance of the Traffic Control Manager class          
            }
            handleTrafficReport(trafficDataReportManager, call);
        } catch (error) {
            console.error('Error while configuring traffic report parameters:', error);
            call.write({ message: `Error: ${error.message}` });
            call.end();
        }
    }
});


/**
 * Method handles incoming data requests from client for different types of traffic
 * reports and updates the traffic data report manager accordingly.
 * 
 * @param trafficDataReportManager - is an object that manages the traffic data reports.The function `handleTrafficReport` listens
 * @param call - The `call` parameter is a gRPC call object that allows bidirectional streaming of data between the client and server.
 * The `on` method is used to listen for events on the call object
 * @param callback - is a function that will be called once the processing of the traffic data report is complete. 
 * It sends a response back to the client or caller to indicate the status of the operation
 */
function handleTrafficReport(trafficDataReportManager, call) {

    call.on('data', (request) => {

        try {
            if (request.totalVehicles.trim().toLowerCase() === "y") {
                trafficDataReportManager.reportTotalVehicles(true);
            }
            if (request.speedAverage.trim().toLowerCase() === "y") {
                trafficDataReportManager.reportSpeedAverage(true);
            }
            if (request.trafficDensity.trim().toLowerCase() === "y") {
                trafficDataReportManager.reportTrafficDensity(true);
            }

        } catch (error) {
            console.error(`Error processing request: ${error}`);
            callback(null, { success: false, message: `Error during configuration: ${error.message}` });
        }
    })

    call.on('end', () => {
        call.write({ success: true, message: 'Configuration for traffic report data successful.' });
        call.end();
    });

    // handle any error during communication
    call.on('error', (error) => {
        call.write({ status: false, message: `Error: ${error.message}` });
    });
};



/****
**** SERVER STREAM RPC *****
*s
* This method is responsible for handling the start of a traffic control cycle. 
*/
server.addService(startTrafficControlProtoProto.StartTrafficControl.service, {

    StartTrafficControl: (call) => {
        let trafficControlManager;
        let trafficDataReportManager;
        try {

            // iterate through the list of traffic control systems associated to Control Center System
            for (let tcs of controlCenterInstance.getListTCSManager()) {
                trafficControlManager = tcs.getTrafficControlManager();   // grab instance of the Traffic Control Manager class
                trafficDataReportManager = tcs.getTrafficReportManager();  // grab instance of the Traffic Control Manager class

            }
            // start traffic control cycle
            controlCenterInstance.startTrafficControlCycle();
            handleTrafficControlCycle(trafficControlManager, call);

        } catch (error) { // error handling
            console.error('Error  while starting traffic control cycle:', error);
            call.write({ message: `Error: ${error.message}` });
            call.end();
        }

        // getTrafficReport(trafficDataReportManager, call);

    }
});


/**
 * This fucntion sets up event listeners for various traffic control and
 * data analysis events and writes corresponding messages to a call stream.
 * 
 * @param trafficControlManager - is an event emitter that emits various events related to traffic control cycles, data collection,
 * data analysis, state updates, and error handling in a traffic management system. The function sets
 * up event listeners for different types of events emitted by
 * @param call - is a communication channel used to send messages or data. 
 * In this function, various events related to traffic control cycles, data collection, 
 * data analysis, state updates, and error handling are being listened to
 */
async function handleTrafficControlCycle(trafficControlManager, call) {
    /*** handle traffic control events ***/
    trafficControlManager.on('maximOfCyclesReached', (data) => {
        call.write({ message: data.message });
    });

    trafficControlManager.on('cycleStart', (data) => {
        call.write({ message: `Cycle number ${data.cycleNumber} started` });
    });

    trafficControlManager.on('cycleEnds', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('resetCycle', (data) => {
        call.write({ message: `${data.cycleNumber}` });
    });

    // Handle green phase events ***/
    trafficControlManager.on('greenPhaseStart', (data) => {
        call.write({
            message: `Green phase starts:
         State for TLS ${data.tls1.id} ${data.tls1.state}.
         State for TLS ${data.tls2.id} ${data.tls2.state}.`
        });
    });

    trafficControlManager.on('extendGreenPhase', (data) => {
        call.write({ message: `${data.message}.` });
    });

    // Handle yellow phase events ***/
    trafficControlManager.on('yellowPhaseStart', (data) => {
        call.write({
            message: `Yellow phase starts`
        })
    });

    trafficControlManager.on('yellowPhaseEnd', (data) => {
        call.write({
            message: `
        Yellow phase ended.` });
    });


    /***  Handle data collection events ***/
    trafficControlManager.on('dataCollectionStart', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('dataCollectionEnd', (data) => {
        call.write({ message: `${data.message}` });
    });

    /*** Handle data analyze events ***/
    trafficControlManager.on('dataAnalizeStart', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('dataAnalizeEnd', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('reportTitle', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('scanReport', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('trafficDensity', (data) => {
        call.write({ message: `${data.message}` });
    });

    trafficControlManager.on('noDataToCompare', (data) => {
        call.write({ message: `${data.message}` });
    });

    /*** Handle state update  events ***/
    trafficControlManager.on('updateState', (data) => {
        call.write({
            message: `New state update:
            State for TLS ${data.tls1.id} ${data.tls1.state}.
            State for TLS ${data.tls2.id} ${data.tls2.state}.`
        });
    });

    /*** Handle state update  events ***/
    trafficControlManager.on('notTLSFoundError', (data) => {
        call.write({ message: `${data.message}` });
        call.end();
    });

    /*** Listen for error events from the trafficControlManager ***/
    trafficControlManager.on('error', (err) => {
        console.error('Error during the traffic control cycle:', err);
        call.write({ status: false, message: `Error: ${err.message}` });
        call.end();  // end call
    });

    trafficControlManager.on('end', () => {
        call.end();
    });
}


/***
 * Funtion to handle events when retreiving traffic data reports
 * 
 * HAD NOT TIME TO FIX THE ERROR ON CLIENT STREAM RPC AND IMPLEMENT THIS FUCNTIONALITY
 */
function getTrafficReport(trafficDataReportManager, call) {
    try {
        call.write({ message: trafficDataReportManager.getTLS1report() });
        call.write({ message: trafficDataReportManager.getTLS2report() });

        // end of the RPC
        call.end();

    } catch (err) {
        console.error('Error during retrieving traffic data reports:', err);
        call.write({ success: false, message: `Error: ${err.message}` });
        call.end();  // Ensure to close the call regardless of error
    }
}


// We now have to bind the server to some endpoint 
//...so that using hat endpoint the client can make use of the service
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {

    console.log("Server running at port http://127.0.0.1:50051");
});


