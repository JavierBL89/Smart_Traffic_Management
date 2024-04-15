

const grpc = require("@grpc/grpc-js");
const protoloader = require("@grpc/proto-loader");
const packageDefinition = protoloader.loadSync('init_traffic_control_system.proto', {});
const initTrafficControlSystemProto = grpc.loadPackageDefinition(packageDefinition).init_traffic_control_system;

// Import necessary modules
const ControlCenterServer = require('./src/services/controlCentreSystem/ControlCentreSystem'); // Import ControlCenterServer module

const server = new grpc.Server();

server.addService(initTrafficControlSystemProto.InitTrafficControlSystem.server, {

    InitTrafficControlSystem: (call, callback) => {

        // Instantiate ControlCenterServer
        const controlCenter = new ControlCenterServer();

        const { service } = call.request;

        let result;
        switch (service) {
            case "init":
                // Call main method of ControlCenterServer to start traffic control
                ControlCenterServer.main();

                break;
            default: return callback(new Error("Invalid service"));
        }
        callback(null, {});
    },
});

server.InitTrafficControlSystem();