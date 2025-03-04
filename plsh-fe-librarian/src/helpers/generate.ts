import React from "react";

export function generateOpacityGradient(hexColor: string, steps: number): string[] {
    const hexMatch = hexColor.match(/^#?([a-fA-F0-9]{6})([a-fA-F0-9]{2})?$/);
    if (!hexMatch) {
        throw new Error("Invalid hex color format. Use #RRGGBB or #RRGGBBAA.");
    }
    const rgbPart = hexMatch[1];
    const minAlpha = 51; // 20% Opacity in hex
    const maxAlpha = 255; // 100% Opacity in hex
    const alphaStep = (maxAlpha - minAlpha) / (steps - 1);
    return Array.from({length: steps}, (_, i) => {
        const alphaValue = Math.round(maxAlpha - i * alphaStep);
        const alphaHex = alphaValue.toString(16).padStart(2, "0").toUpperCase();
        return `#${rgbPart}${alphaHex}`;
    });
}

