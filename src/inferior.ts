// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { Disposable } from 'event-kit';

/** Reasons for an inferior terminating. */
export enum InferiorExitReason {
  /** An inferior finished executing and terminated normally. */
  Finished,
  /** An inferior terminated because it received a signal. */
  Signalled,
  /** An inferior terminated (for some reason). */
  Other
}

export interface IInferiorDidExitEvent {
  inferior: IInferior;
  reason: InferiorExitReason;
  exitCode?: string;
}

export interface IInferiorStartOptions {
  cmdlineArgs?: string;
  stopAtStart?: boolean;
}

export interface IInferior {
  start(options?: IInferiorStartOptions): Promise<void>;
  abort(): Promise<void>;
  interrupt(): Promise<void>;
  resume(): Promise<void>;

  onDidExit(callback: (e: IInferiorDidExitEvent) => void): Disposable;
}
