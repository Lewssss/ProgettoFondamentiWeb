export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
export const API_BASE = process.env.REACT_APP_API_URL || "/api";

export function fileUrl(path) {
  if (!path || path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : "/" + path;
  if (!process.env.REACT_APP_API_URL) return p;
  return API_URL + p;
}

