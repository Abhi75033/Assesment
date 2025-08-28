import fs from 'fs-extra';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(
    {
        path:'./.env'
    }
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function buildAgent(name, taskDescription) {
    // Generate agent code via GPT
    const prompt = `
        Write a Node.js module that exports a function named "${name}".
        The function should perform this task: ${taskDescription}.
        Include proper comments and async/await where needed.
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    const code = response.choices[0].message.content;
    const filePath = path.join('agents', `${name}.js`);
    await fs.outputFile(filePath, code);

    return filePath;
}
