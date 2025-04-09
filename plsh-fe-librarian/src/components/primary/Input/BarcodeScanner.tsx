"use client"


import React, {memo, useEffect, useRef} from 'react';

type BarcodeScannerProps = {
    onScanDone: (code?: string) => void,
}
const BarcodeScanner = ({onScanDone}: BarcodeScannerProps) => {
    const buffer = useRef<string>('');
    const lastTime = useRef<number>(0);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const MIN_BARCODE_LENGTH = 6;
        const MAX_INTERVAL = 30;

        const handleKeydown = (event: KeyboardEvent) => {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastTime.current;

            if (timeDiff > MAX_INTERVAL) {
                buffer.current = '';
            }

            if (event.key === 'Enter') {
                if (buffer.current.length >= MIN_BARCODE_LENGTH) {
                    onScanDone(buffer.current);
                }
                buffer.current = '';
                return;
            }

            if (event.key.length === 1) {
                buffer.current += event.key;
                lastTime.current = currentTime;
            }

            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                buffer.current = '';
            }, 1000);
        };

        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return <></>;
};


export default memo(BarcodeScanner);

