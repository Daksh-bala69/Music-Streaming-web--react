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
  if (!currentSong) {
    return (
      <div className="bottomPlayer">
        <div className="miniSong">
          <div>
            <h4>No song playing</h4>
            <p>Pick a song to start</p>
          </div>
        </div>

        <Controls
          previousSong={previousSong}
          nextSong={nextSong}
          togglePlay={togglePlay}
          isPlaying={false}
          controlClass={"bottomControls"}
          isShuffle={isShuffle}
          toggleShuffle={toggleShuffle}
          toggleRepeat={toggleRepeat}
          repeatMode={repeatMode}
        />

        <Volume
          audioRef={audioRef}
          volume={volume}
          changeVolume={changeVolume}
        />
      </div>
    );
  }

  return (
    <div className="bottomPlayer">
      <div className="miniSong">
        <img src={currentSong.cover} alt="Album Cover" />

        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>

        <button className="heartButton">♥</button>
      </div>

      <Controls
        previousSong={previousSong}
        nextSong={nextSong}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        controlClass={"bottomControls"}
        isShuffle={isShuffle}
        toggleShuffle={toggleShuffle}
        toggleRepeat={toggleRepeat}
        repeatMode={repeatMode}
      />

      <Volume
        audioRef={audioRef}
        volume={volume}
        changeVolume={changeVolume}
      />
    </div>
  );
}

export default BottomPlayer;
