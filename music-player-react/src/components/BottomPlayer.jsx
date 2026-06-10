import React from "react";
import Controls from "./Controls.jsx";
import Volume from "./Volume.jsx";

function BottomPlayer({
  currentSong,
  isPlaying,
  togglePlay,
  nextSong,
  previousSong,
  audioRef,
  changeVolume,
  volume, 
  isShuffle,
  toggleShuffle,
  repeatMode,
  toggleRepeat
}) {
  return (
    <div className="bottomPlayer">
      {/* THE MINISONG WITHT THE ARTIST COVER AND THE TITLE AND ARTIST NAME OF THE SONG */}
      <div className="miniSong">
        <img src={currentSong.cover} alt="Album Cover" />

        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>

        {/* THE LIKE BUTTON */}
        <button className="heartButton">♥</button>
      </div>

      {/* THE CONTROL BUTTONS AT THE BOTTOM */}
      <Controls 
        previousSong = {previousSong} 
        nextSong = {nextSong}
        togglePlay = {togglePlay}
        isPlaying = {isPlaying}
        controlClass = {"bottomControls"}
        isShuffle = {isShuffle}
        toggleShuffle = {toggleShuffle}
        toggleRepeat = {toggleRepeat}
        repeatMode = {repeatMode}
      />

      {/* THE VOLUME BAR */}
      <Volume     
        audioRef = {audioRef}
        volume = {volume}
        changeVolume = {changeVolume}
      />

    </div>
  );
}

export default BottomPlayer;
