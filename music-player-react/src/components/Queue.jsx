import React from "react";
import QueueList from "./QueueList.jsx";

function Queue({ songs, currentSongIndex, loadSong, clearQueue }) {
  return (
    <div className="queue">
      <div className="queueHeader">
        <h3>Queue</h3>
        <span onClick={()=> clearQueue()}>Clear</span>
      </div>

      <QueueList 
        songs = {songs}
        currentSongIndex = {currentSongIndex}
        loadSong = {loadSong}
      />

    </div>
  );
}

export default Queue;
