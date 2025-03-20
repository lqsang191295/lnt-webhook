"use server";
import { cookies } from "next/headers";
import { encrypt } from "../_lib/session";
import { post } from "@/api/client";

export async function login(username: string, password: string) {
  try {
    const res = await post(
      `/auth/sign-in`,
      {
        username,
        password,
      },
      {
        credentials: "include",
      }
    );

    console.log("res === ", res);

    if (res.error) {
      throw new Error("Login failed");
    }

    console.log("res1111111 === ", res.data.jwt);
    // const session = await encrypt({ jwt: res.data.jwt });
    const cookieStore = await cookies();

    cookieStore.set("authToken", res.data.jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (ex) {
    throw ex;
  }
}
