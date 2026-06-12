const API_BASE_URL = "http://localhost:5000";

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

    const result = await fetch(API_BASE_URL + `/api/search?q=${encodeURIComponent(query)}`);

    if(!result.ok){
        throw new Error("Search Failed");
    }

    return result.json();
}