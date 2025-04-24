'use client';
import React, {memo, useState, useRef, useEffect, useMemo} from "react";

import {Button, LinearProgress, Typography, IconButton, Slider, Box} from '@mui/material';
import {CloudUpload, Audiotrack, PlayArrow, Pause} from '@mui/icons-material';
import {formatFileSize} from "@/helpers/text";
import {color} from "@/helpers/resources";
import {FaHeadphones} from "react-icons/fa6";
import {Resource} from "@/helpers/appType";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface IProps {
    children?: React.ReactNode;
    onAudioUpload?: (audio?: Resource) => void;
}

function AudioUpload(props: IProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileSize, setFileSize] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);
        setFileSize(formatFileSize(uploadedFile.size));
        setUploadProgress(0);
        props.onAudioUpload?.({
            name: uploadedFile.name,
            sizeByte: uploadedFile.size,
            type: "audio",
            fileType: uploadedFile.type,
            file: uploadedFile,
            localUrl: URL.createObjectURL(uploadedFile)
        });

        const url = URL.createObjectURL(uploadedFile);
        setAudioUrl(url);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 200);
    };

    // Xử lý Play/Pause
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const handleSeek = (_event: Event, newValue: number | number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newValue as number;
            setCurrentTime(newValue as number);
        }
    };
    const audio = useMemo(() => {
        if (audioUrl)
            return (<audio ref={audioRef} src={audioUrl}
                           onTimeUpdate={(e) => {
                               setCurrentTime(e.currentTarget.currentTime);
                           }}
                           onLoadedMetadata={(e) => {
                               setDuration(e.currentTarget.duration);
                           }}
            />)
        else return (<></>)
    }, [audioUrl, audioRef]);

    return (
        <Box sx={{width: 400, p: 2, border: '1px solid #ddd', borderRadius: 2}}>
            <input type="file" accept="audio/*" onChange={handleFileUpload} style={{display: 'none'}}
                   id="audio-upload"/>
            <label htmlFor="audio-upload">
                <NeumorphicButton variant="contained" component="span" startIcon={<CloudUpload/>}>
                    Upload Audio
                </NeumorphicButton>
            </label>

            {file && (
                <Box sx={{mt: 2}}>
                    <Typography variant="subtitle1" sx={{color: color.DARK_TEXT, gap: 2}}>
                        <FaHeadphones color={color.PRIMARY}/>
                        {file.name}
                    </Typography>
                    <Typography variant="body2" sx={{color: color.DARK_TEXT}}>
                        {fileSize}
                    </Typography>
                    <LinearProgress variant="determinate" value={uploadProgress} sx={{mt: 1, mb: 2}}/>

                    {uploadProgress === 100 && audioUrl && (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mt: 1}}>
                            <IconButton onClick={togglePlay} color="primary">
                                {isPlaying ? <Pause/> : <PlayArrow/>}
                            </IconButton>
                            <Slider
                                value={currentTime}
                                max={duration}
                                onChange={handleSeek}
                                sx={{flexGrow: 1}}
                            />
                            <Typography variant="body2">
                                {new Date(currentTime * 1000).toISOString().substr(14, 5)}
                                /
                                {new Date(duration * 1000).toISOString().substr(14, 5)}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}

            {audio}
        </Box>
    );
}


export default memo(AudioUpload);
