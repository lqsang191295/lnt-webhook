import { post } from "@/api/client";

export const saveDeviceLogged = async (
  UserID: string,
  TokenDevice: string,
  Device: string
) => {
  try {
    const url = `/module/AD_UserLogged/add`;
    const res = await post(url, {
      UserID,
      TokenDevice,
      Device,
    });

    if (res.error) {
      throw new Error("Save device logged fail");
    }
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

export const setMainDevice = async (UserID: string, TokenDevice: string) => {
  try {
    const url = `/module/AD_UserLogged/set-main-device`;
    const res = await post(url, {
      UserID,
      TokenDevice,
    });

    if (res.error) {
      throw new Error("Save device logged fail");
    }
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

export const getLoggedDeviceById = async (
  UserID: string,
  TokenDevice: string
) => {
  try {
    const url = `/module/AD_UserLogged/get-by-id`;
    const res = await post(url, {
      UserID,
      TokenDevice,
    });

    console.log("res=----------------------- ", res);

    if (res.error) {
      throw new Error("Save device logged fail");
    }

    return res.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};
