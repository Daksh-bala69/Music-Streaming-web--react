import { searchAll } from "../models/searchModel.js";

// GET THE SERCH RESULTS FROM THE DATABASE AND SEND IT TO THE CLIENT;
export async function getSearchResults(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Search query is required. Use /api/search?q=yourSearch",
      });
    }

    const cleanedQuery = q.trim();

    const results = await searchAll(cleanedQuery);

    res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      message: "Failed to search",
    });
  }
}