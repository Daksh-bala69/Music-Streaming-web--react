const API_BASE_URL = "http://localhost:5000";

export async function getAlbums() {
    const response = await fetch(API_BASE_URL + "/api/albums");
    return response.json();
};

export async function getAlbumById(id) {
    const response = await fetch(API_BASE_URL + `/api/albums/${id}`);
    return response.json();
}