import React from "react";
import { getPlaylists, addSongToPlaylist } from "../api/playlistApi.js";

function AddToPlaylistButton({ song }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [playlists, setPlaylists] = React.useState([]);
  const [message, setMessage] = React.useState("");

  async function handleOpen(e) {
    e.stopPropagation();

    setIsOpen((prev) => !prev);
    setMessage("");

    if (playlists.length === 0) {
      const data = await getPlaylists();
      setPlaylists(data.playlists || []);
    }
  }

  async function handleAddToPlaylist(e, playlistId, playlistName) {
    e.stopPropagation();

    const data = await addSongToPlaylist(playlistId, song.id);

    if (data.error) {
      setMessage(data.error);
      return;
    }

    setMessage(`Added to ${playlistName}`);
    setIsOpen(false);
  }

  return (
    <div className="addToPlaylistWrapper" onClick={(e) => e.stopPropagation()}>
      <button className="addToPlaylistButton" onClick={handleOpen}>
        + Playlist
      </button>

      {isOpen && (
        <div className="playlistDropdown">
          {playlists.length === 0 ? (
            <p>No playlists yet</p>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={(e) =>
                  handleAddToPlaylist(e, playlist.id, playlist.name)
                }
              >
                {playlist.name}
              </button>
            ))
          )}
        </div>
      )}

      {message && <span className="addPlaylistMessage">{message}</span>}
    </div>
  );
}

export default AddToPlaylistButton;