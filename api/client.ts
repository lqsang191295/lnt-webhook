"use server";

import { cookies } from "next/headers";

export interface RequestOptions {
  token?: string; // Token để xác thực
  headers?: Record<string, unknown>; // Thêm header nếu cần
  params?: Record<string, unknown>; // Query params cho GET
  credentials?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API || "";
/**
 * Hàm GET request
 */
export async function get(endpoint: string, options: RequestOptions = {}) {
  console.log('API_BASE_URL ==============', API_BASE_URL)

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  const { headers, params, credentials = true } = options;

  // Convert object params thành query string (nếu có)
  const queryString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  let URL = `${API_BASE_URL}${endpoint}${queryString}`;

  if (endpoint.includes("http")) URL = `${endpoint}${queryString}`;

  const res = await fetch(URL, {
    method: "GET",
    ...(credentials ? { credentials: "include" } : {}),
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
  const { headers, credentials = true } = options;
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  let URL = `${API_BASE_URL}${endpoint}`;

  if (endpoint.includes("http")) URL = `${endpoint}`;

  const res = await fetch(URL, {
    method: "POST",
    ...(credentials ? { credentials: "include" } : {}),
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



