// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IInferior } from './inferior';

export interface ICreateInferiorOptions {
  executableFile?: string;
}

export interface IDebugSession {
  inferior: IInferior;

  start(): Promise<void>;
  createInferior(options?: ICreateInferiorOptions): Promise<IInferior>;
  connectToRemoteTarget(host: string, port: number): Promise<void>;
  end(): Promise<void>;
  /**
   * Disposes of any references held by this object, this should only be called when the object
   * is no longer needed. All inferiors that belong to this session will be disposed.
   */
  dispose(): void;
}
