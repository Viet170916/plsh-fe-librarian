import React, {memo, useEffect, useRef} from "react";
import Webcam from "react-webcam";
import {BarcodeFormat, BrowserMultiFormatReader, DecodeHintType} from "@zxing/library";


const WebcamScanner = function WebcamScanner({onScanSuccess}: { onScanSuccess: (result: string) => void }) {
    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE]); // Chỉ quét ISBN (EAN-13)
        const codeReader = new BrowserMultiFormatReader(hints);
        const scan = async () => {
            if (!webcamRef.current?.video) return;
            try {
                const result = await codeReader.decodeFromVideoElement(webcamRef.current.video);
                onScanSuccess(result.getText()); // Lưu ISBN vào input
            } catch (err) {
            }
        };
        if (webcamRef.current?.video) {
            scan().then((result) => {
            });
        }
        return () => {
            codeReader.stopContinuousDecode();
            codeReader.stopAsyncDecode();
            codeReader.reset();
        };
    }, [webcamRef.current?.video, onScanSuccess]);

    return (<Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{facingMode: "environment"}}
        style={{width: "100%"}}
    />)
}

export default memo(WebcamScanner);
