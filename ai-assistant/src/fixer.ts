import fs from "node:fs/promises";

export const applyFix = async (
  filePath: string,
  fixedCode: string
): Promise<void> => {
  await fs.writeFile(filePath, fixedCode, "utf-8");
};