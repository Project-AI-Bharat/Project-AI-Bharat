import { readFile } from "fs/promises";
import path from "path";

/**
 * Load a text document.
 *
 * @param {string} filePath
 * @returns {Promise<{
 *   text: string,
 *   source: string
 * }>}
 */
export async function loadText(filePath) {
    try {
        const text = await readFile(filePath, "utf-8");

        return {
            text,
            source: path.basename(filePath),
        };
    } catch (error) {
        throw new Error(
            `Failed to load text file "${filePath}": ${error.message}`
        );
    }
}

export default loadText;