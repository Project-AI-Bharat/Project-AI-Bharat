import "dotenv/config";

import ingestDocument from "../src/rag/pipeline/ingestPipeline.js";

async function main() {
    const result = await ingestDocument(
        "./data/Working_Paper_044_Governance.pdf",
        {
            source: "pm-kisan.pdf",
            category: "Agriculture",
            language: "English",
        }
    );
    console.log(result);
}

main();