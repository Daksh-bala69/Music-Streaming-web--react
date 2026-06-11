import express from "express";
import { getAllAlbums, getAlbumById } from "../controllers/albumsController.js";

const router = express.Router();

// The GET requets form "/api/albums" are handleded here
router.get("/", getAllAlbums);
router.get("/:id", getAlbumById);

export default router;