import express from "express";
import { getAllGenres,getGenreById, } from "../controllers/genresController.js";

const router = express.Router();

// The GET requets form "/api/genre" are handleded here
router.get("/", getAllGenres);
router.get("/:id", getGenreById);

export default router;