import React from "react";
import Sidebar from "./components/Sidebar";
import PlayerCard from "./components/PlayerCard";
import Queue from "./components/Queue";
import BottomPlayer from "./components/BottomPlayer";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import AlbumPage from "./pages/AlbumPage";

// THE BACKEND URL THAT THE FRONTEND USES TO FETCH SONGS, COVERS, AND STREAMS
const API_URL = "http://localhost:5000";

function App() {
  // THE MAIN SONGS ARRAY THAT STORES ALL THE SONGS USED BY THE PLAYER AND QUEUE
  const [songs, setSongs] = React.useState([]);

  // HOOKS FOR THE CURRENT SONG AND PLAYER STATE
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [repeatMode, setRepeatMode] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);

  //HOOKS FOR THE ALBUM
  const [album, setAlbum] = React.useState({});

  // HOOK THAT CONTROLS WHICH PAGE IS SHOWING IN THE MIDDLE CONTENT AREA
  const [activePage, setActivePage] = React.useState("home");

  // THE AUDIO OBJECT THAT ACTUALLY PLAYS THE SONGS
  const audioRef = React.useRef(new Audio());

  // THE CURRENT SONG THAT IS BEING DISPLAYED AND PLAYED
  const currentSong = songs[currentSongIndex];

  // FUNCTION THAT OPENS THE ALBUM PAGE WHEN AN ALBUM IS CLICKED
  function openAlbumPage(album) {
    setActivePage("album");
    setAlbum(album);
  }

  // FUNCTION THAT NORMALIZES SONG DATA FROM THE BACKEND SO THE FRONTEND CAN USE IT SAFELY
  function normalizeSong(song) {
    // GETS THE AUDIO PATH FROM DIFFERENT POSSIBLE BACKEND FIELD NAMES
    const audioPath =
      song.audio ||
      song.stream_url ||
      `/api/songs/${song.id}/stream`;

    // GETS THE COVER PATH FROM DIFFERENT POSSIBLE BACKEND FIELD NAMES
    const coverPath =
      song.cover ||
      song.cover_url ||
      (song.cover_filename ? `/album-files/${song.cover_filename}` : null);

    return {
      ...song,

      // MAKES SURE EVERY SONG HAS AN ARTIST FIELD
      artist:
        song.artist ||
        song.artist_name ||
        song.artists?.map?.((artist) => {
          if (typeof artist === "string") return artist;
          return artist.name;
        }).join(", ") ||
        "Unknown Artist",

      // MAKES SURE EVERY SONG HAS AN ALBUM FIELD
      album:
        song.album ||
        song.album_title ||
        song.albumTitle ||
        "Unknown Album",

      // MAKES SURE EVERY SONG AUDIO URL IS A FULL URL
      audio: audioPath.startsWith("http")
        ? audioPath
        : `${API_URL}${audioPath}`,

      // MAKES SURE EVERY SONG COVER URL IS A FULL URL
      cover: coverPath
        ? coverPath.startsWith("http")
          ? coverPath
          : `${API_URL}${coverPath}`
        : null,
    };
  }

  // LOADS ALL SONGS FROM THE BACKEND WHEN THE APP FIRST STARTS
  React.useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch(`${API_URL}/api/songs`);
        const data = await response.json();

        // NORMALIZES ALL SONGS BEFORE PUTTING THEM INTO STATE
        const normalizedSongs = data.map(normalizeSong);

        setSongs(normalizedSongs);

        // SETS THE FIRST SONG AS THE DEFAULT AUDIO SOURCE
        if (normalizedSongs.length > 0) {
          audioRef.current.src = normalizedSongs[0].audio;
          audioRef.current.volume = volume;
        }
      } catch (err) {
        console.error("Error fetching songs: ", err);
      }
    }

    fetchSongs();
  }, []);

  // FUNCTION THAT LOADS A SONG INTO THE AUDIO PLAYER BY INDEX
  function loadSong(index, shouldPlay = true) {
    if (songs.length === 0) return;

    // IF THE INDEX IS OUTSIDE THE SONG ARRAY, RESET TO THE FIRST SONG
    if (index < 0 || index >= songs.length) {
      index = 0;
      shouldPlay = false;
    }

    const selectedSong = songs[index];

    // RESETS AND LOADS THE SELECTED SONG
    audioRef.current.pause();
    audioRef.current.src = selectedSong.audio;
    audioRef.current.load();
    audioRef.current.volume = volume;

    // UPDATES THE PLAYER STATE
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    // PLAYS THE SONG IF SHOULDPLAY IS TRUE
    if (shouldPlay) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Error playing song:", err);
          setIsPlaying(false);
        });
    }
  }

  // FUNCTION THAT PLAYS A SONG FROM SEARCH, PLAYLISTS, ALBUM PAGES, ETC
  function playSongFromSearch(song) {
    // CHECKS IF THE SONG ALREADY EXISTS IN THE MAIN SONGS ARRAY
    const existingIndex = songs.findIndex((s) => s.id === song.id);

    // IF IT ALREADY EXISTS, JUST LOAD IT FROM THE CURRENT SONG ARRAY
    if (existingIndex !== -1) {
      loadSong(existingIndex, true);
      return;
    }

    // IF IT DOES NOT EXIST, NORMALIZE IT AND ADD IT TO THE QUEUE
    const formattedSong = normalizeSong(song);
    const newIndex = songs.length;

    setSongs((prevSongs) => [...prevSongs, formattedSong]);

    // LOADS THE NEW SONG DIRECTLY INTO THE AUDIO PLAYER
    audioRef.current.pause();
    audioRef.current.src = formattedSong.audio;
    audioRef.current.load();
    audioRef.current.volume = volume;

    // UPDATES THE PLAYER STATE FOR THE NEW SONG
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    // PLAYS THE NEW SONG
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Error playing searched song:", err);
        setIsPlaying(false);
      });
  }

  // FUNCTION THAT TOGGLES PLAY AND PAUSE
  function togglePlay() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Error toggling play:", err);
        setIsPlaying(false);
      });
  }

  // FUNCTION THAT TURNS SHUFFLE ON AND OFF
  function toggleShuffle() {
    setIsShuffle((prev) => !prev);
  }

  // FUNCTION THAT TURNS REPEAT ON AND OFF
  function toggleRepeat() {
    setRepeatMode((prev) => !prev);
  }

  // FUNCTION THAT PLAYS THE NEXT SONG
  function nextSong() {
    if (repeatMode || isShuffle) {
      handleSongEnd();
      return;
    }

    loadSong(currentSongIndex + 1);
  }

  // FUNCTION THAT PLAYS THE PREVIOUS SONG
  function previousSong() {
    if (repeatMode || isShuffle) {
      handleSongEnd();
      return;
    }

    loadSong(currentSongIndex - 1);
  }

  // FUNCTION THAT RUNS WHEN THE CURRENT SONG ENDS
  function handleSongEnd() {
    // IF REPEAT IS ON, PLAY THE SAME SONG AGAIN
    if (repeatMode) {
      loadSong(currentSongIndex);
      return;
    }

    // IF SHUFFLE IS ON, PICK A RANDOM SONG
    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * songs.length);

      // MAKES SURE THE SAME SONG DOES NOT REPEAT IF THERE IS MORE THAN ONE SONG
      if (songs.length > 1) {
        while (randomIndex === currentSongIndex) {
          randomIndex = Math.floor(Math.random() * songs.length);
        }
      }

      loadSong(randomIndex);
      return;
    }

    // DEFAULT BEHAVIOR: PLAY THE NEXT SONG
    loadSong(currentSongIndex + 1);
  }

  // ADDS AUDIO EVENT LISTENERS FOR TIME, DURATION, AND SONG ENDING
  React.useEffect(() => {
    const audio = audioRef.current;

    // UPDATES THE CURRENT TIME WHILE THE SONG IS PLAYING
    function updateTime() {
      setCurrentTime(audio.currentTime);
    }

    // UPDATES THE SONG DURATION WHEN METADATA LOADS
    function updateDuration() {
      setDuration(audio.duration || 0);
    }

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);

    audio.volume = volume;

    // CLEANS UP AUDIO EVENT LISTENERS
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSongIndex, volume, isShuffle, repeatMode, songs]);

  // FUNCTION THAT SEEKS TO A CERTAIN PERCENT OF THE SONG
  function seekTo(percent) {
    const audio = audioRef.current;

    if (!audio.duration) return;

    audio.currentTime = audio.duration * percent;
    setCurrentTime(audio.currentTime);
  }

  // FUNCTION THAT CHANGES THE VOLUME
  function changeVolume(percent) {
    audioRef.current.volume = percent;
    setVolume(percent);
  }

  // LOADING SCREEN WHILE SONGS ARE BEING FETCHED
  if (songs.length === 0) {
    return <div>Loading songs....</div>;
  }

  return (
    <div className="container">
      {/* SIDEBAR STAYS VISIBLE ON EVERY PAGE */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* HOME PAGE / MAIN PLAYER PAGE */}
      {activePage === "home" && (
        <PlayerCard
          currentSong={currentSong}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          nextSong={nextSong}
          previousSong={previousSong}
          seekTo={seekTo}
          duration={duration}
          currentTime={currentTime}
          isShuffle={isShuffle}
          toggleShuffle={toggleShuffle}
          toggleRepeat={toggleRepeat}
          repeatMode={repeatMode}
        />
      )}

      {/* SEARCH PAGE */}
      {activePage === "search" && (
        <SearchPage playSongFromSearch={playSongFromSearch} />
      )}

      {/* LIBRARY PAGE */}
      {activePage === "library" && (
        <LibraryPage 
          playSongFromSearch={playSongFromSearch} 
          onAlbumClick={openAlbumPage}
        />
      )}

      {/* ALBUM DETAIL PAGE */}
      {activePage === "album" && (
        <AlbumPage 
          id={album.id}
        />
      )}

      {/* QUEUE STAYS VISIBLE ON EVERY PAGE */}
      <Queue
        songs={songs}
        currentSongIndex={currentSongIndex}
        loadSong={loadSong}
      />

      {/* BOTTOM PLAYER STAYS VISIBLE ON EVERY PAGE */}
      <BottomPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        nextSong={nextSong}
        previousSong={previousSong}
        audioRef={audioRef}
        changeVolume={changeVolume}
        volume={volume}
        isShuffle={isShuffle}
        toggleShuffle={toggleShuffle}
        toggleRepeat={toggleRepeat}
        repeatMode={repeatMode}
      />
    </div>
  );
}

export default App;