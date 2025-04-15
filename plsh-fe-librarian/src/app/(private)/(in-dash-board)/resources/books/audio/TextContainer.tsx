"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

const TEXT = `This is a sample text to demonstrate audiobook reading. Each sentence will be highlighted when spoken aloud by the Google Cloud Text-to-Speech engine. Enjoy your listening experience!`;

const splitTextIntoSentences = (text: string) => {
    return text.match(/[^.!?]+[.!?]+/g) || [text];
};

export default function AudiobookReader() {
    const [sentences, setSentences] = useState<string[]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [rate, setRate] = useState(1);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        setSentences(splitTextIntoSentences(TEXT));
    }, []);

    useEffect(() => {
        if (!isPlaying || current >= sentences.length) return;

        const fetchAudio = async () => {
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();
            const sentence = sentences[current];
            const res = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: sentence, rate }),
                signal: controllerRef.current.signal,
            });
            if (!res.ok) return;
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            if (audioRef.current) audioRef.current.src = url;
            else audioRef.current = new Audio(url);

            audioRef.current.onended = () => {
                setTimeout(() => {
                    setCurrent((prev) => {
                        if (prev < sentences.length - 1) return prev + 1;
                        setIsPlaying(false);
                        return prev;
                    });
                }, 100);
            };
            audioRef.current.play().then();
        };

        fetchAudio().then();
    }, [current, isPlaying, rate, sentences]);

    const handlePlayPause = () => {
        if (!audioRef.current) {
            setIsPlaying(true);
        } else {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSkip = (direction: "forward" | "backward") => {
        audioRef.current?.pause();
        if (direction === "forward") {
            setCurrent((prev) => Math.min(prev + 1, sentences.length - 1));
        } else {
            setCurrent((prev) => Math.max(prev - 1, 0));
        }
        setIsPlaying(true);
    };

    const handleRateChange = (_: Event, value: number | number[]) => {
        setRate(typeof value === "number" ? value : value[0]);
    };

    return (
        <Box p={4}>
            <Stack spacing={2}>
                <Typography variant="h4">Audiobook Reader</Typography>

                <Box>
                    {sentences.map((s, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: idx === current ? 1 : 0.3 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: "inline", marginRight: 6 }}
                        >
                            {s}
                        </motion.span>
                    ))}
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Button variant="outlined" onClick={() => handleSkip("backward")}>⏮ Back</Button>
                    <Button variant="contained" onClick={handlePlayPause}>
                        {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button variant="outlined" onClick={() => handleSkip("forward")}>Next ⏭</Button>
                </Stack>

                <Box>
                    <Typography gutterBottom>Speed: {rate.toFixed(1)}x</Typography>
                    <Slider
                        value={rate}
                        min={0.5}
                        max={2}
                        step={0.1}
                        onChange={handleRateChange}
                        valueLabelDisplay="auto"
                    />
                </Box>

                <Typography variant="caption" color="gray">
                    * Currently using Google Cloud Text-to-Speech via custom API route.
                </Typography>
            </Stack>
        </Box>
    );
}
