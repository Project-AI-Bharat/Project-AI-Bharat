import loadTex from "../src/rag/loaders/txtLoader.js";

async function main() {
    try {
        const result = await loadTex("../dataset/processed/PM-Kissan-guidelines.txt");

        console.log("Pages:", result.pages);
        console.log("Info:", result.info);

        console.log("\n----- Preview -----\n");

        console.log(result.text.substring(0, 1000));
    } catch (error) {
        console.error("Failed to load TXT:", error.message);
    }
}

main();