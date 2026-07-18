import chokidar from "chokidar";
import dotenv from "dotenv";

import { getLatestLog } from "./parser.js";
import { parseStackTrace } from "./stackParser.js";
import { generateFix } from "./ai.js";
import { applyFix } from "./fixer.js";
import { readSourceFile } from "./fileReader.js";

dotenv.config();

const LOG_FILE = process.env.LOG_FILE_PATH;

if (!LOG_FILE) {
    throw new Error("LOG_FILE_PATH is not defined");
}

export const startWatcher = (): void => {
    const watcher = chokidar.watch(LOG_FILE, {
        ignoreInitial: true,
    });

    console.log(`👀 Watching ${LOG_FILE}`);

    watcher.on("change", async () => {
        try {
            console.log("\n🚨 New error detected\n");

            // Read latest log
            const log = await getLatestLog(LOG_FILE);

            console.log("Error:", log.msg);
            console.log("Method:", log.method);
            console.log("URL:", log.url);

            // Parse stack trace
            const frame = parseStackTrace(log.stack);

            if (!frame) {
                console.error("❌ Failed to parse stack trace");
                return;
            }

            console.log("File:", frame.filePath);
            console.log("Line:", frame.line);
            console.log("Column:", frame.column);

            // Read source file
            const sourceCode = await readSourceFile(frame.filePath);

            console.log("📄 Source file loaded");

            // Generate AI fix
            console.log("🤖 Generating AI fix...");

            const fixedCode = await generateFix(log.msg, sourceCode);

            // Apply fix
            await applyFix(frame.filePath, fixedCode);

            console.log("✅ Fix applied successfully");
        } catch (error) {
            console.error("❌ Watcher Error:", error);
        }
    });
};