import express from "express";
import { getAllArtists, getArtistById } from "../controllers/artistsController.js";

const router = express.Router();

// The GET requets form "/api/artists" are handleded here
router.get("/",getAllArtists);
router.get("/:id",getArtistById);

export default router;