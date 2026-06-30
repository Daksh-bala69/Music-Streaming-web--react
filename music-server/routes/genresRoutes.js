import express from "express";
import { getAllGenres,getGenreById, getRandomSongsByGenre } from "../controllers/genresController.js";

const router = express.Router();

// The GET requets form "/api/genre" are handleded here
router.get("/", getAllGenres);
// SPECIFIC ROUTES SHOULD COME BEFORE DYNAMIC ID ROUTES
router.get("/songs/:songId/random", getRandomSongsByGenre);
router.get("/:id", getGenreById);

export default router;