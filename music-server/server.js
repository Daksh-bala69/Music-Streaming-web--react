import express from "express";
import cors from "cors";
import songRoutes from "./routes/songsRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());

//MAKES THE SERVER KEEP UP THE COVER FOLDER AS A STATIC FOLDER TAHT CAN BE ACCESSED BY AN API REQUES TO THE "/COVERS"
app.use("/covers", express.static(path.join(__dirname, "covers")));

app.use("/api/songs", songRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});