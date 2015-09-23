import { IDebugEngine, IDebugConfig } from '../lib/engine';
import { IDebugSession } from '../lib/session';
import { IDebugEngineProvider } from '../lib/provider';
import * as provider from '../lib/provider';
import * as chai from 'chai';

var expect = chai.expect;

class TestDebugEngine implements IDebugEngine {
  get name(): string {
    return 'test-debug-engine';
  }

  createConfig(configName: string): IDebugConfig {
    return { name: 'test', engine: this.name };
  }

  cloneConfig(config: IDebugConfig): IDebugConfig {
    return { name: config.name, engine: config.engine };
  }

  startDebugSession(config: IDebugConfig): Promise<IDebugSession> {
    return null;
  }
}

class TestProvider implements IDebugEngineProvider {
  get engineName(): string {
    return 'test-debug-engine';
  }

  createEngine(): IDebugEngine {
    return new TestDebugEngine();
  }
}

describe("Provider:", () => {
  afterEach(() => {
    provider.unregisterAll();
  });

  describe("#getEngine", () => {
    it("returns an engine of the right type", () => {
      provider.register(new TestProvider());
      const debugEngine = provider.getEngine('test-debug-engine');
      expect(debugEngine).instanceOf(TestDebugEngine);
    });

    it("throws an error if an engine can't be found or created", () => {
      expect(provider.getEngine.bind('none')).to.throw();
    });
  });
});
