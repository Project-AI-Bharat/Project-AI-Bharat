/**
 * Safely normalizes text without changing its meaning.
 *
 * Operations:
 * - Normalize Windows line endings (\r\n) to \n
 * - Remove trailing whitespace at the end of lines
 * - Collapse consecutive spaces/tabs into a single space
 * - Collapse 3+ consecutive blank lines into a maximum of 2
 *
 * @param {string} text
 * @returns {string}
 */
export function cleanText(text) {
    if (typeof text !== "string") {
        return "";
    }

    return text
        .normalize("NFKC")
        // Normalize line endings
        .replace(/\r\n?/g, "\n")

        // Remove trailing spaces/tabs before line breaks
        .replace(/[ \t]+$/gm, "")

        // Collapse repeated spaces/tabs (preserve newlines)
        .replace(/[ \t]{2,}/g, " ")

        // Collapse excessive blank lines (keep at most one empty line)
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export default cleanText;