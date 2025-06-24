'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { MoveDiagonal, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import '../../styles/scanner-animations.css'

export default function QRZaloStyle() {
    const qrRegionId = 'qr-scanner-region';
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [result, setResult] = useState('');

    const requestCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((track) => track.stop());
            setHasPermission(true);
        } catch {
            setHasPermission(false);
        }
    };

    useEffect(() => {
        navigator.permissions
            ?.query({ name: 'camera' as PermissionName })
            .then((res) => {
                if (res.state === 'granted') setHasPermission(true);
                else setHasPermission(false);

                res.onchange = () => {
                    if (res.state === 'granted') setHasPermission(true);
                    else setHasPermission(false);
                };
            })
            .catch(() => setHasPermission(null));
    }, []);

    useEffect(() => {
        if (hasPermission !== true) return;

        const config = {
            fps: 10,
            qrbox: { width: 240, height: 240 },
        };

        html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
        Html5Qrcode.getCameras()
            .then((devices) => {
                if (devices.length) {
                    html5QrCodeRef.current?.start(
                        devices[0].id,
                        config,
                        (decodedText) => {
                            setResult(decodedText);
                            html5QrCodeRef.current?.stop().catch(() => { });
                        },
                        () => { }
                    );
                }
            })
            .catch(console.error);

        return () => {
            html5QrCodeRef.current?.stop().catch(() => { });
        };
    }, [hasPermission]);

    return (
        <div className="w-full h-full p-4 relative text-white overflow-hidden flex items-center justify-center">
            {hasPermission === true ? (
                <>
                    {/* Camera */}
                    <div id={qrRegionId} className="absolute inset-0 z-0" />

                    {/* Mask tối */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-[calc(50%-120px)] bg-black/60" />
                        <div className="absolute bottom-0 left-0 w-full h-[calc(50%-120px)] bg-black/60" />
                        <div className="absolute top-[calc(50%-120px)] bottom-[calc(50%-120px)] left-0 w-[calc(50%-120px)] bg-black/60" />
                        <div className="absolute top-[calc(50%-120px)] bottom-[calc(50%-120px)] right-0 w-[calc(50%-120px)] bg-black/60" />
                    </div>

                    {/* Vùng quét */}
                    <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 border-2 border-green-400 z-20">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-scan-line" />
                        <MoveDiagonal className="absolute top-0 left-0 w-5 h-5 text-green-400" />
                        <MoveDiagonal className="absolute top-0 right-0 w-5 h-5 text-green-400 rotate-90" />
                        <MoveDiagonal className="absolute bottom-0 right-0 w-5 h-5 text-green-400 rotate-180" />
                        <MoveDiagonal className="absolute bottom-0 left-0 w-5 h-5 text-green-400 -rotate-90" />
                    </div>

                    {/* Kết quả */}
                    {result && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-green-300 px-4 py-2 rounded z-30 text-center text-sm max-w-xs">
                            ✅ Kết quả: {result}
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-screen flex items-center justify-center">
                    <Card className="w-full max-w-sm p-6 rounded-2xl text-center space-y-2 relative gap-0">
                        <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                            <QrCode />
                        </div>

                        <h2 className="text-lg font-semibold">Turn on 2-Step Verification</h2>
                        <p className="text-sm text-gray-500">Scan the QR code with your authenticator app.</p>

                        {/* Camera + scan-line */}
                        <div className='relative w-full h-60 overflow-hidden mt-8 flex justify-center items-center'>
                            <div className="p-2 flex justify-center items-center rounded-lg border-1 border-gray-100">
                                <Image src={"/imgs/qr-code.png"} width={192} height={192} alt="qr-code" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-70 animate-scan-line z-10" />
                        </div>

                        <Button className="w-full mt-8 cursor-pointer bg-blue-500 hover:bg-blue-600" onClick={requestCameraAccess}>
                            Cho phép truy cập camera
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
}
