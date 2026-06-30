import React from "react";
import { API_URL } from "../api/config";

function AlbumResult(props) {
    return (
        <div className="albumResult" onClick={() => props.onClick()} >
            <img src={API_URL + props.album.cover}
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