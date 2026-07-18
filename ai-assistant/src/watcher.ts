import chokidar from "chokidar";
import dotenv from "dotenv";

import { getLatestLog } from "./parser.js";
import { parseStackTrace } from "./stackParser.js";
import { generateFix } from "./ai.js";
import { applyFix } from "./fixer.js";
import { readSourceFile } from "./fileReader.js";

import {
    checkoutDevBranch,
    createFixBranch,
    commitFix,
    pushBranch,
} from "./git.js";
import { createPullRequest } from "./github.js";

dotenv.config();

let isProcessing = false;
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
        if (isProcessing) {
            console.log("⏳ Already processing an error. Skipping...");
            return;
        }
        isProcessing = true;
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

            // Prepare Git
            await checkoutDevBranch();
            const branchName = await createFixBranch();

            // Generate AI fix
            console.log("🤖 Generating AI fix...");

            const fixedCode = await generateFix(log.msg, sourceCode);

            // Apply fix
            const hasChanges = await applyFix(frame.filePath, fixedCode);

            if (!hasChanges) {
                console.log("⏭️ Skipping commit because no changes were made.");
                return;
            }

            // Commit
            await commitFix("fix: AI generated runtime fix");

            // Push
            await pushBranch(branchName);
            await createPullRequest(branchName);
            // Switch back to dev
            // await checkoutDevBranch();

            console.log("✅ Fix applied, committed, pushed, and returned to dev");
        } catch (error) {
            console.error("❌ Watcher Error:", error);
        } finally {
            isProcessing = false;
        }
    });
};