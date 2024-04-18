const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { response } = require("express");
const readLine = require('readline');

const r1 = readLine.createInterface({

    input: process.stdin,
    output: process.stdout
});

var PROTO_PATH_1 = __dirname + '/protos/init_traffic_control_system.proto';
var PROTO_PATH_2 = __dirname + '/protos/config_visual_control_systems.proto';

let packageDefinition1 = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH_1, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

let packageDefinition2 = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH_2, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const client_service_1 = new packageDefinition1.init_traffic_control_system.InitTrafficControlSystem('127.0.0.1:50051', grpc.credentials.createInsecure());
const client_service_2 = new packageDefinition2.config_visual_control_systems.ConfigureVisualRecognitionSystems('127.0.0.1:50051', grpc.credentials.createInsecure());

/*****
 * Method handles some potentiantial error during communication.
 * 
 * It allows code reusability, modularity 
 */
function handleError(error, response) {
    if (error) {
        if (error == grpc.status.DEADLINE_EXCEEDED) {
            console.error("Request limit time out. Please check your network connection or resboot application");
        } else if (error == grpc.status.UNAVAILABLE) {
            console.error("Server is shutting down or unavailable... Please try again later");
        } else {
            console.error(error)
        }

    } else {
        console.log(response.message);

    }
}

/***
 * 
 */
function askQuestion(query) {

    return new Promise(resolve => r1.question(query, resolve));
};


async function main() {

    console.log('Please select an option following the order of steps');
    //console.log('1: Add a new Traffic Control System to the network (Urinary) (AddTrafficControlSystem)');

    console.log('1: Initialize Traffic Control Systems (Server streaming) (InitTrafficControlSystem)');
    const userIn = await askQuestion("Enter an option\n");

    switch (userIn) {
        case ("2"):
            // Server streaming call
            const call = client_service_1.InitTrafficControlSystem((error, response) => {
                handleError(error, response); // error handling
            });

            call.on("data", (response) => {
                console.log(response.message); // print feedback messages from the server
            });
            call.on("end", () => {
                r1.close()
            });
            // handle error during streamming communication
            call.on('error', (error) => {
                console.error("Error occurred during server streaming:", error);
                r1.close(); // Close readline interface
            });

            break;
        default:
            console.log("Invalid input. Exiting...");
            r1.close(); // Close readline interface
            break;
    }
}
// Call the main function to start the interaction
main().catch(err => console.error(err));