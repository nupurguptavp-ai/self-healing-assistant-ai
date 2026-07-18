import fs from "node:fs/promises";

/**
 * Reads the contents of a source file as a UTF-8 encoded string.
 *
 * @param filePath - Absolute or relative path to the source file.
 * @returns A promise that resolves with the file contents as a string.
 * @throws Will throw an error if the file does not exist or cannot be read.
 */
export const readSourceFile = async (
    filePath: string
): Promise<string> => {
    return await fs.readFile(filePath, "utf-8");
};