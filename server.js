

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Import necessary modules
const ControlCentreSystem = require('./src/services/controlCentreSystem/ControlCentreSystem'); // Import ControlCenterServer module


var PROTO_PATH = __dirname + '/protos/init_traffic_control_system.proto';
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
        try {
            switch (service) {
                case "init":
                    ControlCentreSystem.main();
                    result = "Traffic Control Systems initialized";
                    break;
                default:
                    callback(new Error("Invalid service"));
            }
            callback(null, { status: "OK", message: result });
        } catch (error) {

            console.error('An error occurred in InitTrafficControlSystem:', error);
            callback({           // Pass the error to the client
                code: grpc.status.INTERNAL,
                message: error.message
            });
        }
    },
});

// We now have to bind the server to some endpoint 
//...so that using hat endpoint the client can make use of the service
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {

    console.log("Server running at port http://127.0.0.1:50051");
});
