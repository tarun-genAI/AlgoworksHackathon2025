📄 LLM GURU App – AI Question Answering from Documents

We’re excited to share the final results of our project, LLM GURU App – AI Question Answering from Documents.

This system enables users to upload PDFs, process them into searchable chunks with OpenAI embeddings, and retrieve precise answers to their questions. It’s designed for fast, scalable deployment and open-source collaboration—ideal for researchers, teams, and public knowledge sharing.

⸻

🌐 Public Access & Showcase

The full results of this work have been showcased and published under an open license. You can:
	•	🔗 View Source Code: https://github.com/your-username/pdf-rag-app
	•	🌐 Live Demo (if deployed): https://your-app-demo-link.com (optional)
	•	📦 Dockerized Setup: Ready for local and cloud deployments.

We welcome feedback, contributions, and real-world use cases.

⸻

🚀 Features
	•	📥 PDF Upload & Processing – Upload PDFs and auto-process their content.
	•	🔎 Semantic Search – Query using OpenAI embeddings for precise context.
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
	•	✅ PDF upload & chunking
	•	✅ Semantic search with OpenAI embeddings
	•	✅ Filter responses by labelValue 1
	•	⬜ Add multi-user support and authentication
	•	⬜ Build frontend UI for uploads and queries
	•	⬜ Deploy to AWS Amplify / Vercel

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

This project is published under the MIT License, making it freely available for modification and distribution.

⸻

🙏 Credits

OpenAI – https://openai.com/
LangChain – https://www.langchain.com/
Qdrant – https://qdrant.tech/
Express.js – https://expressjs.com/
Docker – https://www.docker.com/

Thanks to all team members for helping achieve this in just 30 hours! Your contributions made this possible.

⸻

💡 Call for Contributions

This is an open-source project. Fork it, star it ⭐, and help us make it even better. Share your ideas, fixes, or feature requests via pull requests or issues.
