"use server";

import { get, post } from "@/api/client";
import { TypeJob } from "../_types";

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

export const a_CreateCronJob = async (model: TypeJob) => {
  const result = await post("/module/HT_CronJobs/add", {
    ...model,
  });

  return result;
};

export const a_UpdateCronJob = async (model: TypeJob) => {
  const result = await post("/module/HT_CronJobs/update", {
    ...model,
  });

  return result;
};
