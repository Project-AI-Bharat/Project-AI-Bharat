# Bharat AI – RAG Backend

An offline-first **Retrieval-Augmented Generation (RAG)** backend for **Bharat AI**, an AI-powered citizen assistant designed to help Indian citizens access reliable information about government schemes, healthcare, education, legal rights, and other public services.

Instead of fine-tuning a Large Language Model (LLM), Bharat AI retrieves relevant information from a curated knowledge base and uses it to generate grounded, trustworthy responses.

---

## Features

- 📄 Text document ingestion pipeline
- ✂️ Intelligent recursive document chunking
- 🧠 Gemini Embeddings (`gemini-embedding-2`)
- 🔍 Semantic vector search using Qdrant
- 🤖 Gemini 2.5 Flash for grounded response generation
- 🏗️ Clean modular architecture
- ⚡ Retrieval-Augmented Generation (RAG)
- 🧩 Easy backend integration with Express

---

# Tech Stack

### Backend

- Node.js
- Express.js
- ES Modules

### AI

- Gemini 2.5 Flash
- Gemini Embedding Model (`gemini-embedding-2`)

### Vector Database

- Qdrant Cloud

### Libraries

- LangChain (RecursiveCharacterTextSplitter)
- uuid

---

# Architecture

## Document Ingestion Pipeline

```text
Knowledge File (.txt)
        │
        ▼
txtLoader
        │
        ▼
cleanText
        │
        ▼
Recursive Chunker
        │
        ▼
Gemini Embedding
        │
        ▼
Qdrant Vector Store
```

---

## Retrieval Pipeline

```text
User Question
        │
        ▼
Gemini Embedding
        │
        ▼
Qdrant Vector Search
        │
        ▼
Top-K Relevant Chunks
        │
        ▼
Prompt Builder
        │
        ▼
Gemini 2.5 Flash
        │
        ▼
Grounded Response
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
cd backend
```

Install dependencies

```bash
npm install
```

---

# Example

### Question

```
Who is eligible for PM-Kisan?
```

### Answer

```
Landholding farmer's families in the country having cultivable land
are eligible under the PM-KISAN scheme...
```

---

# Current Progress

## Ingestion

- ✅ Document Loading
- ✅ Text Cleaning
- ✅ Recursive Chunking
- ✅ Gemini Embeddings
- ✅ Qdrant Storage

---

## Retrieval

- ✅ Query Embedding
- ✅ Semantic Search
- ✅ Prompt Construction
- ✅ Gemini Grounded Responses

---

# Future Improvements

- Batch embedding generation
- Parallel embedding requests
- Duplicate document detection
- Delete/update document support
- Metadata filtering
- Hybrid Search (Dense + Sparse)
- Reranking
- OCR support
- DOCX ingestion
- Multilingual document ingestion
- Page-aware chunking
- Source citations
- Streaming responses
- Conversation memory

---

# Project Philosophy

The backend is intentionally modular.

The controller communicates only with the query pipeline.

```
Controller
      │
      ▼
Query Pipeline
      │
      ├── Embedding
      ├── Vector Search
      ├── Prompt Builder
      └── Gemini
```

No module directly depends on another module's implementation.

This makes every component independently testable, maintainable, and replaceable.

---

# License

This project is developed for educational and research purposes.

Please ensure compliance with the licenses and terms of service of all third-party APIs, SDKs, and datasets used.