import { get, post } from "@/api/client";

export const getNotifications = async () => {
  try {
    const url = `/module/HT_Thongbao/all`;
    const res = await get(url);

    if (res.error) {
      throw new Error("Có lỗi xảy ra");
    }

    return res;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

export const readNotifications = async (id: number) => {
  try {
    const url = `/module/HT_Thongbao/read`;
    const res = await post(url, {
      id,
    });

    if (res.error) {
      throw new Error("Có lỗi xảy ra");
    }

    return res;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};
