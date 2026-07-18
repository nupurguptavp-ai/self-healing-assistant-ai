export interface ErrorLog {
    level: number;
    time: number;
    pid: number;
    hostname: string;
    method: string;
    url: string;
    stack: string;
    msg: string;
}

export interface StackFrame {
    filePath: string;
    line: number;
    column: number;
}