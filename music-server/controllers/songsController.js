import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadSongsFromDB } from "../data/songs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOADS THE METADATA OF THE SONGS IN THE ARRAY FORM THE DATABASE
const songs= await loadSongsFromDB();

// THIS IS FOR THE META DATA OF THE SONGS FOR NOW
export function getSongsController(req, res) {
  res.json(songs);
}

// THIS IS FOR THE METADATA OF THE SONG REQUESTED FOR ONW
export function getSongById(req, res) {
  const id = Number(req.params.id);

  const song = songs.find(song => song.id === id);

  if (!song) {
    return res.status(404).json({
      message: "Song not found"
    });
  }

  res.json(song);
}

//THIS IS FOR THE ACTUAL STREAMING OF THE AUDIO
export function streamSong(req,res){
  try{
    const id = parseInt(req.params.id);
    const song = songs.find((song) => song.id === id);

    //HANDLES IF THE SONG DOESNT EXIST 
    if(!song) {
      return res.status(404).json({message: "Error, Song not Found"})
    }

    const audioPath = path.join(__dirname,".." ,"songs", song.filename);

    // STATS OF THE AUDIO FILE
    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    //IF THE BROWSER DOESNT SET US THE RANGE OF THE AUDIO FILE IT WANTS 
    //IT SENDS THE WHOLE FILE
    if(!range){
      const stream = fs.createReadStream(audioPath);
      
      console.log("Sending the whole file")
      res.status(200).set({
        "content-length" : `${fileSize}`,
        "content-type" : "audio/flac"
      })

      stream.pipe(res);
      return ;
    }

    //SUPPOSE RANGE: bytes 100-200
    const parts = range.replace(/bytes=/, "").split("-");
    //PARTS = [100,200]
    const start = Number(parts[0]);
    const requestedEnd = parts[1]? Number(parts[1]) : fileSize - 1;
    const end = Math.min(requestedEnd, fileSize - 1);

    const chunkSize = end - start + 1;

    console.log(range);
    // PARTIALLY SENDING
    res.status(206).set({
      "content-type": "audio/flac",
      "content-range": `bytes ${start}-${end}/${fileSize}`,
      "content-length": chunkSize,
      "accept-ranges": "bytes"
    });

    const stream = fs.createReadStream(audioPath, {start,end});
    
    // PIPES THE STREAM TO THE RESPONSE
    stream.pipe(res);
  }
  catch(err){
    console.log("error:" , err);
    res.status(404).json({message: "error occured"});
  }
}