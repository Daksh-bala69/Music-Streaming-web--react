import React from "react";
import Sidebar from "./components/Sidebar";
import PlayerCard from "./components/PlayerCard";
import Queue from "./components/Queue";
import BottomPlayer from "./components/BottomPlayer";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import AlbumPage from "./pages/AlbumPage";
import { getRandomSongsFromSameGenre } from "./api/genreApi";
// THE BACKEND URL THAT THE FRONTEND USES TO FETCH SONGS, COVERS, AND STREAMS
import { API_URL } from "./api/config";

function App() {
  // THE QUEUE ONLY STORES SONGS THAT THE USER HAS PLAYED OR ADDED
  const [queue, setQueue] = React.useState([]);

  // HOOKS FOR THE CURRENT SONG AND PLAYER STATE
  const [currentSongIndex, setCurrentSongIndex] = React.useState(-1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [repeatMode, setRepeatMode] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);

  // HOOKS FOR THE ALBUM
  const [album, setAlbum] = React.useState({});

  // HOOK THAT CONTROLS WHICH PAGE IS SHOWING IN THE MIDDLE CONTENT AREA
  const [activePage, setActivePage] = React.useState("home");

  // THE AUDIO OBJECT THAT ACTUALLY PLAYS THE SONGS
  const audioRef = React.useRef(new Audio());

  // THE CURRENT SONG THAT IS BEING DISPLAYED AND PLAYED
  const currentSong =
    currentSongIndex >= 0 ? queue[currentSongIndex] : null;

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

  // FUNCTION THAT LOADS A SONG FROM THE QUEUE BY INDEX
  function loadSong(index, shouldPlay = true) {
    if (queue.length === 0) return;

    // IF THE INDEX IS OUTSIDE THE QUEUE, STOP PLAYBACK MOVEMENT
    if (index < 0 || index >= queue.length) {
      setIsPlaying(false);
      return;
    }

    const selectedSong = queue[index];

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
          console.error("Error playing queue song:", err);
          setIsPlaying(false);
        });
    }
  }

  // FUNCTION THAT PLAYS A SONG FROM SEARCH, PLAYLISTS, ALBUM PAGES, ETC
