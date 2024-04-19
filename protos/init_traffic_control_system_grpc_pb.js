// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// ///////////////// Interface definition   ////////////////////
//
'use strict';
var grpc = require('@grpc/grpc-js');
var init_traffic_control_system_pb = require('./init_traffic_control_system_pb.js');

function serialize_init_traffic_control_system_InitRequest(arg) {
  if (!(arg instanceof init_traffic_control_system_pb.InitRequest)) {
    throw new Error('Expected argument of type init_traffic_control_system.InitRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_init_traffic_control_system_InitRequest(buffer_arg) {
  return init_traffic_control_system_pb.InitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_init_traffic_control_system_InitResponse(arg) {
  if (!(arg instanceof init_traffic_control_system_pb.InitResponse)) {
    throw new Error('Expected argument of type init_traffic_control_system.InitResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_init_traffic_control_system_InitResponse(buffer_arg) {
  return init_traffic_control_system_pb.InitResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// service definition
var InitTrafficControlSystemService = exports.InitTrafficControlSystemService = {
  initTrafficControlSystem: {
    path: '/init_traffic_control_system.InitTrafficControlSystem/InitTrafficControlSystem',
    requestStream: false,
    responseStream: false,
    requestType: init_traffic_control_system_pb.InitRequest,
    responseType: init_traffic_control_system_pb.InitResponse,
    requestSerialize: serialize_init_traffic_control_system_InitRequest,
    requestDeserialize: deserialize_init_traffic_control_system_InitRequest,
    responseSerialize: serialize_init_traffic_control_system_InitResponse,
    responseDeserialize: deserialize_init_traffic_control_system_InitResponse,
  },
};

exports.InitTrafficControlSystemClient = grpc.makeGenericClientConstructor(InitTrafficControlSystemService);
