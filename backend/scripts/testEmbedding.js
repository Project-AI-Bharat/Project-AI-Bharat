import "dotenv/config";
import generateEmbedding from "../src/rag/embeddings/geminiEmbedding.js";

const embedding = await generateEmbedding(
    "The PM-Kisan scheme provides financial assistance to eligible farmers."
);

console.log("Dimension:", embedding.length);
console.log("First 10 values:", embedding.slice(0, 10));