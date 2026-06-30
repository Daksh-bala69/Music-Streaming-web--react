import { API_URL } from "./config";

export async function getPlaylists() {
  const res = await fetch(API_URL + "/api/playlists");
  return res.json();
}

export async function getPlaylistById(id) {
  const res = await fetch(API_URL + `/api/playlists/${id}`);
  return res.json();
}

export async function createPlaylist(name) {
  const res = await fetch(API_URL + "/api/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return res.json();
}

export async function addSongToPlaylist(playlistId, songId) {
  const res = await fetch(API_URL + `/api/playlists/${playlistId}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId }),
  });

  return res.json();
}

export async function removeSongFromPlaylist(playlistId, songId) {
  const res = await fetch(API_URL + `/api/playlists/${playlistId}/songs/${songId}`, {
    method: "DELETE",
  });

  return res.json();
}