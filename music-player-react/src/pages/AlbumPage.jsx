import React from "react";
import { getAlbumById } from "../api/albumApi";
import { formatDuration } from "../components/QueueList.jsx";
import "../styles/AlbumPage.css";

function AlbumPage({ id }) {
    const [album, setAlbum] = React.useState(null);
    const [songs, setSongs] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        async function loadAlbum() {
            try{
                setIsLoading(true);

                const response = await getAlbumById(id);
                console.log(response);
                setAlbum(response.album);
                setSongs(response.songs);
            }       
            catch(error){
                console.error("Error loading album");
                setAlbum(null);
            }
            finally{
                setIsLoading(false);
            }
        }

        if(id){
            loadAlbum();
        }
    }, [])

  // FUNCTION THAT FORMATS THE TOTAL DURATION FROM SECONDS TO READABLE TEXT
  function formatTotalDuration(duration_seconds) {
    if (!duration_seconds) return "";

    const totalSeconds = Number(duration_seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours} hr ${mins} min ${seconds} sec`;
    }

    return `${mins} min ${seconds} sec`;
  }

  // LOADING SCREEN WHILE THE ALBUM DATA IS BEING FETCHED
  if (isLoading) {
    return (
      <div className="album-page">
        <p>Loading album...</p>
      </div>
    );
  }

  // FALLBACK IF THE ALBUM DOES NOT EXIST
  if (!album) {
    return (
      <div className="album-page">
        <p>Album not found.</p>
      </div>
    );
  }

  return (
    <div className="album-page">
      <section className="album-hero">
        <div className="album-cover-box">
          <img
            src={"http://localhost:5000" + album.cover_url}
            alt={album.title}
          />
        </div>

        <div className="album-info">

          <h1>{album.title}</h1>

          <div className="album-meta">
            <span className="album-artist-avatar">
              {album.artist?.charAt(0) || "?"}
            </span>

            <strong>{album.artist || "Unknown Artist"}</strong>
            <span>•</span>
            <span>{album.release_year}</span>
            <span>•</span>
            <span>{album.song_count} songs</span>
            <span>•</span>
            <span>{formatTotalDuration(album.total_duration_seconds)}</span>
          </div>
        </div>
      </section>

      <section className="album-content">
        <div className="album-actions">
          <button className="album-main-play-btn">▶</button>
          <button className="album-icon-btn">＋</button>
          <button className="album-dots-btn">•••</button>

          <div className="album-view-mode">
            <span>List</span>
            <span>☷</span>
          </div>
        </div>

        <div className="album-track-table">
          <div className="album-track-header">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Duration</span>
          </div>

          {songs.map((song, index) => (
            <div className="album-track-row" key={song.id}>
              <span className="album-track-number">
                {song.track_number || index + 1}
              </span>

              <div className="album-track-title">
                <h3>{song.title}</h3>
                <p>{song.artist || album.artist || "Unknown Artist"}</p>
              </div>

              <p className="album-track-name">
                {song.album || album.title}
              </p>

              <p className="album-track-duration">
                {formatDuration(song.duration_seconds)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AlbumPage;