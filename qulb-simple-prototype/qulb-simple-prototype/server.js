const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (your HTML)
app.use(express.static('.'));

// Proxy endpoint for Gemini API
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt, context } = req.body;
        const apiKey = "AIzaSyBFmXzknGfTSoQsIRqCQFqqdtyJSbR-Ia8"; // Your Gemini API key
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: context ? `${context}\n\n${prompt}` : prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Qulb server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/qulb.html in your browser`);
});