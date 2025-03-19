"use client";

import React, {memo, useState, useRef} from "react";
import {Button, TextField, Paper, Select, MenuItem, Slider} from "@mui/material";

interface IProps {
    page?: number;
}

const BookPage: React.FC<IProps> = () => {
    const [text, setText] = useState<string>("");
    const [audioUrl, setAudioUrl] = useState<string>("");
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [voice, setVoice] = useState<string>("vi-VN-Wavenet-A");
    const [speed, setSpeed] = useState<number>(1.0);
    const words: string[] = text.split(" ");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const speakText = async () => {
        const response = await fetch(
            "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyAHcIVuLdQBxrbf1pa-rQVcqBmFPY7j25E",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    input: {text},
                    voice: {languageCode: "vi-VN", ssmlGender: voice.includes("A") ? "MALE" : "FEMALE", name: voice},
                    audioConfig: {audioEncoding: "mp3", speakingRate: speed},
                }),
            }
        );

        const data = await response.json();
        if (data.audioContent) {
            const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
            setAudioUrl(audioSrc);
            const audio = new Audio(audioSrc);
            audioRef.current = audio;

            audio.addEventListener("timeupdate", () => {
                if (audio.duration > 0) {
                    const progress = audio.currentTime / audio.duration;
                    setHighlightIndex(Math.floor(progress * words.length));
                }
            });

            audio.play();
        }
    };

    const handlePlay = () => {
        if (audioRef.current) audioRef.current.play();
    };

    const handlePause = () => {
        if (audioRef.current) audioRef.current.pause();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                fullWidth
                rows={4}
                className="mb-4"
            />

            <div className="flex gap-4 mb-4">
                <Select value={voice} onChange={(e) => setVoice(e.target.value as string)}>
                    <MenuItem value="vi-VN-Wavenet-A">Nữ</MenuItem>
                    <MenuItem value="vi-VN-Wavenet-B">Nam</MenuItem>
                </Select>
                <div className="flex flex-col">
                    <label>Tốc độ: {speed.toFixed(1)}</label>
                    <Slider value={speed} min={0.5} max={2.0} step={0.1}
                            onChange={(e, val) => setSpeed(val as number)}/>
                </div>
            </div>

            <Button variant="contained" color="primary" onClick={speakText}>Đọc</Button>
            <div className="flex gap-2 mt-2">
                <Button variant="outlined" onClick={handlePlay}>▶ Start</Button>
                <Button variant="outlined" onClick={handlePause}>⏸ Pause</Button>
            </div>

            <Paper elevation={3} className="p-4 mt-4 w-full">
                {words.map((word, index) => (
                    <span
                        key={index}
                        style={{
                            backgroundColor: index === highlightIndex ? "yellow" : "transparent",
                            transition: "background-color 0.2s"
                        }}>
                        {`${word} `}
                    </span>
                ))}
            </Paper>
            {audioUrl && <audio controls src={audioUrl} className="mt-4" ref={audioRef}/>}
        </div>
    );
}

export default memo(BookPage);
