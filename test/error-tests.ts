import { ConnectionError } from '../lib/errors';
import * as chai from 'chai';
import * as util from 'util';

var expect = chai.expect;

const CONNECTION_ERROR_MESSAGE = 'Failed to connect';

function throwConnectionError(): void {
  throw new ConnectionError(CONNECTION_ERROR_MESSAGE);
}

describe("ConnectionError", () => {
  it("is an instance of Error", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(err).to.be.instanceOf(Error);
	  }
  });

  it("is an instance of ConnectionError", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(err).to.be.instanceOf(ConnectionError);
	  }
  });

  it("is blessed by NodeJS", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(util.isError(err)).to.be.true;
	  }
  });

  it("has the correct name", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(err).to.have.property('name', 'ConnectionError');
	  }
  });

  it("has the correct message", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(err).to.have.property('message', CONNECTION_ERROR_MESSAGE);
	  }
  });

  it("has the correct stack trace", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
      expect(err).to.have.property('stack');
      // the function name the error was thrown from is prefixed by "    at " (7 chars)  
      expect(err.stack.split('\n')[1].indexOf('throwConnectionError')).to.equal(7);
	  }
  });
});
