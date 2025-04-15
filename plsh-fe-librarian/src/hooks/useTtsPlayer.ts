import {useCallback, useEffect, useRef, useState} from "react";
import {useLazyGetAudioQuery} from "@/stores/slices/api/audio-book.api.slice";
import {useSelector} from "@/hooks/useSelector";
import {selectCurrentChapter, setPropToChapter} from "@/stores/slices/book-states/audio.book.slice";
import {useAppDispatch} from "@/hooks/useDispatch";
import {shallowEqual} from "react-redux";

export interface Alignment {
    word: string;
    start: number; // in seconds
    end: number;
}

interface UseAudioHighlighterOptions {
    base64Audio: string;
    alignment: Alignment[];
    onEnd?: () => void;
    onNearEnd?: () => void;
}

export const useAudioHighlighter = ({
    base64Audio,
    alignment,
    onNearEnd,
    onEnd,
}: UseAudioHighlighterOptions) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
    const [isRead, setIsRead] = useState<boolean>(false);
    const hasNearEndFired = useRef(false);

    useEffect(() => {
        if (base64Audio) {
            const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
            audioRef.current = audio;
            hasNearEndFired.current = false;
        }
    }, [base64Audio]);
    const handleEnded = useCallback(() => {
        setCurrentWordIndex(-1);
        hasNearEndFired.current = false;
        onEnd?.();
    }, [onEnd]);
    const handleNearEnd = useCallback(() => {
        hasNearEndFired.current = true;
        onNearEnd?.();
    }, [onNearEnd]);
    const handleTimeUpdate = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const currentTime = audio.currentTime;
        const index = alignment.findIndex((item, i) =>
            currentTime >= item.start &&
            currentTime <= item.end &&
            (i === alignment.length - 1 || currentTime < alignment[i + 1].start)
        );
        setCurrentWordIndex(index);

        if (
            audio.duration &&
            audio.duration - currentTime <= 7 && audio.duration - currentTime > 5.5 &&
            !hasNearEndFired.current
        ) {
            hasNearEndFired.current = true;
            handleNearEnd();
        }
    }, [alignment, handleNearEnd]);


    useEffect(() => {
        return () => {
            audioRef.current?.pause();
            setIsRead(false);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
            audioRef.current.addEventListener("ended", handleEnded);
        }
        return () => {
            audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
            audioRef.current?.removeEventListener("ended", handleEnded);
        };
    }, [handleTimeUpdate, handleEnded]);

    const play = useCallback(() => {
        audioRef.current?.play().then();
        setIsRead(true);
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
        setIsRead(false);
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            pause();
            audioRef.current.currentTime = 0;
            setCurrentWordIndex(-1);
            hasNearEndFired.current = false;
        }
    }, [pause]);

    return {
        isRead,
        currentWordIndex,
        play,
        pause,
        stop,
    };
};
