import type { StackFrame } from "./types.js";

/**
 * Extracts the file path, line, and column from a stack trace.
 *
 * @param stack - Error stack trace.
 * @returns Parsed stack frame or `null` if parsing fails.
 */
export const parseStackTrace = (
    stack: string
): StackFrame | null => {
    const match = stack.match(/\((.*):(\d+):(\d+)\)/);

    if (!match || !match[1] || !match[2] || !match[3]) {
        return null;
    }

    return {
        filePath: match[1],
        line: Number(match[2]),
        column: Number(match[3]),
    };
};