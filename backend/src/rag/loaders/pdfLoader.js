import { PDFParse } from "pdf-parse";
import { readFile } from "fs/promises";

export async function loadPdf(pdfPath) {
    try {
        const dataBuffer = await readFile(pdfPath);

        const parser = new PDFParse({ data: dataBuffer });
        const data = await parser.getText();

        await parser.destroy();

        return {
            text: data.text,
            pages: data.total,
            info: data.info,
        };
    } catch (error) {
        throw new Error(`Failed to load PDF "${pdfPath}": ${error.message}`);
    }
}

export default loadPdf;