import pool from "../db/pool.js";

// FINDS ALL THE ARTISTS FROM THE DATABASE
export async function findAllArtists() {
  const response = await pool.query(`
    SELECT
      id,
      name
    FROM artists
    ORDER BY name;
  `);

  return response.rows;
}

// FINDS THE ARTIST BY THE ARTIST ID IN THE DATABASE
export async function findArtistById(id) {
  const response = await pool.query(
    `
    SELECT
      id,
      name
    FROM artists
    WHERE id = $1;
    `,
    [id]
  );

  if (response.rows.length === 0) {
    return null;
  }

  return response.rows[0];
}

// FIND THE ALBUMS BY AN ARTIST USING ID
export async function findAlbumsByArtistId(artistId) {
  const response = await pool.query(
    `
    SELECT
      albums.id,
      albums.title,
      albums.cover_filename,
      albums.release_year,
      '/album-files/' || albums.cover_filename AS cover_url
    FROM albums
    WHERE albums.artist_id = $1
    ORDER BY albums.release_year;
    `,
    [artistId]
  );

  return response.rows.map((album) => ({
    id: album.id,
    title: album.title,
    releaseYear: album.release_year,
    release_year: album.release_year,
    cover_filename: album.cover_filename,
    cover: album.cover_url,
    cover_url: album.cover_url,
  }));
}

// FINDS THE SONGS BY THE ARTIST USING ID
export async function findSongsByArtistId(artistId) {
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

      '/api/songs/' || songs.id || '/stream' AS stream_url,
      '/api/songs/' || songs.id || '/stream' AS audio,
      '/album-files/' || songs.cover_filename AS cover_url,
      '/album-files/' || songs.cover_filename AS cover

    FROM songs

    JOIN song_artists
      ON songs.id = song_artists.song_id

    LEFT JOIN albums
      ON songs.album_id = albums.id

    WHERE song_artists.artist_id = $1

    ORDER BY albums.release_year, albums.title, songs.track_number;
    `,
    [artistId]
  );

  return response.rows.map((song) => ({
    id: song.id,
    title: song.title,

    album: song.album_title,
    album_id: song.album_id,

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