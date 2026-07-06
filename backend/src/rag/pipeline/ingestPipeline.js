import loadTex from "../loaders/txtLoader.js"
import cleanText from "../utils/cleanText.js"
import chunkDocument from "../chunkers/recursiveChunker.js"
import generateEmbedding from "../embeddings/geminiEmbedding.js"
import saveChunks from "../storage/vectorStore.js";

export async function ingestDocument(
    pdfPath,
    metadata = {}
) {
    try {
        const pdf = await loadTex(pdfPath);
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
        const records = [];

        for (const chunk of chunks) {

            const embedding = await generateEmbedding(
                chunk.pageContent
            );
            const { loc, ...metadata } = chunk.metadata;
            records.push({
                pageContent: chunk.pageContent,
                metadata,
                embedding,
            });

            console.log(
                `Embedding ${records.length}/${chunks.length}`
            );
        }

        await saveChunks(records);
        return {
            document: metadata.source ?? pdfPath,
            pages: pdf.pages,
            chunksCreated: chunks.length,
            chunksStored: records.length,
            status: "success",
        };
    } catch (error) { throw new Error(`Failed to ingest document: ${error.message}`); }

}
export default ingestDocument;
