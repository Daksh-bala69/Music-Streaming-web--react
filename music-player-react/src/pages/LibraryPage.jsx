import React from "react";
import "../styles/LibraryPage.css";
import { getPlaylistById, getPlaylists, createPlaylist, addSongToPlaylist, removeSongFromPlaylist } from "../api/playlistApi";
import { getAlbums } from "../api/albumApi";
import { formatDuration } from "../components/QueueList";

function LibraryPage({
  playSongFromSearch,
  onAlbumClick,
}) {
  const [activeLibrarySection, setActiveLibrarySection] = React.useState("playlists"); // THE HOOK FOR THE SECTION
  const [playlists, setPlaylists] = React.useState([]); // THE HOOK FOR THE PLAYLISTS
  const [newPlaylistName, setNewPlaylistName] = React.useState(""); // THE HOOK FOR CRETING THE NEW NAME OF THE PLAYLIST
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);
  const [playlistSongs, setPlaylistSongs] = React.useState([]);
  const [isLoadingPlaylistSongs, setIsLoadingPlaylistSongs] = React.useState(false);

  //HOOKS FOR ALBUMS
  const [albums, setAlbums] = React.useState([]);

  // FUNCTION THAT LOADS THE PLAYLISTS FROM THE DATABASE WITH THE API
  async function loadPlaylists() {
    try {
      const response = await getPlaylists();
      setPlaylists(response.playlists);
    } catch (err) {
      console.error("Error loading playlists:", err);
    }
  }

  // LOADS THE PLAYLSITS (LOADS AT THE START AS ITS THE DEFAULT SECTION)
  React.useEffect(() => {
    loadPlaylists();
  }, []);


  // FUNCITON THAT HELPS CREATE THE NEW PLAYLIST OF THE NAME ENTERD IN THE INPUR BOX
  async function handleCreatePlaylist() {
    if (!newPlaylistName.trim()) return;

    try {
      await createPlaylist(newPlaylistName);

      setNewPlaylistName("");
      await loadPlaylists();
    }
    catch (error) {
      console.error("Error creating Playlist")
    }
  }

  async function loadAlbums() {
    const result = await getAlbums();
    console.log(result);
    setAlbums(result);
  }

  async function handleSelectPlaylist(playlist) {
    try {
      setSelectedPlaylist(playlist);
      setIsLoadingPlaylistSongs(true);

      const response = await getPlaylistById(playlist.id);

      console.log("SELECTED PLAYLIST RESPONSE:", response);

      const songs = response.playlist.songs|| [];

      setPlaylistSongs(songs);
    } catch (err) {
      console.error("Error loading playlist songs:", err);
      setPlaylistSongs([]);
    } finally {
      setIsLoadingPlaylistSongs(false);
    }
  }

  return (
    <div className="library-page">
      <div className="library-header">
        <div>
          <p className="library-label">Collection</p>
          <h1>Your Library</h1>
        </div>

        <div className="library-tabs">
          <button
            className={activeLibrarySection === "playlists" ? "active" : ""}
            onClick={() => setActiveLibrarySection("playlists")}
          >
            Playlists
          </button>

          <button
            className={activeLibrarySection === "albums" ? "active" : ""}
            onClick={() => {
              setActiveLibrarySection("albums")
              loadAlbums();
            }}
          >
            Albums
          </button>
        </div>
      </div>
      <hr />
      <br />

      {activeLibrarySection === "playlists" && (
        <div className="library-section">
          <div className="library-section-top">
            <h2>Playlists</h2>

            <div className="create-playlist-box">
              <input
                placeholder="New playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <button onClick={handleCreatePlaylist}>Create</button>
            </div>
          </div>

          <div className="library-layout">
            <div className="library-list">
              {playlists.map((playlist) => (
                <div
                  className={`library-playlist-card ${selectedPlaylist?.id === playlist.id ? "selected" : ""
                    }`}
                  key={playlist.id}
                  onClick={() => handleSelectPlaylist(playlist)}
                >
                  <h3>{playlist.name}</h3>
                  <p>{playlist.song_count || 0} songs</p>
                </div>
              ))}
            </div>

            <div className="library-preview-panel">
              {!selectedPlaylist && (
                <p>Select a playlist to view songs.</p>
              )}

              {selectedPlaylist && (
                <>
                  <div className="playlist-preview-header">
                    <div>
                      <p className="playlist-preview-label">Playlist</p>
                      <h2>{selectedPlaylist.name}</h2>
                    </div>

                    <p>{playlistSongs.length} songs</p>
                  </div>

                  {isLoadingPlaylistSongs && (
                    <p>Loading songs...</p>
                  )}

                  {!isLoadingPlaylistSongs && playlistSongs.length === 0 && (
                    <p>This playlist has no songs yet.</p>
                  )}

                  {!isLoadingPlaylistSongs && playlistSongs.length > 0 && (
                    <div className="playlist-song-list">
                      {playlistSongs.map((song, index) => (
                        <div className="playlist-song-row" key={song.id}>
                          <span className="playlist-song-number">{index + 1}</span>

                          <div
                            className="playlist-song-main"
                            onClick={() => playSongFromSearch(song)}
                          >
                            <h3>{song.title}</h3>
                            <p>{song.artist || "Unknown Artist"}</p>
                          </div>

                          <p className="playlist-song-album">
                            {song.album || "Unknown Album"}
                          </p>

                          <p className="playlist-song-duration">
                            {formatDuration(song.duration_seconds) || ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeLibrarySection === "albums" && (
        <div className="library-section">
          <div className="library-section-top">
            <h2>Albums</h2>
          </div>

          <div className="library-albums-grid">
            {albums.map((album) => (
              <div
                className="library-album-card"
                key={album.id}
                onClick={() => {
                  if (onAlbumClick) {
                    onAlbumClick(album);
                  }
                }}
              >
                <div className="library-album-cover">
                  <img src={`http://localhost:5000${album.cover_url}`} alt={album.title} />
                </div>

                <h3>{album.title}</h3>
                <p>{album.artist}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LibraryPage;