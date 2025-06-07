import { Label } from "@/components/ui/label";
import { File } from "lucide-react";
import Image from "next/image";

export default function FilePreview() {
    const preview = () => {
        const file = 'image'
        if (file === 'image') {
            return <div
                className="bg-no-repeat bg-cover bg-center w-full h-full"
                style={{
                    backgroundImage: 'url("/_next/image?url=%2Fimgs%2Flogo.png&w=3840&q=75")'
                }}
            ></div>;
        }
    }


    return <div className="w-full h-full ">
        {preview()}
    </div>;
}
