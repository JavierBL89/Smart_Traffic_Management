// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// ///////////////// Interface definition ////////////////////
//
'use strict';
var grpc = require('@grpc/grpc-js');
var config_vrs_pb = require('./config_vrs_pb.js');

function serialize_config_vrs_ConfigRequest(arg) {
  if (!(arg instanceof config_vrs_pb.ConfigRequest)) {
    throw new Error('Expected argument of type config_vrs.ConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_vrs_ConfigRequest(buffer_arg) {
  return config_vrs_pb.ConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_vrs_ConfigResponse(arg) {
  if (!(arg instanceof config_vrs_pb.ConfigResponse)) {
    throw new Error('Expected argument of type config_vrs.ConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_config_vrs_ConfigResponse(buffer_arg) {
  return config_vrs_pb.ConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service definition
var ConfigVisualRecognitionSystemsService = exports.ConfigVisualRecognitionSystemsService = {
  configVisualRecognitionSystems: {
    path: '/config_vrs.ConfigVisualRecognitionSystems/ConfigVisualRecognitionSystems',
    requestStream: true,
    responseStream: true,
    requestType: config_vrs_pb.ConfigRequest,
    responseType: config_vrs_pb.ConfigResponse,
    requestSerialize: serialize_config_vrs_ConfigRequest,
    requestDeserialize: deserialize_config_vrs_ConfigRequest,
    responseSerialize: serialize_config_vrs_ConfigResponse,
    responseDeserialize: deserialize_config_vrs_ConfigResponse,
  },
};

exports.ConfigVisualRecognitionSystemsClient = grpc.makeGenericClientConstructor(ConfigVisualRecognitionSystemsService);
