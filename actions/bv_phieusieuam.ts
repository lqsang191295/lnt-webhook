import { post } from "@/api/client";

export const getPhieuSieuAm = async (mabn: string, sovaovien: string) => {
  try {
    const url = `/his/phieusieuam/${mabn}/${sovaovien}`;
    const res = await post(url, {});

    if (res.error) {
      throw new Error("Có lỗi xảy ra");
    }

    return res;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};