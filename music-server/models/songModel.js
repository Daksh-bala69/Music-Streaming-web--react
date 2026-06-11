import pool from "../db/pool.js";

// FUCNTION TO QUERY THE DB TO FIND ALL THE SONGS AT ONCE
export async function findAllSongs() {
  const response = await pool.query(`
    SELECT
      songs.id,
      songs.title,
      songs.filename,
      songs.cover_filename,
      songs.duration_seconds,

      albums.title AS album_title,
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
      albums.title,
      album_artist.name

    ORDER BY songs.id;
  `);

  return response.rows.map(formatSong);
}

//FUCNTION TO FIND THE SONGS WITH THERE ID IN THE DATABASE
export async function findSongById(id) {
  const response = await pool.query(
    `
    SELECT
      songs.id,
      songs.title,
      songs.filename,
      songs.cover_filename,
      songs.duration_seconds,

      albums.title AS album_title,
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
      albums.title,
      album_artist.name;
    `,
    [id]
  );

  if (response.rows.length === 0) {
    return null;
  }

  return formatSong(response.rows[0]);
}

//JUST A HELPER FUCNITO TO FORMAT THE ROWS GIVEN BY THE DATABASE IN MEANINGFULL DATA
function formatSong(song) {
  return {
    id: song.id,
    title: song.title,
    artist: song.artists[0] || song.album_artist,
    artists: song.artists,
    album: song.album_title,
    albumArtist: song.album_artist,
    filename: song.filename,
    cover: `/covers/${song.cover_filename}`,
    audio: `/api/songs/${song.id}/stream`,
    duration: song.duration_seconds,
  };
}