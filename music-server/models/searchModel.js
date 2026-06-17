import pool from "../db/pool.js";

//FETCHES THE SONGS, GENRES, ARTIST, ALBUMS OF THE QUERY YOU TYPE
export async function searchAll(query) {
  const searchTerm = `%${query}%`;

  const songs = await searchSongs(searchTerm);
  const artists = await searchArtists(searchTerm);
  const albums = await searchAlbums(searchTerm);
  const genres = await searchGenres(searchTerm);

  return {
    query,
    results: {
      songs,
      artists,
      albums,
      genres,
    },
  };
}

// SENDS THE SONGS SIMILAR TO THE SEARCH QUERY
async function searchSongs(searchTerm) {
/*
    FINDS 20 SONGS MATHCHING THE QUERY:
        1)PROVIDES THE SONGS FROM THE ALBUM (IF ALBUM NAME IS SENT AS THE QUERY) 
        2)PROVIDES THE SONGD FROM A GENRE (IF THE GENRE IS SENDT AS THE QUERY)
        3)PROVIDES THE SONGD FROM A ARTIST (IF THE ARTIST IS SENDT AS THE QUERY)
*/

  const result = await pool.query(
    `
    SELECT
      s.id,
      s.title,
      s.filename,
      s.duration_seconds,
      '/api/songs/' || s.id || '/stream' AS audio,

      CASE
        WHEN s.cover_filename IS NOT NULL THEN '/covers/' || s.cover_filename
        ELSE NULL
      END AS cover,

      CASE 
        WHEN al.id IS NOT NULL THEN json_build_object(
          'id', al.id,
          'title', al.title,
          'cover', CASE
            WHEN al.cover_filename IS NOT NULL THEN '/covers/' || al.cover_filename
            ELSE NULL
          END,
          'release_year', al.release_year
        )
        ELSE NULL
      END AS album,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', ar.id,
            'name', ar.name
          )
        ) FILTER (WHERE ar.id IS NOT NULL),
        '[]'
      ) AS artists,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', g.id,
            'name', g.name
          )
        ) FILTER (WHERE g.id IS NOT NULL),
        '[]'
      ) AS genres

    FROM songs s

    LEFT JOIN albums al
      ON s.album_id = al.id

    LEFT JOIN song_artists sa
      ON s.id = sa.song_id

    LEFT JOIN artists ar
      ON sa.artist_id = ar.id

    LEFT JOIN song_genres sg
      ON s.id = sg.song_id

    LEFT JOIN genres g
      ON sg.genre_id = g.id

    WHERE
      s.title ILIKE $1
      OR ar.name ILIKE $1
      OR al.title ILIKE $1
      OR g.name ILIKE $1

    GROUP BY
      s.id,
      al.id

    ORDER BY s.title ASC

    LIMIT 20;
    `,
    [searchTerm]
  );

  return result.rows;
}

//SENDS THE ARTISTS CORRESPONDING TO THE QUERY
async function searchArtists(searchTerm) {
  const result = await pool.query(
    `
    SELECT
      ar.id,
      ar.name,
      COUNT(DISTINCT sa.song_id) AS song_count
    FROM artists ar

    LEFT JOIN song_artists sa
      ON ar.id = sa.artist_id

    WHERE ar.name ILIKE $1

    GROUP BY ar.id

    ORDER BY ar.name ASC

    LIMIT 10;
    `,
    [searchTerm]
  );

  return result.rows;
}

// FINDS THE ALBUMS CORRESPONDING TO THE QUERY
async function searchAlbums(searchTerm) {
  const result = await pool.query(
    `
    SELECT
      al.id,
      al.title,
      al.release_year,
      CASE
        WHEN al.cover_filename IS NOT NULL THEN '/covers/' || al.cover_filename
        ELSE NULL
      END AS cover,
      COUNT(DISTINCT s.id) AS song_count,

      CASE
        WHEN main_artist.id IS NOT NULL THEN json_build_object(
          'id', main_artist.id,
          'name', main_artist.name
        )
        ELSE NULL
      END AS artist,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', song_artist.id,
            'name', song_artist.name
          )
        ) FILTER (WHERE song_artist.id IS NOT NULL),
        '[]'
      ) AS song_artists

    FROM albums al

    LEFT JOIN artists main_artist
      ON al.artist_id = main_artist.id

    LEFT JOIN songs s
      ON al.id = s.album_id

    LEFT JOIN song_artists sa
      ON s.id = sa.song_id

    LEFT JOIN artists song_artist
      ON sa.artist_id = song_artist.id

    WHERE
      al.title ILIKE $1
      OR main_artist.name ILIKE $1

    GROUP BY
      al.id,
      main_artist.id

    ORDER BY al.title ASC

    LIMIT 10;
    `,
    [searchTerm]
  );

  return result.rows;
}

// FINDS THE GENRES CORRESPONDING TO THE QUERY (AND THE NUMBER OF SONGS IT FONUD OF THAT GENRE)
async function searchGenres(searchTerm) {
  const result = await pool.query(
    `
    SELECT
      g.id,
      g.name,
      COUNT(DISTINCT sg.song_id) AS song_count
    FROM genres g

    LEFT JOIN song_genres sg
      ON g.id = sg.genre_id

    WHERE g.name ILIKE $1

    GROUP BY g.id

    ORDER BY g.name ASC

    LIMIT 10;
    `,
    [searchTerm]
  );

  return result.rows;
}