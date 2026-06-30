import { API_URL } from "./config";

export async function searchMusic(query) {
    if (!query.trim()) {
        return {
            query: "",
            results: {
                songs: [],
                artists: [],
                albums: [],
                genres: [],
            },
        };
    }

    const result = await fetch(API_URL + `/api/search?q=${encodeURIComponent(query)}`);

    if(!result.ok){
        throw new Error("Search Failed");
    }

    return result.json();
}