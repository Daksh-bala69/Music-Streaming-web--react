import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// CONNECTING TO THE DATABASE
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
})

await db.connect();

// GETS THE SONGS FROM THE DATABASE
export async function loadSongsFromDB() {
  const response = await db.query(`
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

    // CONVERTS THE METADATA OF THE SONGS TO AN ARRAY
    const songs = response.rows.map((song) => ({
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
    }));

    //RETURNS THE ARRAY CONTAINING THE DATA OF THE SONGS;
    return songs;
}