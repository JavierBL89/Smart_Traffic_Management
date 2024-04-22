// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// ///////////////// Interface definition ////////////////////
//
'use strict';
var grpc = require('@grpc/grpc-js');
var config_tcs_pb = require('./config_tcs_pb.js');

function serialize_config_tcs_ConfigRequest(arg) {
  if (!(arg instanceof config_tcs_pb.ConfigRequest)) {
    throw new Error('Expected argument of type config_tcs.ConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_tcs_ConfigRequest(buffer_arg) {
  return config_tcs_pb.ConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_tcs_ConfigResponse(arg) {
  if (!(arg instanceof config_tcs_pb.ConfigResponse)) {
    throw new Error('Expected argument of type config_tcs.ConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_tcs_ConfigResponse(buffer_arg) {
  return config_tcs_pb.ConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// ***
// Service allows a user to configure Visual REcognition Systems . 
// The user specifies parameters for traffic scans and their length,  
// which are then sent to the server, proccess them independantly, 
// and reports user with a stream of messages.
//
// Service definition
var ConfigTrafficControlSytemService = exports.ConfigTrafficControlSytemService = {
  configTrafficControlSytem: {
    path: '/config_tcs.ConfigTrafficControlSytem/ConfigTrafficControlSytem',
    requestStream: true,
    responseStream: true,
    requestType: config_tcs_pb.ConfigRequest,
    responseType: config_tcs_pb.ConfigResponse,
    requestSerialize: serialize_config_tcs_ConfigRequest,
    requestDeserialize: deserialize_config_tcs_ConfigRequest,
    responseSerialize: serialize_config_tcs_ConfigResponse,
    responseDeserialize: deserialize_config_tcs_ConfigResponse,
  },
};

exports.ConfigTrafficControlSytemClient = grpc.makeGenericClientConstructor(ConfigTrafficControlSytemService);
