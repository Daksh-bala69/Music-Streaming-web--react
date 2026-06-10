import express from "express";
import {
    getSongsController,
    getSongById,
    streamSong
} from "../controllers/songsController.js";

const router  = express.Router();

router.get("/", getSongsController);
router.get("/:id", getSongById);
router.get("/:id/stream", streamSong);

export default router;