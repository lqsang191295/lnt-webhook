"use server";
import { cookies } from "next/headers";
import { post } from "@/api/client";
import { jwtVerify } from "jose"; // để xác thực JWT
import { NextResponse } from "next/server";

export async function logout() {
  try {
    const url = `/auth/log-out`;
    const res = await post(url, {});

    if (res.error) {
      throw new Error("Logout failed");
    }

    const cookieStore = await cookies();

    cookieStore.delete("authToken");
  } catch (ex) {
    throw ex;
  }
}

export async function login(
  username: string,
  password: string,
  deviceToken: string
) {
  try {
    const url = `/auth/sign-in`;
    const res = await post(
      url,
      {
        username,
        password,
        deviceToken,
      },
      {
        credentials: false,
      }
    );

    console.log("res ==== ", res);

    if (res.error) {
      throw new Error("Login failed");
    }

    if (!res.data.waitAcceptDevice) {
      await setCookieToken(res.data.jwt);
    }

    return res.data;
  } catch (ex) {
    throw ex;
  }
}

export const setCookieToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("authToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const getCookieToken = async (key: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(key);
};

export async function verifyUser() {
  // Lấy token từ cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    // Trả về lỗi nếu không có token
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    );
  }

  try {
    // Xác thực JWT
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    // Trả về user thông qua payload
    return payload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    // Redirect nếu JWT không hợp lệ
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    );
  }
}

export const approveDevice = async (
  username: string,
  token: string,
  deviceToken: string
) => {
  try {
    const url = `/auth/approve-device`;
    const res = await post(url, {
      username,
      token,
      deviceToken,
    });

    console.log("res=----------------------- ", res);

    if (res.error) {
      throw new Error("Approve device fail");
    }

    return res.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

export const rejectDevice = async (
  username: string,
  token: string,
  deviceToken: string
) => {
  try {
    const url = `/auth/reject-device`;
    const res = await post(url, {
      username,
      token,
      deviceToken,
    });

    console.log("res=----------------------- ", res);

    if (res.error) {
      throw new Error("Reject device fail");
    }

    return res.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};
