"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen } from "lucide-react";

export function MedicalImageSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-200 h-24 p-4 rounded-t-lg">
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Thông Tin Bệnh Nhân Skeleton */}
      <Card className="mt-4 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2 text-gray-400">
            <FolderOpen className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hình Ảnh Y Tế Skeleton */}
      <Card className="mt-6 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2 text-gray-400">
            <FolderOpen className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="relative border rounded-lg overflow-hidden w-full h-64" />
              <div className="text-center mt-2 space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}