import pool from "../db/pool.js";

// GETS ALL THE ALBUMS FROM THE DATABASE
export async function findAllAlbums() {
  const response = await pool.query(`
    SELECT
      albums.id,
      albums.title,
      albums.cover_filename,
      albums.release_year,
      albums.song_count,
      albums.total_duration_seconds,
      artists.name AS artist,
      '/album-files/' || albums.cover_filename AS cover_url
    FROM albums 
    LEFT JOIN artists
      ON albums.artist_id = artists.id
    ORDER BY albums.release_year, albums.title;
  `);

  return response.rows.map((album) => ({
    id: album.id,
    title: album.title,
    artist: album.artist,

    releaseYear: album.release_year,
    release_year: album.release_year,

    cover_filename: album.cover_filename,
    cover: album.cover_url,
    cover_url: album.cover_url,

    song_count: album.song_count,
    total_duration_seconds: album.total_duration_seconds,
  }));
}

// FINDS THE ALBUM BY ALBUM ID FROM THE DATABASE
export async function findAlbumById(id) {
  const response = await pool.query(
    `
    SELECT
      albums.id,
      albums.title,
      albums.cover_filename,
      albums.release_year,
      albums.song_count,
      albums.total_duration_seconds,
      artists.name AS artist,
      '/album-files/' || albums.cover_filename AS cover_url
    FROM albums
    LEFT JOIN artists
      ON albums.artist_id = artists.id
    WHERE albums.id = $1;
    `,
    [id]
  );

  if (response.rows.length === 0) {
    return null;
  }

  const album = response.rows[0];

  return {
    id: album.id,
    title: album.title,
    artist: album.artist,

    releaseYear: album.release_year,
    release_year: album.release_year,

    cover_filename: album.cover_filename,
    cover: album.cover_url,
    cover_url: album.cover_url,

    song_count: album.song_count,
    total_duration_seconds: album.total_duration_seconds,
  };
}

// FIND SONGS FROM THAT ALBUM USING ID
export async function findSongsByAlbumId(id) {
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

      '/api/songs/' || songs.id || '/stream' AS stream_url,
      '/api/songs/' || songs.id || '/stream' AS audio,
      '/album-files/' || songs.cover_filename AS cover_url,
      '/album-files/' || songs.cover_filename AS cover

    FROM songs

    LEFT JOIN albums
      ON songs.album_id = albums.id

    LEFT JOIN artists
      ON albums.artist_id = artists.id

    WHERE songs.album_id = $1

    ORDER BY songs.track_number;
    `,
    [id]
  );

  return response.rows.map((song) => ({
    id: song.id,
    title: song.title,

    // ALBUM INFO
    album: song.album_title,
    album_title: song.album_title,
    album_id: song.album_id,

    // ARTIST INFO
    artist: song.artist_name,
    artist_name: song.artist_name,
    artist_id: song.artist_id,

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