import { DebugEngine } from '../lib/engine';
import * as Provider from '../lib/provider';
import { DebugEngineProvider } from '../lib/provider';
import * as chai from 'chai';
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
