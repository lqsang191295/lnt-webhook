import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> } // chú ý params bây giờ là Promise
) {
  const { path: pathArr } = await context.params; // await để lấy dữ liệu thật

  try {
    const imagePath = pathArr.join(path.sep);

    const fullPath = path.join(
      "//172.16.0.18/dulieuchung/HIS Image/",
      imagePath
    );

    if (!fs.existsSync(fullPath)) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageBuffer = fs.readFileSync(fullPath);

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
