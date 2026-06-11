import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import songRoutes from "./routes/songsRoutes.js";
import albumRoutes from "./routes/albumsRoutes.js";
import artistRoutes from "./routes/artistsRoutes.js";
import genreRoutes from "./routes/genresRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());

//MAKES THE SERVER KEEP UP THE COVER FOLDER AS A STATIC FOLDER TAHT CAN BE ACCESSED BY AN API REQUES TO THE "/COVERS"
app.use("/covers", express.static(path.join(__dirname, "covers")));

//USES THESE ROUTERS TO ROUTE THE REQUESTS
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});