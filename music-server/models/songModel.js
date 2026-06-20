import pool from "../db/pool.js";

// FUNCTION TO QUERY THE DB TO FIND ALL THE SONGS AT ONCE
export async function findAllSongs() {
  const response = await pool.query(`
    SELECT
      songs.id,
      songs.title,
      songs.filename,
      songs.file_path,
      songs.cover_filename,
      songs.duration_seconds,
      songs.track_number,

      albums.id AS album_id,
      albums.title AS album_title,
      albums.release_year,
      album_artist.name AS album_artist,

      COALESCE(
        JSON_AGG(DISTINCT song_artist.name) 
        FILTER (WHERE song_artist.name IS NOT NULL),
        '[]'
      ) AS artists,

      COALESCE(
        JSON_AGG(DISTINCT genres.name) 
        FILTER (WHERE genres.name IS NOT NULL),
        '[]'
      ) AS genres

    FROM songs

    LEFT JOIN albums 
      ON songs.album_id = albums.id

    LEFT JOIN artists AS album_artist
      ON albums.artist_id = album_artist.id

    LEFT JOIN song_artists 
      ON songs.id = song_artists.song_id

    LEFT JOIN artists AS song_artist 
      ON song_artists.artist_id = song_artist.id

    LEFT JOIN song_genres 
      ON songs.id = song_genres.song_id

    LEFT JOIN genres 
      ON song_genres.genre_id = genres.id

    GROUP BY 
      songs.id,
      albums.id,
      albums.title,
      albums.release_year,
      album_artist.name

    ORDER BY albums.release_year, albums.title, songs.track_number;
  `);

  return response.rows.map(formatSong);
}

// FUNCTION TO FIND THE SONG WITH ITS ID IN THE DATABASE
export async function findSongById(id) {
  const result = await pool.query(
    `
    SELECT 
      songs.id,
      songs.title,
      songs.filename,
      songs.file_path,
      songs.cover_filename,
      songs.duration_seconds,
      songs.track_number,

      albums.id AS album_id,
      albums.title AS album_title,
      albums.release_year,
      album_artist.name AS album_artist,

      COALESCE(
        JSON_AGG(DISTINCT song_artist.name) 
        FILTER (WHERE song_artist.name IS NOT NULL),
        '[]'
      ) AS artists,

      COALESCE(
        JSON_AGG(DISTINCT genres.name) 
        FILTER (WHERE genres.name IS NOT NULL),
        '[]'
      ) AS genres

    FROM songs

    LEFT JOIN albums 
      ON songs.album_id = albums.id

    LEFT JOIN artists AS album_artist
      ON albums.artist_id = album_artist.id

    LEFT JOIN song_artists 
      ON songs.id = song_artists.song_id

    LEFT JOIN artists AS song_artist 
      ON song_artists.artist_id = song_artist.id

    LEFT JOIN song_genres 
      ON songs.id = song_genres.song_id

    LEFT JOIN genres 
      ON song_genres.genre_id = genres.id

    WHERE songs.id = $1

    GROUP BY 
      songs.id,
      albums.id,
      albums.title,
      albums.release_year,
      album_artist.name;
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return formatSong(result.rows[0]);
}

// HELPER FUNCTION TO FORMAT DATABASE ROWS INTO MEANINGFUL DATA
function formatSong(song) {
  return {
    id: song.id,
    title: song.title,

    artist: song.artists[0] || song.album_artist,
    artists: song.artists,

    album: song.album_title,
    albumId: song.album_id,
    albumArtist: song.album_artist,
    releaseYear: song.release_year,

    filename: song.filename,
    file_path: song.file_path,
    cover_filename: song.cover_filename,

    cover: `/album-files/${song.cover_filename}`,
    cover_url: `/album-files/${song.cover_filename}`,

    audio: `/api/songs/${song.id}/stream`,
    stream_url: `/api/songs/${song.id}/stream`,

    duration: song.duration_seconds,
    duration_seconds: song.duration_seconds,

    track_number: song.track_number,
    genres: song.genres,
  };
}