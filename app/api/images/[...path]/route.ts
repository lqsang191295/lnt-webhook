// app/api/images/[...path]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    console.log('imagePath --------- ')

    const imagePath = params.path.join(path.sep);

    // Đường dẫn đầy đủ tới file trên thư mục mạng
    const fullPath = path.join(
      '//172.16.0.18/dulieuchung/HIS Image/',
      imagePath
    );
console.log('fullPath --------- ', fullPath)
    // Kiểm tra xem file có tồn tại không
    if (!fs.existsSync(fullPath)) {
      return new NextResponse('Image not found', { status: 404 });
    }
console.log('fullPath --------- 111111',)
    // Đọc file dưới dạng buffer
    const imageBuffer = fs.readFileSync(fullPath);

    // Trả về file ảnh với đúng Content-Type
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg', // Thay đổi loại tệp phù hợp
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}