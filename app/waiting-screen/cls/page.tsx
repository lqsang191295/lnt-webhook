"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ListRooms } from "@/constant/cls"

export default function PageCls() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {ListRooms.map((room) => (
        <Link key={room.code} href={`/waiting-screen/cls/${room.code}${room.roomId ? '/' + room.roomId : ''}`}>
          <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-center text-blue-800">
                {room.name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
