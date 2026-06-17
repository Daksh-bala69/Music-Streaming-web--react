import express from "express";
import { getSearchResults } from "../controllers/searchController.js";

const router = express.Router();

//ROUTES THE GET SEARCH REQUEST OF THE CLIENT TO THE DATABASE;
router.get("/", getSearchResults);

export default router;