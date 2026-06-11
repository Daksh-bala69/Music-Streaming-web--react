import { findAllArtists, findArtistById,findAlbumsByArtistId,findSongsByArtistId  } from "../models/artistModel.js";

// GETS ALL THE ARTISTS (FOR SERCH INFO)
export async function getAllArtists(req,res) {
    try{
        const artists = await findAllArtists();
        res.json(artists);
    } catch(error){
        console.error("Error getting artists:", error);
        res.status(500).json({ message: "Failed to get artists" }); 
    }
}

// GETS THE ARTIST BY ITS ID
export async function getArtistById(req, res) {
  try {
    const id = Number(req.params.id);

    const artist = await findArtistById(id);

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    //GETS THE ALBUMS AND SONGS OF THAT ARTIST
    const albums = await findAlbumsByArtistId(id);
    const songs = await findSongsByArtistId(id);

    res.json({
      id: artist.id,
      name: artist.name,
      catalogue: {
        albums,
        songs,
      },
    });
  } catch (error) {
    console.error("Error getting artist:", error);

    res.status(500).json({
      message: "Failed to get artist",
    });
  }
}