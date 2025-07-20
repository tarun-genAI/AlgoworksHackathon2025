import { Request, Response } from "express";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API key in env
});

// Initialize OpenAI Embeddings
const embedder = new OpenAIEmbeddings({
  modelName: "text-embedding-ada-002",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Retry helper for transient errors
async function retryRequest(fn: any, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (
        err?.status === 429 ||
        err?.status === 502 ||
        err?.status === 503
      ) {
        const delay = Math.pow(2, attempt) * 100 + Math.random() * 100;
        console.warn(
          `⚠️ API overloaded, retrying in ${delay.toFixed(
            0
          )}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
  throw new Error("❌ Max retries reached. Service still unavailable.");
}

export const ChatWithPdf = async (req: Request, res: Response) => {
  try {
    const { query, collectionName } = req.body;

    if (!query || !collectionName) {
      res.status(400).json({ error: "Query and collection name are required" });
      return;
    }

    // Initialize Vector Store
    const vectorStore = new QdrantVectorStore(embedder, {
      url: process.env.QDRANT_URL,
      collectionName,
    });

    const docs = await vectorStore.similaritySearch(query);
    const context = docs.map((d) => d.pageContent).join("\n\n");

//     const systemPrompt = `
// You are an expert fact-checker and evaluator. I will provide:
// 1. A **context** (reference text or knowledge).
// 2. A list of answers.

// Your tasks:
// 1. For each answer:
//    - Mark it as **Correct ✅** if it fully matches or is supported by the context.
//    - Mark it as **Incorrect ❌** if it does not match, is unsupported, or partially wrong.
// 2. Among all Correct ✅ answers, select the **single most relevant answer** based on alignment, completeness, and importance relative to the context.

// Here is the input:

// Context:
// """
// ${context}
// """

// Answers:
// 1. {answer_1}
// 2. {answer_2}
// 3. {answer_3}
// ...
// n. {answer_n}

// Output format:
// 1. Answer: "{answer_1}"
//    Result: Correct ✅
// 2. Answer: "{answer_2}"
//    Result: Incorrect ❌
// ...
// n. Answer: "{answer_n}"
//    Result: Correct ✅

// Most Relevant Answer:
// "{most_relevant_answer}"
// `;

// const systemPrompt = `

// If ${query} constist of normal communication then talk to him accordingly. 

// ELSE IF

// Use the ${context} to answer as an intelligent AI if ${query} is out of context then write "APOLOGY" strictly

// <context>  
// ${context}
// </context>;

// `

const systemPrompt = `
You are intelligent AI take refrence from context ${context}`


// Set headers for SSE (Server-Sent Events)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Call OpenAI Chat API with streaming
    const stream = await retryRequest(() =>
      openai.chat.completions.create({
        model: "gpt-4o", // Or gpt-3.5-turbo
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        temperature: 0,
        max_tokens: 1024,
        stream: true, // Enable streaming
      })
    );

    // Stream chunks back to client
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(`data: ${content}\n\n`); // Send each token
      }
    }

    res.write("\ndata: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};