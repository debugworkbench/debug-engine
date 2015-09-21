// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IDebugEngine } from './engine';

export interface IDebugEngineProvider {
  engineName: string;
  createEngine(): IDebugEngine;
}

var _providers: IDebugEngineProvider[] = [];
var _engines: IDebugEngine[] = [];

export function register(provider: IDebugEngineProvider): void {
  const existingProviders = _providers.filter((existingProvider) => {
    return provider.engineName === existingProvider.engineName;
  });

  if (existingProviders.length === 0) {
    _providers.push(provider);
  } else {
    throw new Error(`A provider for debug engine "${provider.engineName}" already exists.`);
  }
}

export function unregisterAll(): void {
  _providers = [];
  _engines = [];
}

function createEngine(engineName: string): IDebugEngine {
  const providers = _providers.filter((provider) => {
    return provider.engineName === engineName;
  });

  if (providers.length === 1) {
    return providers[0].createEngine();
  } else {
    throw new Error(`No provider found for debug engine "${engineName}".`);
  }
}

export function getEngine(engineName: string): IDebugEngine {
  for (let i = 0; i < _engines.length; ++i) {
    if (_engines[i].name === engineName) {
      return _engines[i];
    }
  }

  const engine = createEngine(engineName);
  _engines.push(engine);
  return engine;
}
