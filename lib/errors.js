// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

var util = require('util');

function DebugEngineError(message, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.detail = detail;
}

util.inherits(DebugEngineError, Error);

exports.DebugEngineError = DebugEngineError;

function ConnectionError(message, detail) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.detail = detail;
}

util.inherits(ConnectionError, DebugEngineError);

exports.ConnectionError = ConnectionError;
