import loadPdf from "../src/rag/loaders/pdfLoader.js";

async function main() {
    try {
        const result = await loadPdf("./data/PresidentialAddressProfRameshChand17012023.pdf");

        console.log("Pages:", result.pages);
        console.log("Info:", result.info);

        console.log("\n----- Preview -----\n");

        console.log(result.text.substring(0, 1000));
    } catch (error) {
        console.error("Failed to load PDF:", error.message);
    }
}

main();