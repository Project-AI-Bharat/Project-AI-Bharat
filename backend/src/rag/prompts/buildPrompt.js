export function buildPrompt(question, chunks) {
    if (!question?.trim()) {
        throw new Error("Question is required.");
    }

    if (!Array.isArray(chunks)) {
        throw new Error("Chunks must be an array.");
    }

    const context = chunks
        .map((chunk, index) =>
            `[Document ${index + 1}]\n${chunk.content}`
        )
        .join("\n\n");

    return `
You are Bharat AI, an AI assistant designed to help Indian citizens understand government schemes, policies, healthcare, education and legal rights.

Answer ONLY using the information provided in the context below.

If the answer cannot be found in the context, clearly say:

"I couldn't find this information in the provided documents."

Context:

${context}

Question:
${question}

Answer:
`;
}

export default buildPrompt;