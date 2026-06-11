import express from "express";
import { getSongsController,getSongById,streamSong } from "../controllers/songsController.js";

const router  = express.Router();

// The GET requets form "/api/songs" are handleded here
router.get("/", getSongsController);
router.get("/:id", getSongById);
router.get("/:id/stream", streamSong);

export default router;