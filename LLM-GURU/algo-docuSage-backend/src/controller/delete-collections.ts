import { Request, Response } from "express";

// Delete a Qdrant collection by name
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { collectionName } = req.body;

    if (!collectionName || typeof collectionName !== "string") {
      return res.status(400).json({ error: "Collection name must be a valid string" });
    }

    const qdrantUrl = process.env.QDRANT_URL || "http://localhost:6333";
    const qdrantApiKey = process.env.QDRANT_API_KEY; // Optional: For secured Qdrant servers

    // Build headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (qdrantApiKey) {
      headers["api-key"] = qdrantApiKey;
    }

    // Call Qdrant DELETE API
    const response = await fetch(
      `${qdrantUrl}/collections/${encodeURIComponent(collectionName)}`,
      {
        method: "DELETE",
        headers
      }
    );

    if (!response.ok) {
      let errorMessage = `Qdrant error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${JSON.stringify(errorData)}`;
      } catch (_) {
        // Response not JSON, leave errorMessage as is
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();

    return res.status(200).json({
      message: `Collection '${collectionName}' deleted successfully`,
      result
    });
  } catch (error: any) {
    console.error("Error deleting collection:", error);
    return res.status(500).json({
      error: "Failed to delete collection",
      details: error.message || String(error)
    });
  }
};