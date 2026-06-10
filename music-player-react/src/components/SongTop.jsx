import React from "react";
import SongInfo from "./SongInfo.jsx";
import ProgressArea from "./ProgressArea.jsx";
import Controls from "./Controls.jsx";

function SongTop({ 
  currentSong, 
  isPlaying, 
  nextSong, 
  previousSong, 
  togglePlay, 
  duration, 
  seekTo, 
  currentTime,
  isShuffle,
  toggleShuffle,
  repeatMode,
  toggleRepeat
}) {
  return (
    <div className="songTop">
      <img
        src={currentSong.cover}
        className="albumCover"
        alt="Album Cover"
      />

      <div className="songInfo">
        <h1>{currentSong.title}</h1>
        <h2>{currentSong.artist}</h2>

        < SongInfo />

        <ProgressArea 
          currentTime = {currentTime}
          duration = {duration}
          seekTo = {seekTo}
        />

        <Controls 
          previousSong = {previousSong}
          togglePlay = {togglePlay}
          isPlaying = {isPlaying}
          nextSong = {nextSong}
          controlClass = {"controls"}
          isShuffle = {isShuffle}
          toggleShuffle = {toggleShuffle}
          toggleRepeat = {toggleRepeat}
          repeatMode = {repeatMode}
        />

      </div>
    </div>
  );
}

export default SongTop;
