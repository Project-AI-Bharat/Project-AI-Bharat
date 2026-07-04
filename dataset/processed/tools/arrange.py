import re

# Update this path if the file name changes to camelCase later
FILE_PATH = "dataset/processed/AYUSHMANB-FAQ.txt"

def format_questions(file_path):
    # 1. Read the giant block of text
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()

    # 2. Use Regex to find "Q." followed by any number (e.g., Q.1, Q.23)
    # \1 refers to the matched pattern itself, so it puts \n\n right before the "Q."
    formatted_text = re.sub(r'(Q\.\s*\d+)', r'\n\n\1', text)

    # 3. Write the cleanly formatted text back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(formatted_text)
        
    print(f"Success! Added line breaks to questions in {file_path}")

if __name__ == "__main__":
    format_questions(FILE_PATH)