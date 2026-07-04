import "dotenv/config";

import ingestDocument from "../src/rag/pipeline/ingestPipeline.js";

async function main() {
    const result = await ingestDocument(
        "./data/RevisedPM-KISANOperationalGuidelines(English).pdf",
        {
            source: "pm-kisan.pdf",
            category: "Agriculture",
            language: "English",
        }
    );
    console.log(result);
}

main();