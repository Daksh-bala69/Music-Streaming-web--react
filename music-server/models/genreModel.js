import pool from "../db/pool.js";

// FINDS ALL GENRES IN THE DATABASE
export async function findAllGenres() {
  const response = await pool.query(`
    SELECT
      id,
      name
    FROM genres
    ORDER BY name;
  `);

  return response.rows;
}

// FINDS THE GENRE FROM THE DATABASE USING ID 
export async function findGenreById(id) {
  const response = await pool.query(
    `
    SELECT
      id,
      name
    FROM genres
    WHERE id = $1;
    `,
    [id]
  );

  if (response.rows.length === 0) {
    return null;
  }

  return response.rows[0];
}

// FINDS SONGS OF THAT GENRE (USING ID)
export async function findSongsByGenreId(id) {
  const response = await pool.query(
    `
    SELECT
      songs.id,
      songs.title,
      songs.filename,
      songs.cover_filename,
      songs.duration_seconds,
      albums.title AS album
    FROM songs

    JOIN song_genres
      ON songs.id = song_genres.song_id

    LEFT JOIN albums
      ON songs.album_id = albums.id

    WHERE song_genres.genre_id = $1

    ORDER BY songs.id;
    `,
    [id]
  );

  return response.rows.map((song) => ({
    id: song.id,
    title: song.title,
    album: song.album,
    filename: song.filename,
    cover: `/covers/${song.cover_filename}`,
    audio: `/api/songs/${song.id}/stream`,
    duration: song.duration_seconds,
  }));
}