

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Import necessary modules
const ControlCentreSystem = require('./src/services/controlCentreSystem/ControlCentreSystem'); // Import ControlCenterServer module


var PROTO_PATH_1 = __dirname + '/protos/init_traffic_control_system.proto';
var PROTO_PATH_2 = __dirname + '/protos/config_visual_control_systems.proto';

let packageDefinition1 = protoLoader.loadSync(PROTO_PATH_1, {
    keepCase: true,
    longs: String,
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
var protoDescriptor1 = grpc.loadPackageDefinition(packageDefinition1);
var protoDescriptor2 = grpc.loadPackageDefinition(packageDefinition2);

const initTrafficControlSystemProto = protoDescriptor1.init_traffic_control_system;
const configVisualRecognitionSystemsProto = protoDescriptor2.config_visual_control_systems;


const server = new grpc.Server();
let controlCenterInstance;

server.addService(initTrafficControlSystemProto.InitTrafficControlSystem.service, {


    InitTrafficControlSystem: (call) => {
        const feedback = initTrafficControlSystems();  // init
        call.write({ message: feedback })  // send initialization feedback to the user
        call.end();
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


// We now have to bind the server to some endpoint 
//...so that using hat endpoint the client can make use of the service
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {

    console.log("Server running at port http://127.0.0.1:50051");
});
