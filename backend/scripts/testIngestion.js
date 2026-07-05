import "dotenv/config";

import ingestDocument from "../src/rag/pipeline/ingestPipeline.js";

async function main() {
    const result = await ingestDocument(
        "../dataset/processed/PM-Kissan-guidelines.txt",
        {
            source: "pm-kisan.pdf",
            category: "Agriculture",
            language: "English",
        }
    );
    console.log(result);
}

main();