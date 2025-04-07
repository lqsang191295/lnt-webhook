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

export async function login(username: string, password: string) {
  try {
    const url = `/auth/sign-in`;
    const res = await post(
      url,
      {
        username,
        password,
      },
      {
        credentials: false,
      }
    );

    if (res.error) {
      throw new Error("Login failed");
    }

    if (res.data.waitAcceptDevice) {
      return res.data;
    }

    await setCookieToken(res.data.jwt);
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
