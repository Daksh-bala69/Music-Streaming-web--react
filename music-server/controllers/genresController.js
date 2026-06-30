import { findAllGenres,findGenreById,findSongsByGenreId,findRandomSongsBySameGenre } from "../models/genreModel.js";

// GETS ALL THE GENRES (FOR SERCH)
export async function getAllGenres(req, res) {
  try {
    const genres = await findAllGenres();

    res.json(genres);
  } catch (error) {
    console.error("Error getting genres:", error);

    res.status(500).json({
      message: "Failed to get genres",
    });
  }
}

//GETS THE GENRE BY THE ID
export async function getGenreById(req, res) {
  try {
    const id = Number(req.params.id);

    const genre = await findGenreById(id);

    if (!genre) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    // GETS SONGS OF THAT GENRE
    const songs = await findSongsByGenreId(id);

    res.json({
      id: genre.id,
      name: genre.name,
      catalogue: {
        songs,
      },
    });
  } catch (error) {
    console.error("Error getting genre:", error);

    res.status(500).json({
      message: "Failed to get genre",
    });
  }
}

export async function getRandomSongsByGenre(req, res) {
  try{
    const songId = Number(req.params.songId);
    const limit = Number(req.query.limit) || 10;

    const songs = await findRandomSongsBySameGenre(songId,limit);

    res.json({songs});
  }
  catch(error){
    console.error("Error getting your queue:", error)

    res.status(500).json({
      message: "Error getting your queue"
    });
  }
}