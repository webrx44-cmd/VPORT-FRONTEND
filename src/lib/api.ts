// API helper with credentials and base URL handling for development and production

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

/**
 * Normalizes image URLs: handles relative /uploads/, external URLs, and Vite public assets.
 */
export function getFullImageUrl(url: string | undefined): string {
  if (!url) return "/VIGNESH_INFO.png";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return API_BASE_URL ? `${API_BASE_URL}${url}` : url;
  }
  // Standard public asset path e.g. /VIGNESH_INFO.png
  return url;
}

/**
 * Performs authenticated API requests with HttpOnly cookie support and JSON handling.
 */
export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;

  const res = await fetch(fullUrl, {
    ...options,
    credentials: "include", // Essential for HttpOnly session cookie handling
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || `Request failed with status ${res.status}`) as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }

  return data as T;
}
