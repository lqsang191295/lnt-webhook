"use server";

import { get } from "@/api/client";

export const layDanhSachTemplate = async ({
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
  } catch (ex) {
    return ex;
  }
};
