import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export const generateFix = async (
    error: string,
    sourceCode: string
): Promise<string> => {
    const prompt = `
You are an expert Node.js TypeScript developer.

A runtime error occurred.

Error:
${error}

Source Code:
${sourceCode}

Fix the code.

Rules:
- Return ONLY the complete corrected source code.
- Do not explain anything.
- Do not wrap the response in markdown.
`;

    const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text ?? "";
};