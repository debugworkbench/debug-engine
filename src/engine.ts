// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IDebugSession } from './session';

export interface IDebugConfig {
  name: string;
  engine: string;
}

export interface IDebugEngine {
  name: string;

  createConfig(configName: string): IDebugConfig;
  cloneConfig(config: IDebugConfig): IDebugConfig;
  startDebugSession(config: IDebugConfig): Promise<IDebugSession>;
}
