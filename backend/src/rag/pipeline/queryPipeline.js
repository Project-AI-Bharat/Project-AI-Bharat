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

    const prompt = buildPrompt(
        question,
        chunks
    );

    const answer = await generateResponse(prompt);

    return {
        question,
        answer,
        retrievedChunks: chunks,
        sources: chunks.map(chunk => ({
            source: chunk.source,
            page: chunk.page,
            score: chunk.score
        }))
    };
}
export default queryPipeline;