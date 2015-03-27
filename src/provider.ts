import engine = require('engine');
import DebugEngine = engine.DebugEngine;

export interface DebugEngineProvider {
  provides(name: string): boolean;

  createEngine(): DebugEngine;
}

var _providers: DebugEngineProvider[] = [];

export function provide (provider: DebugEngineProvider): void {
  _providers.push(provider);
}

export function getEngine (name: string): DebugEngine {
  var providers = _providers.filter((provider: DebugEngineProvider): boolean => {
    return provider.provides(name);
  });
  if (providers.length > 1) {
    throw("Oh no");
  } else if (providers.length === 1) {
    return providers[0].createEngine();
  } else {
    throw("Oh no");
  }
}
