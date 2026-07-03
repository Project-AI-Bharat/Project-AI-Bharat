import loadPdf from "../loaders/pdfLoader.js"
import cleanText from "../utils/cleanText.js"
import chunkDocument from "../chunkers/recursiveChunker.js"
import generateEmbedding from "../embeddings/geminiEmbedding.js"
import saveChunks from "../storage/vectorStore.js";

export async function ingestDocument(
    pdfPath,
    metadata = {}
) {
    const pdf = await loadPdf(pdfPath);
    const cleanedText = cleanText(pdf.text);
    const documentMetadata = {

        ...metadata,

        pages: pdf.pages
    };
    const chunks =
        await chunkDocument(
            cleanedText,

            documentMetadata
        );
    return chunks;
}
export default ingestDocument;