import { IInferior } from './inferior';
import { IThread } from './thread';
import { IBreakpoint, IBreakpointDidStopTargetEvent } from './breakpoint';
import { Disposable } from 'event-kit';
export interface ICreateInferiorOptions {
    executableFile?: string;
}
export interface IAddBreakpointParams {
    location: string;
    isEnabled?: boolean;
    isPending?: boolean;
    isHardware?: boolean;
    isOneShot?: boolean;
    ignoreCount?: number;
    condition?: string;
    thread?: IThread;
}
export interface IDebugSession {
    inferior: IInferior;
    start(): Promise<void>;
    createInferior(options?: ICreateInferiorOptions): Promise<IInferior>;
    connectToRemoteTarget(host: string, port: number): Promise<void>;
    addBreakpoint(params: IAddBreakpointParams): Promise<IBreakpoint>;
    removeBreakpoint(breakpoint: IBreakpoint): Promise<void>;
    removeBreakpoints(breakpoints: IBreakpoint[]): Promise<void>;
    enableBreakpoints(breakpoints: IBreakpoint[], doEnable: boolean): Promise<void>;
    onBreakpointDidStopTarget(callback: (e: IBreakpointDidStopTargetEvent) => void): Disposable;
    end(): Promise<void>;
    /**
     * Disposes of any references held by this object, this should only be called when the object
     * is no longer needed. All inferiors, threads, and breakpoints in this session will be disposed.
     *
     * If [[start]] was called [[end]] must be been called before calling this method.
     */
    dispose(): void;
}
