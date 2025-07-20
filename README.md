📄 PDF RAG App – AI Question Answering from Documents

This project is a PDF-based Retrieval-Augmented Generation (RAG) system. Users can upload PDFs, which are then split into chunks, embedded using OpenAI, stored in Qdrant, and queried for context-aware answers. The system filters answers to only return those marked with labelValue 1.

⸻

🚀 Features
	•	📥 PDF Upload & Processing – Upload PDFs and auto-process their content.
	•	🔎 Semantic Search – Query using OpenAI embeddings for precise context.
	•	✅ Label Filtering – Returns only answers with labelValue 1.
	•	📦 Qdrant Vector Store – Stores and retrieves embedded chunks efficiently.
	•	📝 API Ready – Endpoints for uploading and querying PDFs.

⸻

📂 Project Structure

/src
  |-- routes/
        uploadPdf.ts      # API for PDF upload and embedding
        queryPdf.ts       # API for querying PDF content
  |-- utils/
        textSplitter.ts   # Handles text splitting logic
        embedder.ts       # OpenAI embedding setup
  |-- app.ts              # Express app entry point
docker-compose.db.yml     # Docker setup for Qdrant
README.md                 # Project documentation


⸻

⚙️ Installation

Prerequisites
	•	Node.js >= 18
	•	Docker & Docker Compose (for Qdrant)
	•	OpenAI API Key

Steps

# Clone repository
git clone https://github.com/your-username/pdf-rag-app.git
cd pdf-rag-app

# Install dependencies
npm install

# Start Qdrant with Docker
docker-compose -f docker-compose.db.yml up -d

# Set environment variables
echo "OPENAI_API_KEY=sk-..." > .env

# Run the server
npm run dev


⸻

🛠 API Endpoints

POST /api/upload

Upload a PDF file for processing.
Headers: Content-Type: multipart/form-data
Body: file=<your-pdf-file>

POST /api/query

Query the ingested PDFs.
Body:

{
  "question": "How big is BMC Software in Houston, TX?"
}


⸻

🧪 Running Tests

npm test


⸻

🏁 Roadmap
	•	PDF upload & chunking
	•	Semantic search with OpenAI embeddings
	•	Filter responses by labelValue 1
	•	Add multi-user support and authentication
	•	Build frontend UI for uploads and queries
	•	Deploy to AWS Amplify / Vercel

⸻

📋 Risk Log

Risk	Mitigation
OpenAI API rate limits	Batch embedding & retry logic
Large PDF file uploads	Enforce file size limits
Qdrant scaling for big data	Implement sharding & replication


⸻

🏃 Quickstart

Get up and running in under 10 minutes:

git clone https://github.com/your-username/pdf-rag-app.git
cd pdf-rag-app
npm install
docker-compose -f docker-compose.db.yml up -d
npm run dev


⸻

📜 License

This project is licensed under the MIT License.



Credits

Credits

OpenAI – for embeddings API(https://openai.com/)

LangChain – for document loaders and text splitting( https://www.langchain.com/)

Qdrant – for vector database and similarity search(https://qdrant.tech/)

Express.js – for server API(https://expressjs.com/)

Docker – for containerized Qdrant setup( https://www.docker.com/)


To all the developers included in this project 

Thanks to all to achieve this in 30 hours. 
