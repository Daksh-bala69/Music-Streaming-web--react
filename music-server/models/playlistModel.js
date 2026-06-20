import pool from "../db/pool.js";

export async function getAllPlaylists() {
  const result = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.user_id,
      p.created_at,
      COUNT(ps.song_id) AS song_count
    FROM playlists p
    LEFT JOIN playlist_songs ps 
      ON p.id = ps.playlist_id
    GROUP BY p.id
    ORDER BY p.created_at DESC;
  `);

  return result.rows;
}

export async function getPlaylistById(id) {
  const playlistResult = await pool.query(
    `
    SELECT id, user_id, name, created_at
    FROM playlists
    WHERE id = $1;
    `,
    [id]
  );

  if (playlistResult.rows.length === 0) {
    return null;
  }

  const songsResult = await pool.query(
    `
    SELECT 
      s.id,
      s.title,
      s.filename,
      s.file_path,
      s.cover_filename,
      s.duration_seconds,
      s.track_number,

      ps.position,

      al.id AS album_id,
      al.title AS album_title,

      ar.id AS artist_id,
      ar.name AS artist_name,

      '/api/songs/' || s.id || '/stream' AS stream_url,
      '/api/songs/' || s.id || '/stream' AS audio,
      '/album-files/' || s.cover_filename AS cover_url,
      '/album-files/' || s.cover_filename AS cover

    FROM playlist_songs ps

    JOIN songs s 
      ON ps.song_id = s.id

    LEFT JOIN albums al 
      ON s.album_id = al.id

    LEFT JOIN song_artists sa 
      ON s.id = sa.song_id

    LEFT JOIN artists ar 
      ON sa.artist_id = ar.id

    WHERE ps.playlist_id = $1

    ORDER BY ps.position ASC;
    `,
    [id]
  );

  return {
    ...playlistResult.rows[0],
    songs: songsResult.rows,
  };
}

export async function createPlaylist(name, userId = 1) {
  const result = await pool.query(
    `
    INSERT INTO playlists (name, user_id)
    VALUES ($1, $2)
    RETURNING id, user_id, name, created_at;
    `,
    [name, userId]
  );

  return result.rows[0];
}

export async function addSongToPlaylist(playlistId, songId) {
  const positionResult = await pool.query(
    `
    SELECT COALESCE(MAX(position), 0) + 1 AS next_position
    FROM playlist_songs
    WHERE playlist_id = $1;
    `,
    [playlistId]
  );

  const nextPosition = positionResult.rows[0].next_position;

  const result = await pool.query(
    `
    INSERT INTO playlist_songs (playlist_id, song_id, position)
    VALUES ($1, $2, $3)
    ON CONFLICT (playlist_id, song_id) DO NOTHING
    RETURNING playlist_id, song_id, position;
    `,
    [playlistId, songId, nextPosition]
  );

  if (result.rows.length === 0){
    return {
        playlistid: Number(playlistId),
        song_id: Number(songId),
        alreadyExists: true,
    };
  }

  return result.rows[0];
}

export async function removeSongFromPlaylist(playlistId, songId) {
  const result = await pool.query(
    `
    DELETE FROM playlist_songs
    WHERE playlist_id = $1 AND song_id = $2
    RETURNING playlist_id, song_id;
    `,
    [playlistId, songId]
  );

  return result.rows[0];
}