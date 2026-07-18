import fs from "node:fs/promises";
import type { ErrorLog } from "./types.js";

/**
 * Reads and returns the most recent error log from the log file.
 *
 * @param logFile - Path to the log file.
 * @returns The latest parsed error log.
 */
export const getLatestLog = async (
    logFile: string
): Promise<ErrorLog> => {
    const fileContent = await fs.readFile(logFile, "utf-8");

    const logs = fileContent.trim().split("\n");

    const latestLog = logs.at(-1);

    if (!latestLog) {
        throw new Error(`No logs found in ${logFile}`);
    }

    return JSON.parse(latestLog) as ErrorLog;
};