import React from "react";

function GenreResult(props) {
    return (
        <div className="genreResult">
            <h3>{props.genre.name}</h3>
            {console.log(props)}
            <p>{props.genre.song_count} songs</p>
        </div>
    )
}

export default GenreResult;