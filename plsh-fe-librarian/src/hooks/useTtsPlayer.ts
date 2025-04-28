import {useCallback, useEffect, useRef, useState} from "react";

export interface Alignment {
    word: string;
    start: number;
    end: number;
}

interface UseAudioHighlighterProps {
    base64Audio: string;
    alignment: Alignment[];
    onEnd?: () => void;
}

export function useAudioHighlighter({base64Audio, alignment, onEnd}: UseAudioHighlighterProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isRead, setIsRead] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [playbackRate, setPlaybackRate] = useState<number>(1);

    // Only create audio when base64Audio changes
    useEffect(() => {
        if (!base64Audio) return;

        const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
        audioRef.current = audio;

        const handleLoadedMetadata = () => setDuration(audio.duration);

        const handleTimeUpdate = () => {
            if (!audioRef.current) return;
            setCurrentTime(audioRef.current.currentTime);

            if (alignment.length) {
                const index = alignment.findIndex(
                    item => audioRef.current!.currentTime >= item.start && audioRef.current!.currentTime <= item.end
                );
                if (index !== -1) {
                    setCurrentWordIndex(index);
                }
            }
        };

        const handleEnded = () => {
            setIsRead(false);
            setCurrentWordIndex(-1);
            onEnd?.();
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
            audio.pause();
            audioRef.current = null;
        };
    }, [base64Audio, alignment, onEnd]);

    // Whenever volume/mute/speed change → update audioRef
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsRead(true);
        }
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsRead(false);
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsRead(false);
            setCurrentWordIndex(-1);
        }
    }, []);

    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    }, []);


    const toggleMute = useCallback((forceMute?: boolean) => {
        const newMuted = forceMute !== undefined ? forceMute : !isMuted;
        setIsMuted(newMuted);
    }, [isMuted]);
    const changeVolume = useCallback((newVolume: number) => {
        const clampedVolume = Math.min(1, Math.max(0, newVolume));
        setVolume(clampedVolume);
        if (clampedVolume > 0 && isMuted) {
            toggleMute(false);
        }
    }, [isMuted, toggleMute]);

    const changeSpeed = useCallback((speed: number) => {
        const clampedSpeed = Math.min(2, Math.max(0.5, speed));
        setPlaybackRate(clampedSpeed);
    }, []);

    return {
        currentWordIndex,
        currentTime,
        duration,
        isRead,
        volume,
        isMuted,
        playbackRate,
        play,
        pause,
        stop,
        seek,
        changeVolume,
        toggleMute,
        changeSpeed,
    };
}

