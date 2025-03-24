"use server";

import { get } from "@/api/client";

export const a_GetDataCronJobs = async () => {
  try {
    const response = await get(`/module/HT_CronJobs/all`);

    if (response.error) {
      return [];
    }

    return response.data;
  } catch {
    return [];
  }
};
