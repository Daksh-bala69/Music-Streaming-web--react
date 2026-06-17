import React from "react";

function SongResult(props) {
    return (
        <div className="songResult" onClick={props.onClick}>
            <img src={"http://localhost:5000" + props.song.cover}/>

            <div className="resultInfo">
                <h3>{props.song.title}</h3>
                <p>{props.song.artists[0].name}</p>
            </div>

            <span className="resultType">Song</span>
        </div>
    )
}

export default SongResult;