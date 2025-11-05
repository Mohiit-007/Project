// test.js - Run with: node test.js
async function testGeminiKey() {
    const apiKey = "AIzaSyBexG7-m79gBWvufnh5V6sttWnDWOxe3bo";
    
    try {
        console.log("🔍 Testing Gemini API key...");
        
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Say 'Hello World' in a short response."
                    }]
                }]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ API key is working!");
            console.log("Response:", data.candidates[0].content.parts[0].text);
            return true;
        } else {
            const error = await response.json();
            console.log("❌ API error:", response.status, JSON.stringify(error));
            return false;
        }
    } catch (error) {
        console.log("❌ Connection failed:", error.message);
        return false;
    }
}

testGeminiKey();