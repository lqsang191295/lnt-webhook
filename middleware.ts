import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các route cần kiểm tra login
const protectedRoutes = [
  // "/", "/dashboard", "/token"
  '*'
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Lấy token từ cookie

  const { pathname } = request.nextUrl;

  // Nếu truy cập vào route cần login mà không có token, chuyển hướng đến trang login
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Tiếp tục nếu hợp lệ
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: "/:path*",
};
