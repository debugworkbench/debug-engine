// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

var util = require('util');

function ConnectionError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

util.inherits(ConnectionError, Error);

exports.ConnectionError = ConnectionError;
