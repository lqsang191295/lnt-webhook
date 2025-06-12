"use client"

import { useState, useEffect } from "react"

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString("vi-VN"))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [isClient])

  return (
    <div className="text-lg text-gray-600" suppressHydrationWarning>
      {isClient ? currentTime : ""}
    </div>
  )
} 