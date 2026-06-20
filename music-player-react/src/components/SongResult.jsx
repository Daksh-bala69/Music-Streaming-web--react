import React from "react";
import AddToPlaylistButton from "./AddToPlaylistButton.jsx";

function SongResult({ song, onClick }) {
  return (
    <div className="songResult" onClick={() => onClick()}>
      <img src={"http://localhost:5000" + song.cover} alt={song.title} />

      <div className="resultInfo">
        <h3>{song.title}</h3>
        <p>
          {song.artists?.map((artist) => artist.name).join(", ") ||
            song.artist ||
            "Unknown Artist"}
        </p>
      </div>

      <AddToPlaylistButton song={song} />
    </div>
  );
}

export default SongResult;