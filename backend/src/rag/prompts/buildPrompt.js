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
You are Bharat AI, an AI assistant that helps Indian citizens understand government schemes.

Instructions:

1. Answer ONLY from the provided context.
2. Never make up information.
3. If the answer isn't present in the context, say:
   "I couldn't find this information in the provided documents."
4. Be concise but complete.
5. If relevant, mention the scheme name.
6. Do not use prior knowledge.

Context:

${context}

Question:
${question}

Answer:
`;
}

export default buildPrompt;