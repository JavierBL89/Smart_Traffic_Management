// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// ///////////////// Interface definition   ////////////////////
//
'use strict';
var grpc = require('@grpc/grpc-js');
var start_traffic_control_pb = require('./start_traffic_control_pb.js');

function serialize_start_traffic_control_StartRequest(arg) {
  if (!(arg instanceof start_traffic_control_pb.StartRequest)) {
    throw new Error('Expected argument of type start_traffic_control.StartRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_start_traffic_control_StartRequest(buffer_arg) {
  return start_traffic_control_pb.StartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_start_traffic_control_StartResponse(arg) {
  if (!(arg instanceof start_traffic_control_pb.StartResponse)) {
    throw new Error('Expected argument of type start_traffic_control.StartResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_start_traffic_control_StartResponse(buffer_arg) {
  return start_traffic_control_pb.StartResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// service definition
var StartTrafficControlService = exports.StartTrafficControlService = {
  startTrafficControl: {
    path: '/start_traffic_control.StartTrafficControl/StartTrafficControl',
    requestStream: false,
    responseStream: true,
    requestType: start_traffic_control_pb.StartRequest,
    responseType: start_traffic_control_pb.StartResponse,
    requestSerialize: serialize_start_traffic_control_StartRequest,
    requestDeserialize: deserialize_start_traffic_control_StartRequest,
    responseSerialize: serialize_start_traffic_control_StartResponse,
    responseDeserialize: deserialize_start_traffic_control_StartResponse,
  },
};

exports.StartTrafficControlClient = grpc.makeGenericClientConstructor(StartTrafficControlService);
