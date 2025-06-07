import { Label } from "@/components/ui/label";
import {  EllipsisVertical, File } from "lucide-react";
import FilePreview from "./file-preview";

export default function FileItem() {
    return <div className="w-full h-full bg-gray-200 flex flex-col gap-1 rounded-md file-item-box cursor-pointer">
        <div className="file-item-box-content p-2 flex gap-2.5">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <File size={16} />
                    <Label>Image 111.png</Label>
                </div>
                <div>
                    <EllipsisVertical size={16} />
                </div>
            </div>
            <FilePreview />
        </div>
    </div>;
}
