import React from "react";
import AddToPlaylistButton from "./AddToPlaylistButton";

function QueueList({ currentSongIndex, loadSong, songs }) {
  return (
    <div className="queueList">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={
            index === currentSongIndex
              ? "queueItem active currSong"
              : "queueItem"
          }
          onClick={() => loadSong(index)}
        >
          <img
            src={song.cover}
            alt={song.title}
          />

          <div className="queueSongInfo">
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>

          <AddToPlaylistButton song = {song}/>

          <span className="songTime">
            {index === currentSongIndex ? "▶" : formatDuration(song.duration)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function formatDuration(seconds) {
  if (!seconds) return "--:--";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default QueueList;