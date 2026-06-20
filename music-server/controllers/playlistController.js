import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../models/playlistModel.js";

export async function getPlaylists(req, res) {
  try {
    const playlists = await getAllPlaylists();
    res.json({ playlists });
  } catch (error) {
    res.status(500).json({ error: "Failed to get playlists" });
  }
}

export async function getPlaylist(req, res) {
  try {
    const playlist = await getPlaylistById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    res.json({ playlist });
  } catch (error) {
    res.status(500).json({ error: "Failed to get playlist" });
  }
}

export async function postPlaylist(req, res) {
  try {
    const { name, userId } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const playlist = await createPlaylist(name, userId || 1);
    res.status(201).json({ playlist });
  } catch (error) {
    res.status(500).json({ error: "Failed to create playlist" });
  }
}

export async function postSongToPlaylist(req, res) {
  try {
    const { songId } = req.body;
    const playlistId = req.params.id;

    if (!songId) {
      return res.status(400).json({ error: "Song id is required" });
    }

    const addedSong = await addSongToPlaylist(playlistId, songId);

    res.status(201).json({
      message: "Song added to playlist",
      addedSong,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add song to playlist" });
  }
}

export async function deleteSongFromPlaylist(req, res) {
  try {
    const { id, songId } = req.params;

    const removedSong = await removeSongFromPlaylist(id, songId);

    if (!removedSong) {
      return res.status(404).json({ error: "Song not found in playlist" });
    }

    res.json({
      message: "Song removed from playlist",
      removedSong,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove song from playlist" });
  }
}