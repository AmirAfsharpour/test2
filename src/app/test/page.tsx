"use client";
import { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function SimpleBarcodeTest() {
  const regionId = "qr-test-region";
  const scanner = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (scanner.current) return;

    scanner.current = new Html5QrcodeScanner(
      regionId,
      {
        fps: 10,
        qrbox: 250,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      },
      false
    );
    scanner.current.render(
      (text) => {
        alert("کد شناسایی شد: " + text);
        scanner.current?.clear();
      },
      (err) => {
        console.log("SCAN ERROR:", err);
      }
    );
    return () => { scanner.current?.clear(); };
  }, []);

  return <div id={regionId}></div>;
}
