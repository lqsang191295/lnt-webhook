export interface RequestOptions {
  token?: string; // Token để xác thực
  headers?: Record<string, unknown>; // Thêm header nếu cần
  params?: Record<string, unknown>; // Query params cho GET
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API || "";

/**
 * Hàm GET request
 */
export async function get(endpoint: string, options: RequestOptions = {}) {
  const { token, headers, params } = options;

  // Convert object params thành query string (nếu có)
  const queryString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  const res = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Error(`GET ${endpoint} failed: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Hàm POST request
 */
export async function post(
  endpoint: string,
  body: unknown,
  options: RequestOptions = {}
) {
  const { token, headers } = options;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${endpoint} failed: ${res.statusText}`);
  }

  return res.json();
}
