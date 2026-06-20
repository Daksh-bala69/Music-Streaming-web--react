import fs from "fs";
import path from "path";
import { findSongById, findAllSongs } from "../models/songModel.js";

const ALBUMS_ROOT = "/home/Admiral_D/Music/Albums";

// GET /api/songs
// Sends metadata for all songs
export async function getSongsController(req, res) {
  try {
    const songs = await findAllSongs();

    res.json(songs);
  } catch (err) {
    console.error("Error getting songs:", err);

    res.status(500).json({
      message: "Failed to get songs",
    });
  }
}

// GET /api/songs/:id
// Sends metadata for one song
export async function getSongById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "Invalid song id",
      });
    }

    const song = await findSongById(id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json(song);
  } catch (err) {
    console.error("Error getting song:", err);

    res.status(500).json({
      message: "Failed to get song",
    });
  }
}

// GET /api/songs/:id/stream
// Streams the actual audio file
export async function streamSong(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "Invalid song id",
      });
    }

    const song = await findSongById(id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    if (!song.file_path) {
      return res.status(404).json({
        message: "Song file path not found in database",
      });
    }

    const safeRoot = path.resolve(ALBUMS_ROOT);
    const audioPath = path.resolve(safeRoot, song.file_path);

    // Prevents someone from requesting ../../../etc/passwd style paths
    if (!audioPath.startsWith(safeRoot)) {
      return res.status(400).json({
        message: "Invalid song file path",
      });
    }

    if (!fs.existsSync(audioPath)) {
      console.log("Missing audio file:", audioPath);

      return res.status(404).json({
        message: "Audio file not found on server",
      });
    }

    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const contentType = getAudioContentType(audioPath);

    // If the browser does not request a range, send the whole file
    if (!range) {
      res.status(200).set({
        "Content-Length": fileSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
      });

      fs.createReadStream(audioPath).pipe(res);
      return;
    }

    // Example range: bytes=100-200
    const parts = range.replace(/bytes=/, "").split("-");
    const start = Number(parts[0]);
    const requestedEnd = parts[1] ? Number(parts[1]) : fileSize - 1;
    const end = Math.min(requestedEnd, fileSize - 1);

    if (
      Number.isNaN(start) ||
      Number.isNaN(end) ||
      start >= fileSize ||
      end >= fileSize ||
      start > end
    ) {
      res.status(416).set({
        "Content-Range": `bytes */${fileSize}`,
      });

      return res.end();
    }

    const chunkSize = end - start + 1;

    res.status(206).set({
      "Content-Type": contentType,
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": chunkSize,
      "Accept-Ranges": "bytes",
    });

    fs.createReadStream(audioPath, { start, end }).pipe(res);
  } catch (err) {
    console.error("Error streaming song:", err);

    res.status(500).json({
      message: "Failed to stream song",
    });
  }
}

function getAudioContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".flac") return "audio/flac";
  if (ext === ".mp3") return "audio/mpeg";
  if (ext === ".wav") return "audio/wav";
  if (ext === ".m4a") return "audio/mp4";

  return "application/octet-stream";
}