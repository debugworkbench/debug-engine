// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IThread } from './thread';
import { Disposable } from 'event-kit';

export interface IBreakpointDidStopTargetEvent {
  /** The breakpoint that caused the target to stop. */
  breakpoint: IBreakpoint;
  /** The breakpoint location that was actually hit. */
  location: IBreakpointLocation;
  /** The thread that actually hit the breakpoint. */
  thread: IThread;
  /** All the threads that have been stopped. */
  stoppedThreads: IThread[];
  /** The CPU core on which the thread that hit the breakpoint was running. */
  processorCore?: string;
}

export interface IBreakpointLocation {
  /** Read-only. */
  id: string;
  /** Read-only. */
  isEnabled: boolean;
  /** Read-only. */
  address: string;
  /** Read-only. */
  func: string;
  /** Read-only. */
  relativePath: string;
  /** Read-only. */
  absolutePath: string;
  /** Read-only. */
  lineNumber: number;

  dispose(): void;
}

export interface IBreakpointFindLocationParams {
  address: string;
  func: string;
  relativePath: string;
  absolutePath: string;
  lineNumber: number;
}

export interface IBreakpoint {
  id: number;
  isEnabled: boolean;
  isHardware: boolean;
  isOneShot: boolean;
  condition: string;
  ignoreCount: number;
  enableCount: number;
  hitCount: number;
  thread: IThread;
  originalLocation: string;
  locations: IBreakpointLocation[];

  enable(doEnable: boolean): Promise<void>;
  setCondition(condition: string): Promise<void>;
  setIgnoreCount(count: number): Promise<void>;
  findLocation({
	  address, func, relativePath, absolutePath, lineNumber
  }: IBreakpointFindLocationParams): IBreakpointLocation;
  dispose(): void;

  /** Adds an event handler that will be invoked when the breakpoint is hit. */
  onDidStopTarget(callback: (e: IBreakpointDidStopTargetEvent) => void): Disposable;
}
