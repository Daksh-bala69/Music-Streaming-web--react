import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const ALBUMS_ROOT = "/home/Admiral_D/Music/Albums";

const INPUT_SQL = "./scripts/import_music.sql";
const OUTPUT_SQL = "./scripts/import_music_with_durations.sql";

function getDurationSeconds(filePath) {
  const output = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      filePath,
    ],
    { encoding: "utf8" }
  );

  return Math.round(Number(output.trim()));
}

function splitSqlValues(row) {
  const values = [];
  let current = "";
  let insideString = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === "'" && insideString && nextChar === "'") {
      current += "''";
      i++;
      continue;
    }

    if (char === "'") {
      insideString = !insideString;
      current += char;
      continue;
    }

    if (char === "," && !insideString) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function unquoteSqlString(value) {
  if (value === "NULL") return null;

  return value
    .slice(1, -1)
    .replaceAll("''", "'");
}

function quoteSqlString(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

let sql = fs.readFileSync(INPUT_SQL, "utf8");

let replacedCount = 0;

sql = sql.replace(/\(([^()]*?\.flac'[^()]*)\)/g, (fullMatch, rowContent) => {
  const values = splitSqlValues(rowContent);

  if (values.length !== 10) {
    return fullMatch;
  }

  const albumFolder = unquoteSqlString(values[6]);
  const audioFilename = unquoteSqlString(values[7]);

  if (!albumFolder || !audioFilename) {
    return fullMatch;
  }

  const fullAudioPath = path.join(ALBUMS_ROOT, albumFolder, audioFilename);

  if (!fs.existsSync(fullAudioPath)) {
    console.log(`Missing file: ${fullAudioPath}`);
    return fullMatch;
  }

  const durationSeconds = getDurationSeconds(fullAudioPath);

  values[9] = String(durationSeconds);
  replacedCount++;

  return `(${values.join(", ")})`;
});

fs.writeFileSync(OUTPUT_SQL, sql);

console.log(`Updated ${replacedCount} song durations.`);
console.log(`Created: ${OUTPUT_SQL}`);