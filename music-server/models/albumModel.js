import pool from "../db/pool.js";

//GETS ALL THE ALBUMS FROM THE DATABSE
export async function findAllAlbums() {
  const response = await pool.query(`
    SELECT
      albums.id,
      albums.title,
      albums.cover_filename,
      albums.release_year,
      artists.name AS artist
    FROM albums 
    LEFT JOIN artists
      ON albums.artist_id = artists.id
    ORDER BY albums.id;
  `);

  return response.rows.map((album) => ({
    id: album.id,
    title: album.title,
    artist: album.artist,
    releaseYear: album.release_year,
    cover: `/covers/${album.cover_filename}`,
  }));
}

//FINDS THE ALBUM BY ALBUM ID FROM THE DATABSE(USING ID)
export async function findAlbumById(id) {
  const response = await pool.query(
    `
    SELECT
      albums.id,
      albums.title,
      albums.cover_filename,
      albums.release_year,
      artists.name AS artist
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
    cover: `/covers/${album.cover_filename}`,
  };
}

// FIND SONGS FROM THAT ABLUM (USING ID)
export async function findSongsByAlbumId(id) {
  const response = await pool.query(
    `
    SELECT
      id,
      title,
      filename,
      duration_seconds

    FROM songs

    WHERE album_id = $1

    ORDER BY id;
    `,
    [id]
  );

  return response.rows;
}