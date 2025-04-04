import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các route cần kiểm tra login
const protectedRoutes = [
  "/",
  "/dashboard",
  "/token",
  // "*",
];

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("authToken")?.value;

    if (protectedRoutes.includes(pathname)) {
      if (!session) {
        console.log("No session found. Redirecting to /login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const payload = session;

      if (!payload) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("authToken"); // Xoá token hỏng
        return response;
      }
    }

    return NextResponse.next(); // Tiếp tục nếu hợp lệ
  } catch (ex) {
    console.log(ex);
  }
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: "/:path*",
};
