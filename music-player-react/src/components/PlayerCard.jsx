import React from "react";
import SongTop from "./SongTop.jsx";
import Lyrics from "./Lyrics.jsx";

function PlayerCard({
  currentSong,
  isPlaying,
  togglePlay,
  nextSong,
  previousSong,
  duration,
  seekTo,
  currentTime,
  isShuffle,
  toggleShuffle,
  repeatMode,
  toggleRepeat
}) {
  return (
    <div className="playerCard">
      {/* THE TOP OD THE SONG CONTAINING THE CONTROLS, IMAGE, ARTIST AND SONG NAME AND THE SEEKBAR */}
      <SongTop 
        currentSong ={currentSong}  
        isPlaying = {isPlaying} 
        togglePlay = {togglePlay} 
        nextSong = {nextSong}
        previousSong = {previousSong}
        duration = {duration}
        seekTo = {seekTo}
        currentTime = {currentTime}
        isShuffle = {isShuffle}
        toggleShuffle = {toggleShuffle}
        toggleRepeat = {toggleRepeat}
        repeatMode = {repeatMode}
      />

      {/* LYRICS */}
      <Lyrics />

    </div>
  );
}

export default PlayerCard;
