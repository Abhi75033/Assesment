import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path:'./.env' });

const app = express();
app.use(express.json());

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve agents folder
app.use('/agents', express.static(path.join(__dirname, 'agents')));

// Dummy POST route to create agent
app.post('/create-agent', (req, res) => {
    const { name, taskDescription } = req.body || {};
    if (!name || !taskDescription) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const dummyFilePath = `agents/${name}.js`;

        // Optionally, create dummy file on disk
        // fs.writeFileSync(path.join(__dirname, dummyFilePath), "// Dummy agent file");

        return res.json({
            message: "Dummy agent created!",
            filePath: dummyFilePath,
            taskDescription
        });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
});



try {
    app.listen(5000, () => console.log(`Server running on port`));
} catch(err) {
    console.error("Server failed:", err);
}

