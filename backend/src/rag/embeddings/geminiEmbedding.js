import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateEmbedding(text) {
    if (typeof text !== "string" || !text.trim()) {
        throw new Error("Text must be a non-empty string.");
    }

    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: [{ text }],
        config: {
            outputDimensionality: 768,
        },
    });

    if (!response.embeddings?.length) {
        throw new Error("No embedding returned by Gemini.");
    }

    return response.embeddings[0].values;
}

export default generateEmbedding;