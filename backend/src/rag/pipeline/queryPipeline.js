import generateEmbedding from "../embeddings/geminiEmbedding.js";
import searchSimilarChunks from "../storage/vectorSearch.js";
import buildPrompt from "../prompts/buildPrompt.js";
import generateResponse from "../../services/geminiServices.js";

export async function queryPipeline(question) {

    const embedding = await generateEmbedding(question);

    const chunks = await searchSimilarChunks(
        embedding,
        5
    );
    const filteredChunks = chunks.filter((chunk) => chunk.score >= 0.75);

    if (filteredChunks.length === 0) {
        return {
            question,
            answer: "I couldn't find this information in the provided documents.",
            retrievedChunks: [],
            sources: [],
        };
    }

    const prompt = buildPrompt(
        question,
        filteredChunks
    );

    const answer = await generateResponse(prompt);

    return {
        question,
        answer,
        retrievedChunks: chunks,
        sources: chunks.map(c => ({
            source: c.source,
            score: c.score
        }))
    };
}
export default queryPipeline;
