'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, User, MoreHorizontal, Image as ImageIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function QRZaloStyle() {
    const qrRegionId = 'qr-scanner';
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const checkPermission = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                setHasPermission(true);
            } catch {
                setHasPermission(false);
            }
        };
        checkPermission();
    }, []);

    useEffect(() => {
        if (hasPermission) {
            scannerRef.current = new Html5Qrcode(qrRegionId);
            Html5Qrcode.getCameras().then((devices) => {
                if (devices && devices.length) {
                    scannerRef.current?.start(
                        devices[0].id,
                        {
                            fps: 10,
                            qrbox: { width: 250, height: 250 },
                        },
                        (decodedText) => {
                            console.log('Decoded:', decodedText);
                        },
                        (errorMessage) => {
                            console.warn(errorMessage);
                        }
                    );
                }
            });
        }
        return () => {
            scannerRef.current?.stop().then(() => scannerRef.current?.clear());
        };
    }, [hasPermission]);

    if (hasPermission === false) {
        return (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                <Label className="mb-4">Bạn chưa cấp quyền truy cập camera để quét mã QR.</Label>
                <Button
                    onClick={async () => {
                        try {
                            await navigator.mediaDevices.getUserMedia({ video: true });
                            setHasPermission(true);
                        } catch {
                            alert('Không thể truy cập camera. Hãy kiểm tra trình duyệt hoặc thiết bị.');
                        }
                    }}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm cursor-pointer"
                >
                    Yêu cầu quyền truy cập camera
                </Button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden flex flex-col">
            <div id={qrRegionId} className="w-full h-full object-cover z-0 absolute" />

            {/* Top Buttons */}
            <div className="flex justify-between p-4 z-10 text-white">
                <Button className="bg-black/40 p-2 rounded-full"><Camera size={24} /></Button>
                <Button className="bg-black/40 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <User size={18} /> Mã QR của tôi
                </Button>
                <Button className="bg-black/40 p-2 rounded-full"><MoreHorizontal size={24} /></Button>
            </div>

            {/* Center Options */}
            <div className="flex-1 flex justify-center items-center">
                <div className="w-52 h-52 mx-auto rounded-xl relative">
                    {/* 4 góc viền */}
                    <div className="absolute w-5 h-5 border-t-2 border-l-2 border-white top-0 left-0" />
                    <div className="absolute w-5 h-5 border-t-2 border-r-2 border-white top-0 right-0" />
                    <div className="absolute w-5 h-5 border-b-2 border-l-2 border-white bottom-0 left-0" />
                    <div className="absolute w-5 h-5 border-b-2 border-r-2 border-white bottom-0 right-0" />
                    {/* Line scan animation */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-pulse z-10 animate-scan-line" />
                </div>
            </div>

            {/* Bottom Options */}
            <div className="p-4 text-sm text-center">
                <Label className="mb-2 text-xs opacity-80">Quét mọi mã QR</Label>
                <div className="flex justify-center gap-4 text-xs opacity-90">
                    <span className="font-semibold">VietQR</span>
                    <span className="font-semibold">website</span>
                    <span className="font-semibold">Zalo</span>
                </div>
                <div className="flex justify-around">
                    <Button className="flex flex-col items-center">
                        <ImageIcon size={28} />
                        <span className="mt-1 text-xs">Ảnh có sẵn</span>
                    </Button>

                    <Button className="flex flex-col items-center">
                        <Clock size={28} />
                        <span className="mt-1 text-xs">Gần đây</span>
                    </Button>
                </div>
            </div>

            {/* CSS animation */}
            <style jsx>{`
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scanLine 2s infinite linear;
        }
      `}</style>
        </div>
    );
}
