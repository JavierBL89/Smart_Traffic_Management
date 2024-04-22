const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { response } = require("express");
const readLine = require('readline');

// import gRPC generated classes
const { ConfigRequest, ConfigResponse } = require('./protos/config_vrs_pb');

const r1 = readLine.createInterface({

    input: process.stdin,
    output: process.stdout
});

var PROTO_PATH_1 = __dirname + '/protos/init_traffic_control_system.proto';
var PROTO_PATH_2 = __dirname + '/protos/config_vrs.proto';

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
const client_service_2 = new packageDefinition2.config_vrs.ConfigVisualRecognitionSystems('127.0.0.1:50051', grpc.credentials.createInsecure());


/****
 * Method displays a console-based user interface.
 * It propmts user to enter one of the menu options and call controller()
 * to manage the input
 */ async function appMenu() {

    console.log('\nPlease select an option');
    //console.log('1: Add a new Traffic Control System to the network (Urinary) (AddTrafficControlSystem)');
    console.log('1: Initialize Traffic Control Systems (Urinary) (InitTrafficControlSystem service)');
    console.log("2: Configure Visual Recognition Systems 'Systems must be previously initialized' (Server Stream) (ConfigureVisualRecognitionSystems)");
    console.log("3: Exit");
    const userIn = await askQuestion("\nEnter an option ");
    controller(userIn);
}

/**
 * Method orchestrates the flow of operations based on user input.
 * This function is asynchronous, allowing it to handle operations
 * that involve waiting for responses from asynchronous tasks.
 *
 * @param {string} userIn - The user's input, trimmed of any leading or trailing whitespace, which dictates the operation to be performed.
 */
async function controller(userIn) {


    switch (userIn.trim()) {

        case ("1"):   //  URINARY CALL

            const initCall = client_service_1.InitTrafficControlSystem({}, (error, response) => {
                handleError(error, response); // error handling
                appMenu();
            });
            break;

        case ("2"):  // BIDIRECTIONAL CLIENT STREAM-SERVER STREAM COMMUNICATION

            await handleConfigTCS(); // wait till finishes to jump to next line
            appMenu();   // display menu
            break;

        case ("exit"):
            console.log("Exiting application");
            running = false;
            break;

        default:
            console.log("Invalid input. Exiting...");
            r1.close(); // Close readline interface
            break;
    }

}


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
        console.log(response.message)
    }
}

/***
 * Method encapsulates client-stream server-stream communication
*  Handle stream proccess in a single fucntion for readability,
* and synchronized app menu display only after stream connection ends.

* I takes configuration parameters for traffic scans and their length,  
* which are then sent to the server, proccess them independantly, 
* and reports user with a stream of messages.
**/
async function handleConfigTCS(error, response) {

    // promise wrapper for async execution so that app menu is displayed only after task comppletition
    return new Promise(async (resolve, reject) => {
        try {
            const greenCycleLength = await askQuestion("\nEnter the max length in seconds of the green phase for a traffic light system: ");
            const numbOfTotalCycles = await askQuestion("Enter the max number of total traffic control cycles:");

            // Create a new ConfigRequest instance and init the streamming call
            const configRequestStream = client_service_2.ConfigTrafficControlSytem();

            // delay to display app menu after task completition
            setTimeout(() => {
                console.log("Configuration completed.");
                resolve(true); // Resolve true indicates success
            }, 1000);

            // log the messages when server sends data back
            configRequestStream.on('data', (response) => {
                console.log('Update confirmation:', response.message);

            });
            // log a messsage when server ends connection
            configRequestStream.on('end', () => {
                console.log('Server ends connection..');
                resolve(true); // it resolves true when the server ends the connection

            });

            // handle any errors during the streaming session.
            configRequestStream.on('error', (error) => {
                console.error("Error. Something went wrong during server streaming:", error);
                resolve(false); // it resolves false if an error occurs during the streaming

            });

            // send stream of data entered after stream setup
            configRequestStream.write({
                greenCycleLength: parseInt(greenCycleLength),
                numbOfTotalCycles: parseInt(numbOfTotalCycles)
            });

            // listen for more commands during connection to send or end the stream
            r1.on('line', (input) => {
                const [command, greenCycleLength, numbOfTotalCycles] = input.split(' ');
                if (command === 'send') {
                    configRequestStream.write({
                        greenCycleLength: parseInt(greenCycleLength),
                        numbOfTotalCycles: parseInt(numbOfTotalCycles)
                    });
                } else if (command === 'end') {
                    configRequestStream.end();
                }
            });
        } catch (error) {
            console.error("Configuration failed with an exception:", error);
            reject(error); // Reject the promise if there is an exception
        }
    });
}

/***
 * Method handles user prompts
 */
function askQuestion(query) {
    return new Promise(resolve => r1.question(query, resolve));
};

/****************************************************************** */

async function main() {
    await appMenu();

}
// Call the main function to start the interaction
main().catch(err => console.error(err));