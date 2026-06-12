import React from "react";

function AlbumResult(props) {
    return (
        <div className="albumResult">
            <img src={"http://localhost:5000" + props.album.cover}
            />

            <div className="resultInfo">
                <h3>{props.album.title}</h3>
                <p>{props.album.artist.name}</p>
            </div>

            <span className="resultType">Album</span>
        </div>
    )
}

export default AlbumResult;