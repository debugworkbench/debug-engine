// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IThread } from './thread';
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

export interface IInferiorDidCreateThreadEvent {
  inferior: IInferior;
  thread: IThread;
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

/** A thread-group or process being debugged. */
export interface IInferior {
  /** Identifier assigned by the debugger to this inferior. */
  id: string;
  /** `true` if the inferior process has started. */
  started: boolean;
  /** `true` if the inferior process has terminated. */
  exited: boolean;
  /** Identifier assigned by the OS to the process associated with this inferior. */
  pid: string;

  start(options?: IInferiorStartOptions): Promise<void>;
  abort(): Promise<void>;
  interrupt(): Promise<void>;
  resume(): Promise<void>;
  /**
   * Disposes of any references held by this object, this should only be called when the object
   * is no longer needed. All threads that belong to this inferior will be disposed.
   */
  dispose(): void;

  /** Adds an event handler that will be invoked when the inferior creates a new thread. */
  onDidCreateThread(callback: (e: IInferiorDidCreateThreadEvent) => void): Disposable;
  /** Adds an event handler that will be invoked when the inferior exits. */
  onDidExit(callback: (e: IInferiorDidExitEvent) => void): Disposable;
}
