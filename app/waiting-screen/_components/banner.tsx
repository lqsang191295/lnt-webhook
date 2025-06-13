import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import Image from "next/image"
import { memo } from "react"

interface BannerProps {
    bannerImage: string
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Banner = ({ bannerImage, handleImageChange }: BannerProps) => {

    return <div className="space-y-4">
        <Card className="relative overflow-hidden h-full w-full p-0">
            <CardContent className="p-0 h-full w-full">
                <div className="relative group cursor-pointer h-full w-full">
                    <Image
                        src={bannerImage || "/placeholder.svg"}
                        alt="Hospital Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Label htmlFor="banner-upload" className="cursor-pointer">
                            <div className="bg-white rounded-lg p-4 flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                <span>Thay đổi hình ảnh</span>
                            </div>
                        </Label>
                        <Input
                            id="banner-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
}

export default memo(Banner);