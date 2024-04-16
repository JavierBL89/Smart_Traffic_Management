

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Import necessary modules
const ControlCentreSystem = require('./src/services/controlCentreSystem/ControlCentreSystem'); // Import ControlCenterServer module


var PROTO_PATH = __dirname + '/init_traffic_control_system.proto';
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const initTrafficControlSystemProto = protoDescriptor.init_traffic_control_system;


const server = new grpc.Server();


server.addService(initTrafficControlSystemProto.InitTrafficControlSystem.service, {


    InitTrafficControlSystem: (call, callback) => {

        // Instantiate ControlCenterServer
        const { service } = call.request;
        let result;
        switch (service) {
            case "init":
                // Call main method of ControlCenterServer to start traffic control
                ControlCentreSystem.main();
                result = "System initialized"
                break;

            default: return callback(new Error("Invalid service"));

        }
        callback(null, { status: "OK", message: result });
    },
});

// We now have to bind the server to some endpoint 
//...so that using hat endpoint the client can make use of the service
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {

    console.log("Server running at port http://127.0.0.1:50051");
});
