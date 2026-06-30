import { API_URL } from "./config";

export async function getAlbums() {
    const response = await fetch(API_URL + "/api/albums");
    return response.json();
};

export async function getAlbumById(id) {
    const response = await fetch(API_URL + `/api/albums/${id}`);
    return response.json();
}