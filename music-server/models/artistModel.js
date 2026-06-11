import pool from "../db/pool.js";

//FINDS ALL THE ARTISTS FROM THE DATABASE
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

// FIND THE ALBUMS BY AN ARTIST (USING ID)
export async function findAlbumsByArtistId(artistId) {
  const response = await pool.query(
    `
    SELECT
      albums.id,
      albums.title,
      albums.cover_filename,
      albums.release_year
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
    cover: `/covers/${album.cover_filename}`,
  }));
}

// FINDS THE NAMES OF THE SONGS BY THE ARTIST (USING ID)
export async function findSongsByArtistId(artistId) {
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
    JOIN song_artists
      ON songs.id = song_artists.song_id
    LEFT JOIN albums
      ON songs.album_id = albums.id
    WHERE song_artists.artist_id = $1
    ORDER BY songs.id;
    `,
    [artistId]
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