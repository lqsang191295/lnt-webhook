'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { MoveDiagonal } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
              html5QrCodeRef.current?.stop().catch(() => {});
            },
            () => {}
          );
        }
      })
      .catch(console.error);

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, [hasPermission]);

  return (
    <div className="w-full h-full p-4 relative bg-black text-white overflow-hidden flex items-center justify-center">
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
        <div className="flex flex-col items-center gap-4 z-20">
          <div className="text-white text-lg">Bạn chưa cấp quyền camera</div>
          <Button variant="default" onClick={requestCameraAccess}>
            Yêu cầu quyền camera
          </Button>
        </div>
      )}
    </div>
  );
}
