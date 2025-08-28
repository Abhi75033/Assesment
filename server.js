import express from "express";
import dotenv from 'dotenv'
import { buildAgent } from './builder/agentBuilder.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

dotenv.config(
    {
        path:'./.env'
    }
)

const app = express()

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));




app.get('/',async(req,res)=>{
    res.send("Hello world")
    res.end
})

app.post('/create-agent', (req, res) => {
    const { name, taskDescription } = req.body || {};
    if (!name || !taskDescription) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        // Dummy file path
        const dummyFilePath = `agents/${name}.js`;

        return res.json({
            message: "Dummy agent created!",
            filePath: dummyFilePath,
            taskDescription
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


app.listen(3000,()=>console.log("server is running")
)
