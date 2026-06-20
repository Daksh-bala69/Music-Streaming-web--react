import express from "express";
import {
  getPlaylists,
  getPlaylist,
  postPlaylist,
  postSongToPlaylist,
  deleteSongFromPlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

router.get("/", getPlaylists);
router.get("/:id", getPlaylist);
router.post("/", postPlaylist);
router.post("/:id/songs", postSongToPlaylist);
router.delete("/:id/songs/:songId", deleteSongFromPlaylist);

export default router;