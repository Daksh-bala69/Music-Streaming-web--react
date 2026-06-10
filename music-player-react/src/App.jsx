import React from "react";
import Sidebar from "./components/Sidebar";
import PlayerCard from "./components/PlayerCard";
import Queue from "./components/Queue";
import BottomPlayer from "./components/BottomPlayer";

const API_URL = "http://localhost:5000";

function App() {
  const [songs,setSongs] = React.useState([]); // FETCHES SONGS FROM THE SERVER
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [repeatMode, setRepeatMode] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);

  const audioRef = React.useRef(new Audio());
  const currentSong = songs[currentSongIndex];  // CURRENT SONG

  React.useEffect(()=>{

    async function fetchSongs() {
      try{

        const response = await fetch(`${API_URL}/api/songs`);
        const data = await response.json();

        const songsWithAudioUrlAndCovers = data.map((song) => {
          return (
            {
              ...song,
              audio : `${API_URL}/api/songs/${song.id}/stream`,
              cover: `${API_URL}${song.cover}`
            }
          )
        })

        setSongs(songsWithAudioUrlAndCovers);

        if (songsWithAudioUrlAndCovers.length > 0) {
          audioRef.current.src = songsWithAudioUrlAndCovers[0].audio;
          audioRef.current.volume = volume;
        }
      }

      catch(err){
        console.error("Error fetching songs: ",err);
      }
    }

    fetchSongs();

  }, []);

  //SONG LOADING LOGIC
  function loadSong(index, shouldPlay = true) {
    // STARTS FROM THE BEGINNING WHEN THE QUEUE IS OVER BUT IN STOPPED STATE
    if (index < 0 || index >= songs.length) {
      index = 0;
      shouldPlay = false;
    }

    audioRef.current.pause();
    audioRef.current = new Audio(songs[index].audio);
    audioRef.current.volume = volume;

    setCurrentSongIndex(index);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    //HANDLES THE PLAYING OR PAUSE STATE OF THE NEWLY LOADED SONG
    if(shouldPlay){
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  // TOGGLE THE PLAY/PAUSE
  function togglePlay() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  //TOGGLE THE SHUFFLE MODE
  function toggleShuffle(){
    setIsShuffle(prev => !prev);
  }

  // TOGGLE THE REPEAT MODE
  function toggleRepeat(){
    setRepeatMode(prev => !prev);
  }

  // NEXT BUTTON LOGIC
  function nextSong () {
    if(repeatMode || isShuffle) {
      handleSongEnd();
      return;
    }

    loadSong(currentSongIndex + 1);
  }

  // PREV BUTTON LOGIC
  function previousSong () {
    if(repeatMode || isShuffle) {
      handleSongEnd();
      return;
    }

    loadSong(currentSongIndex - 1);
  }    

  function handleSongEnd() {

      if(repeatMode) {
        loadSong(currentSongIndex);
        return;
      }

      if(isShuffle) {
        let randomIndex = Math.floor(Math.random() * songs.length);

        if(songs.length > 1){
          while(randomIndex === currentSongIndex){
            randomIndex = Math.floor(Math.random() * songs.length);
          }
        }

        loadSong(randomIndex);
        return;
      }

      loadSong(currentSongIndex + 1);
    }

  // HANDLES THE UPDATION OF THE TIME AND THE DURATION WHEN NEW SONG IS LOADED AND AS THE SONG IS PROGRESSING
  // ALSO HANDLES VOLUME
  React.useEffect(() => {
    const audio = audioRef.current;

    function updateTime(){
      setCurrentTime(audio.currentTime)
    }

    function updateDuration() {
      setDuration(audio.duration);
    }

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);

    audio.volume = volume;

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSongIndex, volume, duration, isShuffle, repeatMode]);

  // SEEK LOGIC FOR THE SEEKBAR
  function seekTo(percent){
    const audio = audioRef.current;
    if(!audio.duration) return;

    audio.currentTime = audio.duration * percent;
    setCurrentTime(audio.currentTime);
  }

  // SEEK VOLUME LOGIC FOR THE VOLUME BAR 
  function changeVolume(percent) {
    const audio = audioRef.current;

    audio.volume = percent;
    setVolume(percent);
  }

  if(songs.length === 0) {
    return (
      <div>Loading songs....</div>
    )
  };

  return (
    <div className="container">
      { /* SIDE BAR WITH ALL LINKS TO DIFFERENT PAGES */ }
      <Sidebar /> 

      { /* PLAYERCARD CONTAINING THE IMAGE, NAME OF ARTIST AND THE SONG AND THE PORGRESSBAR AND THE MAIN CONTROL BUTTONS AND THE LYRICS */ }
      <PlayerCard
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        nextSong={nextSong}
        previousSong={previousSong}
        seekTo = {seekTo}
        duration = {duration}
        currentTime = {currentTime}
        isShuffle = {isShuffle}
        toggleShuffle = {toggleShuffle}
        toggleRepeat = {toggleRepeat}
        repeatMode = {repeatMode}
      />

      {/* CONTAINS THE QUEUE LIST AND THE QUEUE CLEAR BUTTON */}
      <Queue
        songs={songs}
        currentSongIndex={currentSongIndex}
        loadSong={loadSong}
      />

      {/* CONTAINS THE BOTTOM PLAYER WITH THE IMAGES OF THE COVER, ARTIST NAME AND THE SONG NAME AND THE BOTTOM CONTROL BUTTONS AND THE VOLUME BAR */}
      <BottomPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        nextSong={nextSong}
        previousSong={previousSong}
        audioRef = {audioRef}
        changeVolume = {changeVolume}
        volume = {volume}
        isShuffle = {isShuffle}
        toggleShuffle = {toggleShuffle}
        toggleRepeat = {toggleRepeat}
        repeatMode = {repeatMode}
      />
    </div>
  );
}

export default App;
