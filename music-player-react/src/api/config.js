export const API_URL = "http://localhost:5000";

export function toFullUrl(url) {
  if (!url) return null;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_URL}${url.startsWith("/") ? url : `/${url}`}`;
}