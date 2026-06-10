import React from "react";

function QueueList({ currentSongIndex, loadSong, songs }) {
    return (
        <div className="queueList">
            {songs.map((song, index) => (
                <div
                    key={song.title}
                    className={
                        index === currentSongIndex
                            ? "queueItem active currSong"
                            : "queueItem"
                    }
                    onClick={() => loadSong(index)}
                >
                    <img src={song.cover} alt="" />

                    <div className="queueSongInfo">
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                    </div>

                    <span className="songTime">
                        {index === currentSongIndex ? "▶" : song.duration}
                    </span>
                </div>
            ))}
        </div>

    )
}


export default QueueList;