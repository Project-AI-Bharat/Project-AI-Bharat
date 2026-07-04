import client from "./qdrantClient.js";

const COLLECTION_NAME = process.env.QDRANT_COLLECTION;

if (!COLLECTION_NAME) {
    throw new Error("QDRANT_COLLECTION is not configured.");
}

/**
 * Deletes all vectors from the collection.
 */
export async function deleteAllChunks() {
    await client.delete(COLLECTION_NAME, {
        wait: true,
        filter: {},
    });

    console.log("All chunks deleted successfully.");
}

export default deleteAllChunks;