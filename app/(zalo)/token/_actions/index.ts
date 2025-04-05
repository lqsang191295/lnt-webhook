"use server";

import { get, post } from "@/api/client";

export const getZaloToken = async () => {
  try {
    const url = "/module/HT_Thamso/zalo-token";

    const response = await get(url);

    if (response.error) {
      return;
    }

    return response.data;
  } catch {
    return;
  }
};

export const refreshToken = async (refresh_token: string) => {
  try {
    const url = "/webhook/refresh-token";

    const response = await post(url, {
      refresh_token,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getZaloDsTemplate = async ({
  access_token,
  offset,
  limit,
}: Record<string, unknown>) => {
  try {
    const url = "https://business.openapi.zalo.me/template/all";

    const response = await get(url, {
      headers: { access_token },
      params: {
        offset,
        limit,
      },
    });

    if (response.error) {
      return [];
    }

    return response.data;
  } catch {
    return [];
  }
};
