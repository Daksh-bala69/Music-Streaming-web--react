import React from "react";

function ArtistResult(props) {
    return (
        <div className="artistResult">
            <h3>{props.artist.name}</h3>
            <p>{props.artist.song_count} songs</p>
        </div>
    )
}

export default ArtistResult;