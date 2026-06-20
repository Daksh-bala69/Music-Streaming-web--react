const BASE_URL = "http://localhost:5000/api/playlists";

export async function getPlaylists() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getPlaylistById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createPlaylist(name) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return res.json();
}

export async function addSongToPlaylist(playlistId, songId) {
  const res = await fetch(`${BASE_URL}/${playlistId}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId }),
  });

  return res.json();
}

export async function removeSongFromPlaylist(playlistId, songId) {
  const res = await fetch(`${BASE_URL}/${playlistId}/songs/${songId}`, {
    method: "DELETE",
  });

  return res.json();
}