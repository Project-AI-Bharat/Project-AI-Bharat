# Bharat AI Citizen Assistant - Backend & RAG

## Project Overview

This repository contains the backend and Retrieval-Augmented Generation (RAG) pipeline for the Bharat AI Citizen Assistant.

The goal is to build an AI assistant that answers user questions using **official government documents** instead of relying solely on the language model's internal knowledge.

---

# Overall Flow

```
User Question
      │
      ▼
React Frontend
      │
      ▼
Express Backend
      │
      ▼
Query Pipeline
      │
      ▼
Generate Embedding for Question
      │
      ▼
MongoDB Atlas Vector Search
      │
      ▼
Retrieve Top Relevant Chunks
      │
      ▼
Prompt Builder
      │
      ▼
Gemini LLM
      │
      ▼
Response
      │
      ▼
Frontend
```

---

# Document Ingestion Flow

Whenever new documents are added, they follow this pipeline:

```
PDF / Document
      │
      ▼
PDF Loader
      │
      ▼
Extract Text
      │
      ▼
Chunk Text
      │
      ▼
Generate Embeddings
      │
      ▼
Store Chunks + Metadata + Embeddings
      │
      ▼
MongoDB Atlas Vector Search
```

This process happens **once per document**.

---

# Query Flow

Whenever a user asks a question:

```
Question
      │
      ▼
Create Embedding
      │
      ▼
Vector Search
      │
      ▼
Top K Relevant Chunks
      │
      ▼
Prompt Builder
      │
      ▼
Gemini
      │
      ▼
Final Answer
```

---

# Folder Structure

```
backend/

│
├── src/
│
├── config/
│      db.js
│
├── controllers/
│      chatController.js
│
├── routes/
│      chatRoutes.js
│
├── middleware/
│
├── models/
│
├── services/
│
├── rag/
│
│   ├── loaders/
│   │      pdfLoader.js
│   │
│   ├── chunkers/
│   │      recursiveChunker.js
│   │
│   ├── embeddings/
│   │      geminiEmbedding.js
│   │
│   ├── retrieval/
│   │      vectorSearch.js
│   │
│   ├── prompts/
│   │      buildPrompt.js
│   │
│   └── pipeline/
│          ingestPipeline.js
│          queryPipeline.js
│
└── utils/
```

---

# Responsibilities of Each Folder

## config/

Database connection and environment configuration.

---

## controllers/

Receives requests from the frontend.

Controllers **must not contain AI logic**.

Their job is only to:

* Validate request
* Call pipeline
* Return response

---

## routes/

Defines API endpoints.

Example:

```
POST /api/chat
POST /api/upload
```

---

## models/

MongoDB schemas.

Examples:

* Documents
* Chunks
* Conversations
* Users

---

## services/

General reusable backend services.

These are **not** part of the RAG pipeline.

Examples:

* Authentication
* Logging
* Email
* Utilities

---

## rag/

Contains the complete Retrieval-Augmented Generation system.

Everything related to embeddings, retrieval and prompting lives here.

---

## loaders/

Responsible for reading documents.

Examples:

* PDF
* DOCX
* TXT

Input:

```
Document
```

Output:

```
Raw Text
```

---

## chunkers/

Responsible for splitting text.

Input:

```
Large Text
```

Output:

```
Array of Chunks
```

---

## embeddings/

Generates vector embeddings.

Input:

```
Chunk
```

Output:

```
Vector
```

---

## retrieval/

Searches MongoDB Atlas Vector Search.

Input:

```
Question Embedding
```

Output:

```
Top Relevant Chunks
```

---

## prompts/

Combines

* User Question
* Retrieved Chunks

into the final prompt sent to Gemini.

---

## pipeline/

Contains complete workflows.

### ingestPipeline.js

Responsible for

```
Document

↓

Extract

↓

Chunk

↓

Embed

↓

Store
```

### queryPipeline.js

Responsible for

```
Question

↓

Embedding

↓

Retrieve

↓

Prompt

↓

Gemini

↓

Answer
```

---

# Naming Conventions

## Variables

Use camelCase.

Good

```js
userQuestion
documentChunks
embeddingVector
```

Bad

```js
user_question
DocumentChunks
```

---

## Functions

Functions should start with a verb.

Good

```js
loadPdf()
chunkDocument()
generateEmbedding()
searchVectors()
buildPrompt()
```

Avoid

```js
pdf()
embedding()
```

---

## Files

Use camelCase.

Examples

```
chatController.js
buildPrompt.js
queryPipeline.js
vectorSearch.js
```

---

## Constants

Use UPPER_SNAKE_CASE.

Example

```js
MAX_CHUNKS
TOP_K
EMBEDDING_MODEL
```

---

## Environment Variables

Always uppercase.

```
PORT

MONGODB_URI

GEMINI_API_KEY
```

---

# Coding Rules

* Keep functions small and focused.
* One function should have one responsibility.
* Do not duplicate logic.
* Use async/await instead of nested callbacks.
* Validate all user input.
* Handle errors with try/catch.
* Write meaningful commit messages.

---

# Branch Naming

Create feature branches from `main`.

Examples:

```
feature/backend-rag

feature/query-pipeline

feature/pdf-loader

feature/vector-search
```

Never commit directly to `main`.

---

# Commit Naming

Use conventional commit messages.

Examples

```
feat: add PDF loader

feat: implement vector search

feat: add query pipeline

fix: handle empty PDF

refactor: improve chunking logic

docs: update README
```

---

# Development Workflow

1. Pull the latest changes.

```
git checkout main
git pull origin main
```

2. Switch to your feature branch.

```
git checkout feature/backend-rag
```

3. Merge the latest main branch.

```
git merge main
```

4. Make your changes.

5. Commit with a meaningful message.

6. Push your branch.

7. Open a Pull Request.

---

# Backend Philosophy

Controllers should remain lightweight.

A controller should only do something like:

```
Receive Request
        ↓
Call Query Pipeline
        ↓
Return Response
```

All retrieval, embeddings, prompt construction, and AI interactions should remain inside the `rag/` module. This separation keeps the backend modular, testable, and easier to maintain as the project grows.

---

# Current Development Order

1. Build the ingestion pipeline.
2. Parse PDFs.
3. Chunk documents.
4. Generate embeddings.
5. Store vectors in MongoDB Atlas.
6. Implement vector search.
7. Build the query pipeline.
8. Connect Gemini.
9. Integrate the frontend.
10. Improve retrieval quality and add citations.

Following this order ensures that each layer is working before the next one depends on it.
