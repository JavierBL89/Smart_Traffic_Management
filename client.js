const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readLine = require('readline');

const r1 = readLine.createInterface({

    input: process.stdin,
    output: process.stdout
});

var PROTO_PATH = __dirname + '/init_traffic_control_system.proto';

let packageDefinition = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const client = new packageDefinition.init_traffic_control_system.InitTrafficControlSystem('127.0.0.1:50051', grpc.credentials.createInsecure());

function askQuestion(query) {

    return new Promise(resolve => r1.question(query, resolve));
};

async function main() {

    //  console.log("Init Traffic Control System");

    const userIn = await askQuestion("Enter init to initilaize system\n");

    switch (userIn) {
        case ("init"):
            client.InitTrafficControlSystem({ service: "init" }, (error, response) => {
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
                r1.close();
            });
            break;
        default:
            console.log("Invalid input. Exiting...");
            r1.close();
            break;
    }
}

// Call the main function to start the interaction
main().catch(err => console.error(err));