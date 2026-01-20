import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the AI client once at the top level for efficiency
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/analyze', async (req, res) => {
    const { message } = req.body;

    try {
        // Use gemini-2.5-flash for the best balance of speed and reliability
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: [{ role: "user", parts: [{ text: message }] }],
            config: {
                systemInstruction: "You are a professional Health Assistant. Provide concise, helpful health and mental wellness advice.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        reply: { type: "string" },
                        mhScore: { type: "number" },
                        phScore: { type: "number" },
                        color: { type: "string", enum: ["GREEN", "ORANGE", "RED"] }
                    },
                    required: ["reply", "mhScore", "phScore", "color"]
                }
            }
        });

        // The new SDK returns response.text directly as a string
        return res.json(JSON.parse(response.text));

    } catch (error) {
        console.error("AI Error:", error);

        // Handle specific API errors like rate limits (429)
        if (error.status === 429) {
            return res.status(429).json({ 
                reply: "The service is temporarily busy. Please try again in a moment.",
                mhScore: 0, phScore: 0, color: "ORANGE" 
            });
        }

        res.status(500).json({ 
            reply: "I'm having trouble connecting to my brain right now. Please try again later.",
            mhScore: 0, phScore: 0, color: "RED" 
        });
    }
});

app.listen(PORT, () => console.log(`HealthAI running on http://localhost:${PORT}`));