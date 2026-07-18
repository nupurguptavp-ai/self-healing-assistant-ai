import fs from "node:fs/promises";

export const readSourceFile = async (
    filePath: string
): Promise<string> => {
    return await fs.readFile(filePath, "utf-8");
};