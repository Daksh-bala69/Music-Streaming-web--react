import React from "react";
import { searchMusic } from "../api/searchApi.js";
import SongResult from "../components/SongResult.jsx";
import AlbumResult from "../components/AlbumResult.jsx";
import GenreResult from "../components/GenreResult.jsx";
import ArtistResult from "../components/ArtistResult.jsx";

function SearchPage(props) {
    const [query, setQuery] = React.useState(""); // THE QUERY THAT THE USER SEARCHES

    const [results, setResults] = React.useState({ // THE RESULT WE GET FROM THE DATABASE OF THAT QUERY
        songs: [],
        artists: [],
        albums: [],
        genres: [],
    });
    const [activeFilter, setActiveFilter] = React.useState("all"); // THE CURRENT FILTER THAT THE USER HAS SELECTED AND IS VIEWING (SONGS, ARTITS, ALBUMS, ETC)

    // AN EFFECT THAT HAPPENS EVERY TIME A NEW QUERY IS LAODED
    React.useEffect(() => {
        // MAKES IT SUCH THAT THE QUERY IS SENT TO THE DATABASE ONLY WITH SOME DELAY SO THAT THE USER GETS TIME TO TYPE 
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

    function handleArtistsFilter() {
        return results.artists.map((artist) => {
            return <ArtistResult artist={artist} key={artist.id} />
        })
    }

    function handleSongsFilter() {
        return results.songs.map((song) => {
            return <SongResult song={song} key={song.id}  onClick={() => props.playSongFromSearch(song)}/>
        })
    }

    function handleAlbumsFilter() {
        return results.albums.map((album) => {
            return <AlbumResult album={album} key={album.id} />
        })
    }

    function handleGenresFilter() {
        return results.genres.map((genre) => {
            return <GenreResult genre={genre} key={genre.id} />
        })
    }

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

                {/* THESE ARE THE FILTER BUTTONS */}
                <div className="searchFilterBar">
                    <button className={activeFilter === "all" ? "searchFilterButton active" : "searchFilterButton"} onClick={() => { setActiveFilter("all") }} >All</button>
                    <button className={activeFilter === "songs" ? "searchFilterButton active" : "searchFilterButton"} onClick={() => { setActiveFilter("songs") }}>Songs</button>
                    <button className={activeFilter === "albums" ? "searchFilterButton active" : "searchFilterButton"} onClick={() => { setActiveFilter("albums") }}>Albums</button>
                    <button className={activeFilter === "artists" ? "searchFilterButton active" : "searchFilterButton"} onClick={() => { setActiveFilter("artists") }}>Artists</button>
                    <button className={activeFilter === "genres" ? "searchFilterButton active" : "searchFilterButton"} onClick={() => { setActiveFilter("genres") }}>Genres</button>
                </div>
            </div>

            {/* THESE ARE THE RESULTS OF THE SEARCH */}
            <div className="searchResults">
                {results.albums.length === 0 && activeFilter === "albums" && (
                    <p className="noResults">No albums found.</p>
                )}

                {results.artists.length === 0 && activeFilter === "artists" && (
                    <p className="noResults">No artists found.</p>
                )}

                {results.songs.length === 0 && activeFilter === "songs" && (
                    <p className="noResults">No songs found.</p>
                )}

                {results.genres.length === 0 && activeFilter === "genres" && (
                    <p className="noResults">No genres found.</p>
                )}

                {results.songs.length === 0 && activeFilter === "all" && (
                    <p className="noResults">No results found.</p>
                )}

                {(activeFilter === "all" || activeFilter === "artists") && (
                    <section className="searchSection">
                        <div className="chipGrid">
                            {handleArtistsFilter()}
                        </div>
                    </section>
                )}

                {(activeFilter === "all" || activeFilter === "albums") && (
                    <section className="searchSection">
                        <div className="resultList">
                            {handleAlbumsFilter()}
                        </div>
                    </section>
                )}

                {(activeFilter === "all" || activeFilter === "songs") && (
                    <section className="searchSection">
                        <div className="resultList">
                            {handleSongsFilter()}
                        </div>
                    </section>
                )}

                {(activeFilter === "all" || activeFilter === "genres") && (
                    <section className="searchSection">
                        <div className="chipGrid">
                            {handleGenresFilter()}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default SearchPage;