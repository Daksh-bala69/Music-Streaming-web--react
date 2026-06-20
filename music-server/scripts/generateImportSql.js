import fs from "fs";
import path from "path";

const ALBUMS_ROOT = "/home/Admiral_D/Music/Albums";
const OUTPUT_FILE = "./scripts/import_music.sql";

const albumInfo = {
  "2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]": {
    albumTitle: "Late Registration",
    artist: "Kanye West",
    year: 2005,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "2007 - Graduation": {
    albumTitle: "Graduation",
    artist: "Kanye West",
    year: 2007,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]": {
    albumTitle: "My Beautiful Dark Twisted Fantasy",
    artist: "Kanye West",
    year: 2010,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "2015 - Currents": {
    albumTitle: "Currents",
    artist: "Tame Impala",
    year: 2015,
    genre: "Psychedelic Rock",
    cover: "cover.jpg",
  },
  "2022 - Minutes to Midnight": {
    albumTitle: "Minutes to Midnight",
    artist: "Linkin Park",
    year: 2007,
    genre: "Alternative Rock",
    cover: "cover.jpg",
  },
  "Meteora (2003)": {
    albumTitle: "Meteora",
    artist: "Linkin Park",
    year: 2003,
    genre: "Nu Metal",
    cover: "cover.jpg",
  },
  "Mezzanine": {
    albumTitle: "Mezzanine",
    artist: "Massive Attack",
    year: 1998,
    genre: "Trip-Hop",
    cover: "cover.jpg",
  },
  "Nevermind": {
    albumTitle: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    genre: "Grunge",
    cover: "cover.jpg",
  },
  "Rodeo": {
    albumTitle: "Rodeo",
    artist: "Travis Scott",
    year: 2015,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "The College Dropout": {
    albumTitle: "The College Dropout",
    artist: "Kanye West",
    year: 2004,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "The End Is Where We Begin": {
    albumTitle: "The End Is Where We Begin",
    artist: "Thousand Foot Krutch",
    year: 2012,
    genre: "Alternative Rock",
    cover: "cover.jpg",
  },
  "To Pimp a Butterfly (2015)": {
    albumTitle: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "Transmissions": {
    albumTitle: "Transmissions",
    artist: "Starset",
    year: 2014,
    genre: "Alternative Rock",
    cover: "cover.jpg",
  },
  "Travis Scott - Astroworld (2018) [WEB FLAC]": {
    albumTitle: "Astroworld",
    artist: "Travis Scott",
    year: 2018,
    genre: "Hip-Hop",
    cover: "cover.jpg",
  },
  "Have a Nice Life - Deathconciousness": {
    albumTitle: "Deathconsciousness",
    artist: "Have a Nice Life",
    year: 2008,
    genre: "Shoegaze",
    cover: "cover.jpg",
  },
};

function sql(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function getTrackNumber(filename) {
  const match = filename.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

function cleanSongTitle(filename) {
  let title = filename.replace(/\.[^.]+$/, "");

  title = title.replace(/^Linkin Park - Meteora - /, "");
  title = title.replace(/^\d+\s*[-.]?\s*/, "");

  return title.trim();
}

const rows = [];

for (const folder of fs.readdirSync(ALBUMS_ROOT)) {
  const folderPath = path.join(ALBUMS_ROOT, folder);

  if (!fs.statSync(folderPath).isDirectory()) continue;
  if (!albumInfo[folder]) {
    console.log(`Skipping unknown album folder: ${folder}`);
    continue;
  }

  const info = albumInfo[folder];

  const audioFiles = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(flac|mp3|wav|m4a)$/i.test(file))
    .sort();

  for (const audioFile of audioFiles) {
    rows.push({
      trackNumber: getTrackNumber(audioFile),
      songTitle: cleanSongTitle(audioFile),
      artistName: info.artist,
      albumTitle: info.albumTitle,
      releaseYear: info.year,
      genreName: info.genre,
      albumFolder: folder,
      audioFilename: audioFile,
      coverFilename: info.cover,
      durationSeconds: null,
    });
  }
}

const valuesSql = rows
  .map((row) => {
    return `    (${[
      row.trackNumber ?? "NULL",
      sql(row.songTitle),
      sql(row.artistName),
      sql(row.albumTitle),
      row.releaseYear ?? "NULL",
      sql(row.genreName),
      sql(row.albumFolder),
      sql(row.audioFilename),
      sql(row.coverFilename),
      "NULL",
    ].join(", ")})`;
  })
  .join(",\n");

const finalSql = `BEGIN;

WITH import_data (
  track_number,
  song_title,
  artist_name,
  album_title,
  release_year,
  genre_name,
  album_folder,
  audio_filename,
  cover_filename,
  duration_seconds
) AS (
  VALUES
${valuesSql}
),

all_artists AS (
  INSERT INTO artists (name)
  SELECT DISTINCT artist_name
  FROM import_data
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id, name
),

all_genres AS (
  INSERT INTO genres (name)
  SELECT DISTINCT genre_name
  FROM import_data
  WHERE genre_name IS NOT NULL AND genre_name <> ''
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id, name
),

all_albums AS (
  INSERT INTO albums (
    artist_id,
    title,
    cover_filename,
    release_year,
    folder_name
  )
  SELECT DISTINCT
    ar.id,
    d.album_title,
    CASE 
      WHEN d.cover_filename IS NULL THEN NULL
      ELSE d.album_folder || '/' || d.cover_filename
    END,
    d.release_year,
    d.album_folder
  FROM import_data d
  JOIN all_artists ar ON ar.name = d.artist_name
  ON CONFLICT (artist_id, title)
  DO UPDATE SET
    cover_filename = EXCLUDED.cover_filename,
    release_year = EXCLUDED.release_year,
    folder_name = EXCLUDED.folder_name
  RETURNING id, artist_id, title
),

all_songs AS (
  INSERT INTO songs (
    title,
    album_id,
    filename,
    cover_filename,
    duration_seconds,
    file_path,
    track_number
  )
  SELECT
    d.song_title,
    al.id,
    d.audio_filename,
    CASE 
      WHEN d.cover_filename IS NULL THEN NULL
      ELSE d.album_folder || '/' || d.cover_filename
    END,
    d.duration_seconds,
    d.album_folder || '/' || d.audio_filename,
    d.track_number
  FROM import_data d
  JOIN all_artists ar ON ar.name = d.artist_name
  JOIN all_albums al
    ON al.title = d.album_title
   AND al.artist_id = ar.id
  ON CONFLICT (file_path)
  DO UPDATE SET
    title = EXCLUDED.title,
    album_id = EXCLUDED.album_id,
    filename = EXCLUDED.filename,
    cover_filename = EXCLUDED.cover_filename,
    duration_seconds = EXCLUDED.duration_seconds,
    track_number = EXCLUDED.track_number
  RETURNING id, file_path
),

linked_artists AS (
  INSERT INTO song_artists (song_id, artist_id)
  SELECT
    s.id,
    ar.id
  FROM import_data d
  JOIN all_songs s
    ON s.file_path = d.album_folder || '/' || d.audio_filename
  JOIN all_artists ar
    ON ar.name = d.artist_name
  ON CONFLICT (song_id, artist_id) DO NOTHING
  RETURNING song_id
)

INSERT INTO song_genres (song_id, genre_id)
SELECT
  s.id,
  g.id
FROM import_data d
JOIN all_songs s
  ON s.file_path = d.album_folder || '/' || d.audio_filename
JOIN all_genres g
  ON g.name = d.genre_name
WHERE d.genre_name IS NOT NULL AND d.genre_name <> ''
ON CONFLICT (song_id, genre_id) DO NOTHING;

COMMIT;
`;

fs.writeFileSync(OUTPUT_FILE, finalSql);

console.log(`Generated ${rows.length} songs`);
console.log(`SQL file created at ${OUTPUT_FILE}`);