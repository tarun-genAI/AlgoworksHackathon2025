import { Request, Response } from "express";

// Fetch available Qdrant collections
export const getCollections = async (req: Request, res: Response) => {
  try {
    const qdrantUrl = process.env.QDRANT_URL || "http://localhost:6333";

    const response = await fetch(`${qdrantUrl}/collections`);
    if (!response.ok) {
      throw new Error(`Qdrant error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract collection names
    const collections = data.result?.collections?.map((c: any) => c.name) || [];

    res.status(200).json({
      message: "Collections fetched successfully",
      collections
    });
  } catch (error: any) {
    console.error("Error fetching collections:", error);
    res.status(500).json({
      error: "Failed to fetch collections",
      details: error.message || error
    });
  }
};