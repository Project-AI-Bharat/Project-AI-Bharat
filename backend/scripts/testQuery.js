import "dotenv/config";
import queryPipeline from "../src/rag/pipeline/queryPipeline.js";

const question = "Who is eligible for PM-Kisan?";

const response = await queryPipeline(question);

console.log("\n================ QUESTION ================\n");
console.log(response.question);

console.log("\n================ ANSWER ==================\n");
console.log(response.answer);

console.log("\n============= RETRIEVED CHUNKS ===========\n");

response.retrievedChunks.forEach((chunk, index) => {
    console.log(`Result ${index + 1}`);
    console.log("Score :", chunk.score);
    console.log("Source:", chunk.source);
    console.log("Page  :", chunk.page);
    console.log(chunk.content);
    console.log("--------------------------------");
});