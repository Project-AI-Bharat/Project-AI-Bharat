import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export async function chunkDocument(
    text,
    metadata = {},
    {
        chunkSize = 1000,
        chunkOverlap = 200,
        separators = [
            "\n\n",
            "\n",
            ". ",
            "! ",
            "? ",
            "; ",
            ", ",
            " ",
            "",
        ],
    } = {}
) {
    if (typeof text !== "string" || !text.trim()) {
        return [];
    }

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,
        separators,
    });

    const document = new Document({
        pageContent: text,
        metadata,
    });

    return splitter.splitDocuments([document]);
}

export default chunkDocument;