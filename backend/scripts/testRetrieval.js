import "dotenv/config";

import generateEmbedding from "../src/rag/embeddings/geminiEmbedding.js";
import searchSimilarChunks from "../src/rag/storage/vectorSearch.js";

const question = "What is the main purpose of the study?";

const embedding = await generateEmbedding(question);

const results = await searchSimilarChunks(embedding);

console.log(JSON.stringify(results, null, 2));