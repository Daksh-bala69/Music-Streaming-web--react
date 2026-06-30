import { API_URL } from "./config";

export async function getRandomSongsFromSameGenre(songId, limit = 10) {
    const response = await fetch(API_URL + `/api/genres/songs/${songId}/random?limit=${limit}`);

    if(!response.ok){
        throw new Error("Error fetching songs for your queue");
    }

    return response.json();
}