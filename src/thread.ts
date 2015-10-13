// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IInferior } from './inferior';
import { Disposable } from 'event-kit';

export interface IThreadDidResumeEvent {
  thread: IThread;
}

export interface IThreadDidStopEvent {
  thread: IThread;
}

export interface IThreadDidExitEvent {
  thread: IThread;
}

/** A thread in the inferior being debugged. */
export interface IThread {
  /** Read-only. */
  id: number;
  /** Read-only. */
  inferior: IInferior;

  /**
   * Disposes of any references held by this object, this should only be called when the object
   * is no longer needed.
   */
  dispose(): void;

  onDidResume(callback: (e: IThreadDidResumeEvent) => void): Disposable;
  onDidStop(callback: (e: IThreadDidStopEvent) => void): Disposable;
  onDidExit(callback: (e: IThreadDidExitEvent) => void): Disposable;
}
