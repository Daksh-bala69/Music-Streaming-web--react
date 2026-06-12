import React from "react";
import { searchMusic } from "../api/searchApi.js";
import SongResult from "../components/SongResult.jsx";
import AlbumResult from "../components/AlbumResult.jsx";
import ArtistResult from "../components/ArtistResult.jsx";
import GenreResult from "../components/GenreResult.jsx";

function SearchPage() {
  const [query, setQuery] = React.useState("");

  const [results, setResults] = React.useState({
    songs: [],
    artists: [],
    albums: [],
    genres: [],
  });

  React.useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!query.trim()) {
        setResults({
          songs: [],
          artists: [],
          albums: [],
          genres: [],
        });
        return;
      }

      try {
        const data = await searchMusic(query);
        setResults(data.results);
        console.log(data.results);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="searchPage">
      <div className="searchHeader">
        <p className="searchEyebrow">Explore your library</p>
        <h1>Search</h1>

        <input
          className="searchInput"
          type="text"
          placeholder="Search songs, artists, albums, genres..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>

      <div className="searchResults">
        <section className="searchSection">
          <h2>Songs</h2>

          <div className="resultList">
            {results.songs.length === 0 ? (
              <p className="noResults">No songs found.</p>
            ) : (
              results.songs.map((song) => {
                return <SongResult song={song} key={song.id} />;
              })
            )}
          </div>
        </section>

        <section className="searchSection">
          <h2>Albums</h2>

          <div className="resultList">
            {results.albums.length === 0 ? (
              <p className="noResults">No albums found.</p>
            ) : (
              results.albums.map((album) => {
                return <AlbumResult album={album} key={album.id} />;
              })
            )}
          </div>
        </section>

        <section className="searchSection">
          <h2>Artists</h2>

          <div className="chipGrid">
            {results.artists.length === 0 ? (
              <p className="noResults">No artists found.</p>
            ) : (
              results.artists.map((artist) => {
                return <ArtistResult artist={artist} key={artist.id} />;
              })
            )}
          </div>
        </section>

        <section className="searchSection">
          <h2>Genres</h2>

          <div className="chipGrid">
            {results.genres.length === 0 ? (
              <p className="noResults">No genres found.</p>
            ) : (
              results.genres.map((genre) => {
                return <GenreResult genre={genre} key={genre.id} />;
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SearchPage;