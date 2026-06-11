import { findAllAlbums, findAlbumById, findSongsByAlbumId } from "../models/albumModel.js";

// GETS ALL THE ALBUMS FOR THE ALBUM PAGE
export async function getAllAlbums(req,res){
    try {
        const albums = await findAllAlbums();
        res.json(albums);
    } catch (error) {
        console.error("Error getting albums:", error);
        res.status(500).json({ message: "Failed to get albums" });
    };
}

// GETS THE ALBUM BY ITS ID
export async function getAlbumById(req,res){
    try{
        const album = await findAlbumById(req.params.id);

        if(!album) return res.status(404).json({message: "Album Not Found"});

        const songs = await findSongsByAlbumId(req.params.id);
        res.json({album, songs});
    } catch(error){
        console.error("Error getting album:", error);
        res.status(500).json({ message: "Failed to get album" });
    }
}