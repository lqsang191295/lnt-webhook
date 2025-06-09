export default function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-blue-800">Đang tải...</h2>
        <p className="text-gray-600 mt-2">Hệ thống màn hình chờ khám bệnh</p>
      </div>
    </div>
  )
} 