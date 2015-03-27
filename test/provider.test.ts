/// <reference path="../typings/test/tsd.d.ts" />
/// <reference path="../lib/engine.d.ts" />
/// <reference path="../lib/provider.d.ts" />

import Engine = require('../lib/engine');
import DebugEngine = Engine.DebugEngine;
import Provider = require('../lib/provider');
import DebugEngineProvider = Provider.DebugEngineProvider;
import chai = require('chai');
var expect = chai.expect;

class TestDebugEngine implements DebugEngine {
}

class TestProvider implements DebugEngineProvider {
  provides(name: string): boolean {
    if (name === 'test') {
      return true;
    }
    return false;
  }

  createEngine(): DebugEngine {
    return new TestDebugEngine();
  }
}

describe('Provider Tests:', () => {

  describe('Provider', () => {
    it('tracks registered providers', () => {
      Provider.provide(new TestProvider());
      var debugEngine = Provider.getEngine('test');
      expect(Provider.getEngine.bind('none')).to.throw('Oh no');
    });
  });

});
