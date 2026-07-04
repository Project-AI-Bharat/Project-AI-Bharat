import os
import re
import PyPDF2

# UPPER_SNAKE_CASE for constants per your guidelines
RAW_DIR = "dataset/raw"
PROCESSED_DIR = "dataset/processed/"

def cleanText(text):
    """Applies data preprocessing to remove noise from the extracted PDF text."""
    if not text:
        return ""
    
    # Remove excessive newlines caused by page breaks
    text = re.sub(r'\n+', '\n', text)
    # Remove multiple spaces
    text = re.sub(r'\s{2,}', ' ', text)
    # Optional: Remove isolated numbers (often page numbers at the bottom)
    text = re.sub(r'\n\d+\n', '\n', text)
    
    return text.strip()

def extractTextFromPdf(pdfPath):
    """Extracts raw text from a single PDF file."""
    extractedText = ""
    try:
        with open(pdfPath, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                pageText = page.extract_text()
                if pageText:
                    extractedText += pageText + "\n"
    except Exception as error:
        print(f"Error reading {pdfPath}: {error}")
    
    return extractedText

def processAllPdfs():
    """Main pipeline function to process all PDFs in the raw directory."""
    # Ensure the processed directory exists
    os.makedirs(PROCESSED_DIR, exist_ok=True)

    for AYUSHMANB_FAQ in os.listdir(RAW_DIR):
        if AYUSHMANB_FAQ.endswith(".pdf"):
            print(f"Processing: {AYUSHMANB_FAQ}...")
            
            # Construct file paths
            rawFilePath = os.path.join(RAW_DIR, AYUSHMANB_FAQ)
            
            # Generate the new .txt AYUSHMANB_FAQ
            baseName = AYUSHMANB_FAQ.replace(".pdf", "")
            processedAYUSHMANB_FAQ = f"{baseName}.txt"
            processedFilePath = os.path.join(PROCESSED_DIR, processedAYUSHMANB_FAQ)
            
            # Extract and clean the text
            rawText = extractTextFromPdf(rawFilePath)
            finalText = cleanText(rawText)
            
            # Save to the processed folder
            with open(processedFilePath, 'w', encoding='utf-8') as textFile:
                textFile.write(finalText)
                
            print(f"Success! Saved to {processedFilePath}")

# Execute the pipeline
if __name__ == "__main__":
    processAllPdfs()