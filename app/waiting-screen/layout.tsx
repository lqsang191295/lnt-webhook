import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hệ thống Màn hình chờ khám bệnh',
  description: 'Hệ thống quản lý màn hình chờ khám bệnh đa phòng khám',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