// FUNCTION THAT PLAYS A SEARCH SONG AND ADDS RANDOM SONGS FROM THE SAME GENRE TO THE QUEUE
async function playSongFromSearch(song) {
  try {
    // NORMALIZES THE CLICKED SONG FIRST
    const formattedSong = normalizeSong(song);

    // GETS RANDOM SONGS FROM THE SAME GENRE
    const response = await getRandomSongsFromSameGenre(formattedSong.id, 10);

    // NORMALIZES THE RANDOM GENRE SONGS
    const randomGenreSongs = response.songs.map(normalizeSong);

    // REMOVES THE CLICKED SONG IF IT ALSO APPEARS IN THE RANDOM RESULTS
    const filteredGenreSongs = randomGenreSongs.filter(
      (genreSong) => genreSong.id !== formattedSong.id
    );

    // CREATES A NEW QUEUE WITH THE CLICKED SONG FIRST
    const newQueue = [formattedSong, ...filteredGenreSongs];

    // REPLACES THE CURRENT QUEUE WITH THE SEARCH-GENERATED QUEUE
    setQueue(newQueue);

    // LOADS THE CLICKED SONG DIRECTLY INTO THE AUDIO PLAYER
    audioRef.current.pause();
    audioRef.current.src = formattedSong.audio;
    audioRef.current.load();
    audioRef.current.volume = volume;

    // UPDATES THE PLAYER STATE
    setCurrentSongIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    // PLAYS THE CLICKED SONG
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Error playing search song:", err);
        setIsPlaying(false);
      });
  } catch (error) {
    console.error("Error creating genre queue:", error);

    // FALLBACK: IF GENRE SONGS FAIL, STILL PLAY THE CLICKED SONG
    const formattedSong = normalizeSong(song);

    setQueue([formattedSong]);

    audioRef.current.pause();
    audioRef.current.src = formattedSong.audio;
    audioRef.current.load();
    audioRef.current.volume = volume;

    setCurrentSongIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Error playing fallback search song:", err);
        setIsPlaying(false);
      });
  }
}

  // FUNCTION THAT REPLACES THE QUEUE WITH ALBUM SONGS AND PLAYS THE CLICKED SONG
  function playSongsFromAlbum(albumSongs, clickedSong) {
    // NORMALIZES ALL SONGS FROM THE ALBUM
    const formattedAlbumSongs = albumSongs.map(normalizeSong);

    // FINDS THE CLICKED SONG INSIDE THE ALBUM SONGS
    const clickedIndex = formattedAlbumSongs.findIndex(
      (song) => song.id === clickedSong.id
    );

    // IF THE CLICKED SONG IS NOT FOUND, STOP
    if (clickedIndex === -1) return;

    const selectedSong = formattedAlbumSongs[clickedIndex];

    // REPLACES THE OLD QUEUE WITH THE FULL ALBUM
    setQueue(formattedAlbumSongs);

    // LOADS THE CLICKED SONG DIRECTLY INTO THE AUDIO PLAYER
    audioRef.current.pause();
    audioRef.current.src = selectedSong.audio;
    audioRef.current.load();
    audioRef.current.volume = volume;

    // UPDATES THE PLAYER STATE
    setCurrentSongIndex(clickedIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    // PLAYS THE CLICKED SONG
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Error playing album song:", err);
        setIsPlaying(false);
      });
  }

  // FUNCTION THAT TOGGLES PLAY AND PAUSE
  function togglePlay() {
    if (!currentSong) return;

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
    if (!currentSong) return;

    if (repeatMode || isShuffle) {
      handleSongEnd();
      return;
    }

    loadSong(currentSongIndex + 1);
  }

  // FUNCTION THAT PLAYS THE PREVIOUS SONG
  function previousSong() {
    if (!currentSong) return;

    if (repeatMode || isShuffle) {
      handleSongEnd();
      return;
    }

    loadSong(currentSongIndex - 1);
  }

  // FUNCTION THAT RUNS WHEN THE CURRENT SONG ENDS
  function handleSongEnd() {
    if (queue.length === 0 || currentSongIndex === -1) return;

    // IF REPEAT IS ON, PLAY THE SAME SONG AGAIN
    if (repeatMode) {
      loadSong(currentSongIndex);
      return;
    }

    // IF SHUFFLE IS ON, PICK A RANDOM SONG FROM THE QUEUE
    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * queue.length);

      // MAKES SURE THE SAME SONG DOES NOT REPEAT IF THERE IS MORE THAN ONE SONG
      if (queue.length > 1) {
        while (randomIndex === currentSongIndex) {
          randomIndex = Math.floor(Math.random() * queue.length);
        }
      }

      loadSong(randomIndex);
      return;
    }

    // DEFAULT BEHAVIOR: PLAY THE NEXT SONG IN THE QUEUE
    loadSong(currentSongIndex + 1);
  }

  // CLEAR QUEUE
  function clearQueue() {
    audioRef.current.pause();
    audioRef.current.src = "";

    setQueue([]);
    setCurrentSongIndex(-1);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }

  // ADDS AUDIO EVENT LISTENERS FOR TIME, DURATION, AND SONG ENDING
  React.useEffect(() => {
    const audio = audioRef.current;

    let lastUpdateTime = 0;

    // UPDATES THE CURRENT TIME WHILE THE SONG IS PLAYING
    function updateTime() {
      const now = Date.now();

      // ONLY UPDATE REACT STATE EVERY 500MS TO AVOID TOO MANY RERENDERS
      if (now - lastUpdateTime < 500) return;

      lastUpdateTime = now;
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
  }, [currentSongIndex, volume, isShuffle, repeatMode, queue]);

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
        <SearchPage
          playSongFromSearch={playSongFromSearch}
          onAlbumClick={openAlbumPage}
        />
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
          playSongsFromAlbum={playSongsFromAlbum}
          playSongFromSearch={playSongFromSearch}
          id={album.id}
        />
      )}

      {/* QUEUE STAYS VISIBLE ON EVERY PAGE */}
      <Queue
        songs={queue}
        currentSongIndex={currentSongIndex}
        loadSong={loadSong}
        clearQueue={clearQueue}
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