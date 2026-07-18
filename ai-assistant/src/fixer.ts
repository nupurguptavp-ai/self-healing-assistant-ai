import fs from "node:fs/promises";

export async function applyFix(
    filePath: string,
    fixedCode: string
): Promise<boolean> {
    const originalCode = await fs.readFile(filePath, "utf-8");

    if (originalCode === fixedCode) {
        console.log("ℹ️ No changes detected.");
        return false;
    }

    await fs.writeFile(filePath, fixedCode);

    return true;
}