import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Request, Response } from "express";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as crypto from "crypto";

// Initialize OpenAI Embeddings
const embedder = new OpenAIEmbeddings({
  modelName: "text-embedding-ada-002", // OpenAI's embedding model
  openAIApiKey: process.env.OPENAI_API_KEY, // Use OpenAI API key from env
});

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export const uploadPdf = async (req: Request, res: Response) => {
  let tempFilePath = "";

  try {
    if (!req.file) {
      res.status(400).json({ error: "No PDF file uploaded" });
      return;
    }

    const pdfBuffer = req.file.buffer;

    const tempFileName = `${crypto.randomUUID()}.pdf`;
    tempFilePath = path.join(os.tmpdir(), tempFileName);

    fs.writeFileSync(tempFilePath, pdfBuffer);

    // Load PDF content
    const loader = new PDFLoader(tempFilePath);
    const docs = await loader.load();

    // Split into chunks
    const splitDocs = await textSplitter.splitDocuments(docs);

    const client = new QdrantClient({ url: "http://localhost:6333" });

    // Check if collection exists
    const collectionExists = await client.collectionExists(
      req.file.originalname
    );

    if (collectionExists) {
      console.log(`Deleting existing collection: ${req.file.originalname}`);
      await client.deleteCollection(req.file.originalname);
    }

    // Create new vector store with OpenAI embeddings
    await QdrantVectorStore.fromDocuments(splitDocs, embedder, {
      url: "http://localhost:6333",
      collectionName: req.file.originalname,
    });

    res.status(200).json({
      message: "PDF processed successfully",
      collectionName: req.file.originalname,
      content: splitDocs,
    });
  } catch (error: any) {
    console.error("Error processing PDF:", error?.message || error);
    res.status(500).json({ error: "Failed to process PDF" });
  } finally {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};