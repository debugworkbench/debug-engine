"use strict";

// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.
var _providers = [];
var _engines = [];
function register(provider) {
    const existingProviders = _providers.filter(existingProvider => {
        return provider.engineName === existingProvider.engineName;
    });
    if (existingProviders.length === 0) {
        _providers.push(provider);
    } else {
        throw new Error(`A provider for debug engine "${ provider.engineName }" already exists.`);
    }
}
exports.register = register;
function unregisterAll() {
    _providers = [];
    _engines = [];
}
exports.unregisterAll = unregisterAll;
function createEngine(engineName) {
    const providers = _providers.filter(provider => {
        return provider.engineName === engineName;
    });
    if (providers.length === 1) {
        return providers[0].createEngine();
    } else {
        throw new Error(`No provider found for debug engine "${ engineName }".`);
    }
}
function getEngine(engineName) {
    for (let i = 0; i < _engines.length; ++i) {
        if (_engines[i].name === engineName) {
            return _engines[i];
        }
    }
    const engine = createEngine(engineName);
    _engines.push(engine);
    return engine;
}
exports.getEngine = getEngine;