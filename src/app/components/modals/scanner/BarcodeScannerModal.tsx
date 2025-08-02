import QrBarcodeScanner from "react-qr-barcode-scanner";

interface BarcodeScannerModalProps {
  onClose: () => void;
  onDetected: (code: string) => void;
}
export default function BarcodeScannerModal({ onClose, onDetected }: BarcodeScannerModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-4 rounded-xl relative shadow-xl">
        <button className="absolute top-2 left-2 text-red-500" onClick={onClose}>
          بستن
        </button>
        <div style={{ width: 300 }}>
          <QrBarcodeScanner
            onUpdate={(err, result) => {
              if (result) {
                onDetected(result.getText());
                onClose();
              }
            }}
            facingMode="environment"
          />
        </div>
      </div>
    </div>
  );
}
// components/BarcodeScannerModal.tsx
/* "use client";
import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

interface Props {
  onDetected: (code: string) => void;
  onClose: () => void;
}

export default function BarcodeScannerModal({ onDetected, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    let active = true;
    if (!videoRef.current) return;

    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromVideoDevice(
        undefined, // خودکار بهترین دوربین
        videoRef.current,
        (result, err, controls) => {
          if (!active) return;
          // ذخیره کنترل stop در ref
          controlsRef.current = controls;
          if (result) {
            onDetected(result.getText());
            controls.stop(); // اسکنر رو متوقف کن
            onClose();
          }
        }
      )
      .catch((e) => {
        alert("خطا در دسترسی به دوربین یا خواندن بارکد:\n" + e.message);
        onClose();
      });

    return () => {
      active = false;
      // اگر کنترل موجود بود، اسکنر رو متوقف کن
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9999]">
      <div className="bg-white p-4 rounded-xl relative shadow-xl w-[320px] flex flex-col items-center">
        <button
          className="absolute top-2 left-2 text-red-500 font-bold"
          onClick={() => {
            if (controlsRef.current) controlsRef.current.stop();
            onClose();
          }}
        >
          بستن
        </button>
        <video
          ref={videoRef}
          className="w-full h-56 rounded-md bg-black"
          autoPlay
          muted
        />
        <div className="text-xs text-gray-700 mt-2">بارکد را در قاب قرار دهید</div>
      </div>
    </div>
  );
}

 */

