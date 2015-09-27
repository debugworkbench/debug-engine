import { DebugEngineError, ConnectionError } from '../lib/errors';
import * as chai from 'chai';
import * as util from 'util';

var expect = chai.expect;

const DEBUG_ENGINE_ERROR_MESSAGE = 'Something failed';
const DEBUG_ENGINE_ERROR_DETAIL = 'Debug engine error details';
const CONNECTION_ERROR_MESSAGE = 'Failed to connect';
const CONNECTION_ERROR_DETAIL = 'Connection error details';

function throwDebugEngineError(): void {
  throw new DebugEngineError(DEBUG_ENGINE_ERROR_MESSAGE, DEBUG_ENGINE_ERROR_DETAIL);
}

function throwConnectionError(): void {
  throw new ConnectionError(CONNECTION_ERROR_MESSAGE, CONNECTION_ERROR_DETAIL);
}

describe("DebugEngineError", () => {
  it("is an Error", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
	    expect(err).to.be.instanceOf(Error);
	  }
  });

  it("is a DebugEngineError", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
	    expect(err).to.be.instanceOf(DebugEngineError);
	  }
  });

  it("is blessed by NodeJS", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
	    expect(util.isError(err)).to.be.true;
	  }
  });

  it("has the correct name", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
	    expect(err).to.have.property('name', 'DebugEngineError');
	  }
  });

  it("has the correct message", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
	    expect(err).to.have.property('message', DEBUG_ENGINE_ERROR_MESSAGE);
	  }
  });

  it("has the correct stack trace", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
      expect(err).to.have.property('stack');
      // the function name the error was thrown from is prefixed by "    at " (7 chars)  
      expect(err.stack.split('\n')[1].indexOf('throwDebugEngineError')).to.equal(7);
	  }
  });

  it("has the correct detail", () => {
    try {
	    throwDebugEngineError();
	  } catch (err) {
      expect(err).to.have.property('detail', DEBUG_ENGINE_ERROR_DETAIL);
	  }
  });
});

describe("ConnectionError", () => {
  it("is an Error", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(err).to.be.instanceOf(Error);
	  }
  });

  it("is a DebugEngineError", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
	    expect(err).to.be.instanceOf(DebugEngineError);
	  }
  });

  it("is a ConnectionError", () => {
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

  it("has the correct detail", () => {
    try {
	    throwConnectionError();
	  } catch (err) {
      expect(err).to.have.property('detail', CONNECTION_ERROR_DETAIL);
	  }
  });
});
