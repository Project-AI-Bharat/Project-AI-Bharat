import client from "./qdrantClient.js";

const COLLECTION_NAME = process.env.QDRANT_COLLECTION;

if (!COLLECTION_NAME) {
    throw new Error("QDRANT_COLLECTION is not configured.");
}

export async function searchSimilarChunks(
    embedding,
    topK = 5,
    filter = null
) {
    if (!Array.isArray(embedding) || embedding.length === 0) {
        throw new Error("Embedding must be a non-empty array.");
    }

    const results = await client.search(COLLECTION_NAME, {
        vector: embedding,
        limit: topK,
        filter,
        with_payload: true,
        with_vector: false,
    });

    return results.map((point) => ({
        score: point.score,
        ...point.payload,
    }));
}

export default searchSimilarChunks;