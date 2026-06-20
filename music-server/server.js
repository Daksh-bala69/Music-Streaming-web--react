import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import songRoutes from "./routes/songsRoutes.js";
import albumRoutes from "./routes/albumsRoutes.js";
import artistRoutes from "./routes/artistsRoutes.js";
import genreRoutes from "./routes/genresRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

const ALBUMS_ROOT = "/home/Admiral_D/Music/Albums";

app.use(cors());
app.use(express.json());

// This exposes your real album folder to the frontend.
// Example URL:
// http://localhost:5000/album-files/2007 - Graduation/cover.jpg
app.use("/album-files", express.static(ALBUMS_ROOT));

// Optional: keep old covers route for old test data
app.use("/covers", express.static(path.join(__dirname, "covers")));

// Routes
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/playlists", playlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});