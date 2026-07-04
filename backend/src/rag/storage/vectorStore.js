import { v4 as uuid } from "uuid";
import client from "./qdrantClient.js";

const COLLECTION_NAME = process.env.QDRANT_COLLECTION;

if (!COLLECTION_NAME) {
    throw new Error("QDRANT_COLLECTION is not configured.");
}

/**
 * Save multiple chunks to Qdrant.
 *
 * @param {Array<{
 *   pageContent: string,
 *   metadata: Object,
 *   embedding: number[]
 * }>} chunks
 *
 * @returns {Promise<void>}
 */
export async function saveChunks(chunks) {
    if (!Array.isArray(chunks) || chunks.length === 0) {
        throw new Error("Chunks must be a non-empty array.");
    }

    const points = chunks.map((chunk) => {
        if (
            typeof chunk.pageContent !== "string" ||
            !Array.isArray(chunk.embedding)
        ) {
            throw new Error("Invalid chunk format.");
        }

        return {
            id: uuid(),
            vector: chunk.embedding,
            payload: {
                content: chunk.pageContent,
                ...chunk.metadata,
            },
        };
    });

    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points,
    });
}

export default saveChunks;