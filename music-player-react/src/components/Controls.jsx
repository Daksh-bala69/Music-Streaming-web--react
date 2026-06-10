import React from "react";

function Controls({ 
    previousSong, 
    nextSong, 
    togglePlay, 
    isPlaying , 
    controlClass ,
    toggleShuffle,
    toggleRepeat,
    isShuffle,
    repeatMode
}) {

    const isBottom = (controlClass === "bottomControls")

    function handleRepeat() { 
        toggleRepeat();
    }

    function handleShuffle() { 
        toggleShuffle();
    }

    return (
        <div className={isBottom ? "bottomControls" : "controls"}>
            <button onClick= {handleShuffle} style={{color : isShuffle ? "black" : null}}>⤨</button>
            <button onClick={previousSong}>⏮</button>
            <button className={isBottom ? "bottomPlayButton" : "playButton"} onClick={togglePlay}>
                {isPlaying ? "Ⅱ" : "▶"}
            </button>
            <button onClick={nextSong}>⏭</button>
            <button onClick= {handleRepeat} style={{color : repeatMode ? "black" : null}} >↻</button>
        </div>
    )
}

export default Controls;