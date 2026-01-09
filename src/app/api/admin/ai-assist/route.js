import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        // 1. If OpenAI Key is available, use it for "Grammarly-like" AI
        if (process.env.OPENAI_API_KEY) {
            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: "You are a professional copywriter and grammar assistant. Improve the following product description to be more engaging, grammatically correct, and professional. Keep the tone premium and sophisticated."
                            },
                            {
                                role: "user",
                                content: text
                            }
                        ]
                    })
                });

                const data = await response.json();
                if (data.choices && data.choices[0]) {
                    return NextResponse.json({ text: data.choices[0].message.content.trim() });
                }
            } catch (error) {
                console.error("OpenAI API Error:", error);
                // Fallback to basic if API fails
            }
        }

        // 2. Fallback: Enhanced Heuristic Improvements (Local/Offline)
        let enhancedText = text.trim();

        // Rule 1: Capitalize first letter
        enhancedText = enhancedText.charAt(0).toUpperCase() + enhancedText.slice(1);

        // Rule 2: Fix capitalization of 'i' (standalone)
        enhancedText = enhancedText.replace(/\bi\b/g, 'I');

        // Rule 3: Fix common contractions
        const contractions = {
            "dont": "don't", "cant": "can't", "wont": "won't", "im": "I'm",
            "ive": "I've", "id": "I'd", "youre": "you're", "theyre": "they're",
            "didnt": "didn't", "shouldnt": "shouldn't", "couldnt": "couldn't",
            "isnt": "isn't", "arent": "aren't", "wasnt": "wasn't", "werent": "weren't"
        };
        // Replace while preserving case for start of sentences if needed
        Object.keys(contractions).forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, 'gi');
            enhancedText = enhancedText.replace(regex, (match) => {
                const isCap = match[0] === match[0].toUpperCase();
                const replacement = contractions[key];
                return isCap ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
            });
        });

        // Rule 4: Fix spacing (multiple spaces -> one, formatting around punctuation)
        enhancedText = enhancedText.replace(/\s+/g, ' ');
        enhancedText = enhancedText.replace(/\s+([.,!?:])/g, '$1');
        enhancedText = enhancedText.replace(/([.,!?:])([^\s])/g, '$1 $2');

        // Rule 5: Sentence capitalization
        enhancedText = enhancedText.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());

        // Rule 6: End with period if it looks like a sentence
        if (enhancedText.length > 10 && /[a-z0-9]$/i.test(enhancedText)) {
            enhancedText += '.';
        }

        return NextResponse.json({
            text: enhancedText,
            note: "Enhanced formatting applied (Offline Mode)."
        });

    } catch (error) {
        console.error("AI Assist Error:", error);
        return NextResponse.json({ error: "Failed to process text" }, { status: 500 });
    }
}
