const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { response } = require("express");
const readLine = require('readline');

// import gRPC generated classes
const { ConfigRequest, ConfigResponse } = require('./protos/config_tcs_pb');

const rl = readLine.createInterface({

    input: process.stdin,
    output: process.stdout
});


var PROTO_PATH_1 = __dirname + '/protos/init_traffic_control_system.proto';
var PROTO_PATH_2 = __dirname + '/protos/config_tcs.proto';
var PROTO_PATH_3 = __dirname + '/protos/start_traffic_control.proto'
var PROTO_PATH_4 = __dirname + '/protos/traffic_report.proto'

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

let packageDefinition3 = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH_3, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);


let packageDefinition4 = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH_4, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const client_service_1 = new packageDefinition1.init_traffic_control_system.InitTrafficControlSystem('127.0.0.1:50051', grpc.credentials.createInsecure());
const client_service_2 = new packageDefinition2.config_tcs.ConfigTrafficControlSytem('127.0.0.1:50051', grpc.credentials.createInsecure());
const client_service_3 = new packageDefinition3.start_traffic_control.StartTrafficControl('127.0.0.1:50051', grpc.credentials.createInsecure());
const client_service_4 = new packageDefinition4.traffic_report.TrafficReport('127.0.0.1:50051', grpc.credentials.createInsecure());


/****
 * Method displays a console-based user interface.
 * It propmts user to enter one of the menu options and call controller()
 * to manage the input
 */
async function appMenu() {

    console.log('\nPlease select an option');
    console.log('1: Initialize Traffic Control Systems (Urinary) (InitTrafficControlSystem service)');
    console.log("2: Configure Visual Recognition Systems 'Systems must be previously initialized' (Bidirectional client stream - server stream) (ConfigureVisualRecognitionSystems service)");
    console.log("3: Configure desired data shown on traffic reports' (Client Stream) (TrafficReport service)");
    console.log("4: Start traffic control cycle' (Server Stream) (StartTrafficControl service)");
    console.log("5: Exit");
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

        case ("1"):   //  URINARY RPC

            client_service_1.InitTrafficControlSystem({}, (error, response) => {
                handleError(error, response); // error handling
                appMenu();
            });
            break;

        case ("2"):  // BIDIRECTIONAL CLIENT STREAM-SERVER STREAM RPC

            await handleConfigTCS(); // wait till finishes to jump to next line
            appMenu();   // display menu
            break;

        case ("3"): // CLIENT STREAM RPC
            await handleConfigReport();  // wait till finishes to jump to next line
            appMenu();   // display menu
            break;

        case ("4"):  // SERVER STREAM RCP
            await handleStartControlCycle(); // error handling
            appMenu();
            break;

        case ("5"):
            console.log("Exiting application");
            running = false;
            break;

        default:
            console.log("Invalid input. Exiting...");
            rl.close(); // Close readline interface
            break;
    }

}


/****
 * 
 */
async function handleConfigReport() {

    // promise wrapper for async execution so that app menu is displayed only after task comppletition
    return new Promise(async (resolve, reject) => {
        try {

            const totalVehicles = await askQuestion("\nReport total number of vehicles 'y/n': ");
            const trafficDensity = await askQuestion("Report traffic desnsity levels 'y/n': ");
            const speedAverage = await askQuestion("Report vehicles speed average 'y/n': ");

            // Create a ReportConfig instance and init the streamming call
            const clientStreamRequest = client_service_4.ConfigureReport();

            clientStreamRequest.on('data', (response) => {
                console.log('Server response:', response.message);
            });

            // log a messsage when server ends connection
            clientStreamRequest.on('end', () => {
                console.log('Server ends connection..');
                resolve(true); // it resolves true when the server ends the connection

            });

            // handle any errors during the stream request.
            clientStreamRequest.on('error', (error) => {
                console.error("Error. Something went wrong during client request streaming:", error);
                resolve(false); // it resolves false if an error occurs during the streaming

            });

            clientStreamRequest.write({
                totalVehicles: totalVehicles.trim(),
                trafficDensity: trafficDensity.trim(),
                speedAverage: speedAverage.trim()
            });
            clientStreamRequest.end();

            //listen for commands during connection to send or end the stream
            /* rl.on('line', (input) => {
 
                 const [command, totalVehicles, trafficDensity, speedAverage] = input.split(' ');
                 // Log the values received for debugging
                 console.log("Received command:", command);
                 console.log("Total Vehicles:", totalVehicles);
                 console.log("Traffic Density:", trafficDensity);
                 console.log("Speed Average:", speedAverage);
                 if (command === 'send') {
                     clientStreamRequest.write({
                         totalVehicles: totalVehicles.trim(),
                         trafficDensity: trafficDensity.trim(),
                         speedAverage: speedAverage.trim()
                     });
                 } else if (command === 'end') {
                     clientStreamRequest.end();
                 }
             });*/
        } catch (error) {
            console.error("Configuration failed with an exception:", error);
            reject(error); // Reject the promise if there is an exception
        }
    });
}

/****
  Initiates the StartTrafficControl call to the server and handles the stream of responses.
 * 
 * The function ensures communication feedback from the traffic control system  
 * with real-time updates and handling any communication errors.
 * */
async function handleStartControlCycle() {

    let call = client_service_3.StartTrafficControl({});

    call.on('data', (response) => {
        console.log('\nReceived from server:', response.message);
    })
    // handle any error during communication
    call.on('error', (error) => {
        console.error('\nError from server:', error.message);

    })
    call.on('end', (response) => {
        console.log('\nServer ended stream');

    })
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
*
* I takes configuration parameters for traffic scans and their length,  
* which are then sent to the server, proccess them independantly, 
* and reports user with a stream of messages.
**/
async function handleConfigTCS() {

    // promise wrapper for async execution so that app menu is displayed only after task comppletition
    return new Promise(async (resolve, reject) => {
        try {
            const greenCycleLength = await askQuestion("\nEnter the max length in seconds of the green phase for a traffic light system: ");
            const numbOfTotalCycles = await askQuestion("Enter the max number of total traffic control cycles: ");

            // Create a new ConfigRequest instance and init the streamming call
            const configRequestStream = client_service_2.ConfigTrafficControlSytem();

            // delay to display app menu after task completition
            setTimeout(() => {
                console.log("\nConfiguration completed.");
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


            /*configRequestStream.write({
                greenCycleLength: parseInt(greenCycleLength),
                numbOfTotalCycles: parseInt(numbOfTotalCycles)
            });*/

            // listen for commands during connection to send or end the stream
            rl.on('line', (input) => {
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
    return new Promise(resolve => rl.question(query, resolve));
};


/****************************************************************** */

async function main() {
    await appMenu();

}
// Call the main function to start the interaction
main().catch(err => console.error(err));