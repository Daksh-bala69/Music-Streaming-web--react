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

// FINDS SONGS OF THAT GENRE USING ID
export async function findSongsByGenreId(id) {
  const response = await pool.query(
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

      artists.id AS artist_id,
      artists.name AS artist_name,

      genres.id AS genre_id,
      genres.name AS genre_name,

      '/api/songs/' || songs.id || '/stream' AS stream_url,
      '/api/songs/' || songs.id || '/stream' AS audio,
      '/album-files/' || songs.cover_filename AS cover_url,
      '/album-files/' || songs.cover_filename AS cover

    FROM songs

    JOIN song_genres
      ON songs.id = song_genres.song_id

    LEFT JOIN genres
      ON song_genres.genre_id = genres.id

    LEFT JOIN albums
      ON songs.album_id = albums.id

    LEFT JOIN artists
      ON albums.artist_id = artists.id

    WHERE song_genres.genre_id = $1

    ORDER BY albums.title, songs.track_number;
    `,
    [id]
  );

  return response.rows.map((song) => ({
    id: song.id,
    title: song.title,

    album: song.album_title,
    album_title: song.album_title,
    album_id: song.album_id,

    artist: song.artist_name,
    artist_name: song.artist_name,
    artist_id: song.artist_id,

    genre: song.genre_name,
    genre_name: song.genre_name,
    genre_id: song.genre_id,

    filename: song.filename,
    file_path: song.file_path,
    cover_filename: song.cover_filename,

    cover: song.cover,
    cover_url: song.cover_url,

    audio: song.audio,
    stream_url: song.stream_url,

    duration: song.duration_seconds,
    duration_seconds: song.duration_seconds,

    track_number: song.track_number,
  }));
}

// FUCNTION THAT FETCHES SIMILAR GENRE SONGS AS THE SONGID GIVEN
export async function findRandomSongsBySameGenre(songId, limit = 10) {
  const response = await pool.query(
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

      artists.id AS artist_id,
      artists.name AS artist_name,

      genres.id AS genre_id,
      genres.name AS genre_name,

      '/api/songs/' || songs.id || '/stream' AS stream_url,
      '/api/songs/' || songs.id || '/stream' AS audio,
      '/album-files/' || songs.cover_filename AS cover_url,
      '/album-files/' || songs.cover_filename AS cover

    FROM songs

    JOIN song_genres
      ON songs.id = song_genres.song_id

    JOIN song_genres clicked_song_genre
      ON song_genres.genre_id = clicked_song_genre.genre_id

    LEFT JOIN genres
      ON song_genres.genre_id = genres.id

    LEFT JOIN albums
      ON songs.album_id = albums.id

    LEFT JOIN artists
      ON albums.artist_id = artists.id

    WHERE clicked_song_genre.song_id = $1
      AND songs.id != $1

    ORDER BY RANDOM()

    LIMIT $2;
    `,
    [songId, limit]
  );

  return response.rows.map((song) => ({
    id: song.id,
    title: song.title,

    album: song.album_title,
    album_title: song.album_title,
    album_id: song.album_id,

    artist: song.artist_name,
    artist_name: song.artist_name,
    artist_id: song.artist_id,

    genre: song.genre_name,
    genre_name: song.genre_name,
    genre_id: song.genre_id,

    filename: song.filename,
    file_path: song.file_path,
    cover_filename: song.cover_filename,

    cover: song.cover,
    cover_url: song.cover_url,

    audio: song.audio,
    stream_url: song.stream_url,

    duration: song.duration_seconds,
    duration_seconds: song.duration_seconds,

    track_number: song.track_number,
  }));
}