// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// ///////////////// Interface definition ////////////////////
//
'use strict';
var grpc = require('@grpc/grpc-js');
var traffic_report_pb = require('./traffic_report_pb.js');

function serialize_traffic_report_ReportConfig(arg) {
  if (!(arg instanceof traffic_report_pb.ReportConfig)) {
    throw new Error('Expected argument of type traffic_report.ReportConfig');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_traffic_report_ReportConfig(buffer_arg) {
  return traffic_report_pb.ReportConfig.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_traffic_report_ReportResponse(arg) {
  if (!(arg instanceof traffic_report_pb.ReportResponse)) {
    throw new Error('Expected argument of type traffic_report.ReportResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_traffic_report_ReportResponse(buffer_arg) {
  return traffic_report_pb.ReportResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// *
// Define a client-streaming RPC for traffic report configuration
//
// Service allows user to enter a stream of desired parameters collected 
// during the cycles of the traffic control systems to be reported after TLS operation ends.
// After user selection, server responds with a confirmation of the report configuration 
//
//
// Service definition
var TrafficReportService = exports.TrafficReportService = {
  configureReport: {
    path: '/traffic_report.TrafficReport/ConfigureReport',
    requestStream: true,
    responseStream: false,
    requestType: traffic_report_pb.ReportConfig,
    responseType: traffic_report_pb.ReportResponse,
    requestSerialize: serialize_traffic_report_ReportConfig,
    requestDeserialize: deserialize_traffic_report_ReportConfig,
    responseSerialize: serialize_traffic_report_ReportResponse,
    responseDeserialize: deserialize_traffic_report_ReportResponse,
  },
};

exports.TrafficReportClient = grpc.makeGenericClientConstructor(TrafficReportService);
