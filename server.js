

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Import necessary modules
const ControlCentreSystem = require('./src/services/controlCentreSystem/ControlCentreSystem'); // Import ControlCenterServer module


// import gRPC generated classes
const { ConfigRequest, ConfigResponse } = require('./protos/config_vrs_pb');

var PROTO_PATH_1 = __dirname + '/protos/init_traffic_control_system.proto';
var PROTO_PATH_2 = __dirname + '/protos/config_vrs.proto';
var PROTO_PATH_3 = __dirname + '/protos/start_traffic_control.proto'

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

var protoDescriptor1 = grpc.loadPackageDefinition(packageDefinition1);
var protoDescriptor2 = grpc.loadPackageDefinition(packageDefinition2);
var protoDescriptor3 = grpc.loadPackageDefinition(packageDefinitio3);


const initTrafficControlSystemProto = protoDescriptor1.init_traffic_control_system;
const configVisualRecognitionSystemsProto = protoDescriptor2.config_vrs;
const startTrafficControlProtoProto = protoDescriptor3.start_traffic_control;

const server = new grpc.Server();
let controlCenterInstance;

/****
*
**** SERVER STREAM COMMUNICATION *****
**/
server.addService(startTrafficControlProtoProto.StartTrafficControl.service, {

    StartTrafficControl: (call) => {

        const request = call.request;


    }

});

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


/****
* Service allows a user to configure Visual Recognition Systems . 
* The user specifies parameters for traffic scans and their length,  
* which are then sent to the server, proccess them independantly, 
* and reports user with a stream of messages.
*
**** BIDIRECTIONAL CLIENT STREAM-SERVER STREAM COMMUNICATION *****
**/
server.addService(configVisualRecognitionSystemsProto.ConfigTrafficControlSytem.service, {

    ConfigTrafficControlSytem: (call) => {

        call.on('data', (request) => {
            const greenCycleLength = request.greenCycleLength;
            const numbOfTotalCycles = request.numbOfTotalCycles;
            console.log(`Received greenCycleLength: ${greenCycleLength}, numbOfTotalCycles: ${numbOfTotalCycles}`);

            /*** handle each parameter independatly ***/

            // process and report the number of scans
            try {
                controlCenterInstance.configTCSGreenCycleLength(request.greenCycleLength);
                call.write({ status: true, message: `Number of scans set to ${request.greenCycleLength}` });
            } catch (error) {
                call.write({ status: false, message: `Error setting number of scans: ${error.message}` });
            }

            // process and report the scan length in seconds
            try {
                controlCenterInstance.configTCSNumOfTotalCycles(request.numbOfTotalCycles);
                call.write({ status: true, message: `Scan length set to ${request.numbOfTotalCycles} seconds` });
            } catch (error) {
                call.write({ status: false, message: `Error setting scan length: ${error.message}` });
            }

            call.on('end', () => {
                call.end(); // close stream
            });
        });
    }
});



/** 
 * Method responsible for configuring the Visusal Recognition Systems (VRS)
 * It configures:
 * 
 * @param {number} numOfScans - The number of micro traffic scans in a scan cycle for each visual recognition system.
 * @param {number} scanLengthInSeconds - The duration of micro scan each scan in seconds.
 * @returns {string} A message indicating the result of the configuration proccess.
 */
const configVisualRecognitionSystems = (numOfScans, scanLengthInSeconds) => {

    try {
        // Instantiate ControlCenterServer
        controlCenterInstance.configureVisualRecognitionSystem(numOfScans, scanLengthInSeconds);

        return "\nhjhcdVisual recognition systems have been configured successfully."
            + "\nNumber of scans per scan cycle: " + numOfScans
            + "\nScans length in seconds: " + scanLengthInSeconds;

    } catch (error) {
        console.error('An error occurred during visual recognition configuration:', error);
        return "Failed to configure visual recognition systems: " + error.message;

    }
}


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


// We now have to bind the server to some endpoint 
//...so that using hat endpoint the client can make use of the service
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {

    console.log("Server running at port http://127.0.0.1:50051");
});
