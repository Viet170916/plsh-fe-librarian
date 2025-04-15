"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useState} from "react";
import Grid from "@mui/material/Grid2";
import {useAudioHighlighter} from "@/hooks/useTtsPlayer";
import {useSelector} from "@/hooks/useSelector";
import {
    Paragraph as TPParagraph,
    selectCurrentChapter,
    setPropToChapter
} from "@/stores/slices/book-states/audio.book.slice";
import {shallowEqual} from "react-redux";
import AppButton from "@/components/primary/Input/AppButton";
import {IoPauseOutline, IoPlayOutline} from "react-icons/io5";
import {color} from "@/helpers/resources";
import {Stack} from "@mui/material";
import {useLazyGetAudioQuery} from "@/stores/slices/api/audio-book.api.slice";
import {useAppDispatch} from "@/hooks/useDispatch";

function Player(): JSX.Element {
    const chapter = useSelector(selectCurrentChapter, shallowEqual);
    return (
        <Grid width={"100%"}>
            {chapter && <Paragraphs phases={chapter?.paragraphs} chapter={chapter.chapter}/>}
        </Grid>
    )

}

const Paragraphs = memo(({phases, chapter}: { chapter: number, phases: TPParagraph[] }) => {
    const dispatch = useAppDispatch();
    const [currentPh, setCurrentPh] = useState<TPParagraph>(phases[0]);
    const [getAudio, {data, isFetching, error}] = useLazyGetAudioQuery();
    useEffect(() => {
        if (phases[0].text)
            getAudio({text: phases[0].text});
    }, [getAudio, phases]);
    const handleFinishRead = useCallback(() => {
        getAudio({text: phases[currentPh.p + 1].text});
    }, [getAudio,currentPh.p, phases])
    useEffect(() => {
        if (data) {
            dispatch(
                setPropToChapter({
                    chapter,
                    key: `paragraphs.${currentPh.p + 1}.audio`,
                    value: data.data,
                })
            );
            setCurrentPh(prevState => ({...prevState, audio: data.data}));
        }
    }, [data,currentPh.p, chapter,dispatch]);

    const {currentWordIndex, play, stop, isRead, pause} = useAudioHighlighter({
        base64Audio: currentPh.audio?.audioBase64 ?? "",
        alignment: currentPh.audio?.alignment ?? [],
        onEnd: handleFinishRead,
    });
    const continuePlay = useCallback(() => {
        play();
    }, [play]);
    useEffect(() => {
        if (currentPh && currentPh.p > 0) {
            // continuePlay();
        }
    }, [currentPh, continuePlay]);

    const PlayPause = useMemo(() => (
        <AppButton variant={"outlined"} onClick={isRead ? pause : play}>{!isRead ? <IoPlayOutline/> :
            <IoPauseOutline/>}</AppButton>), [play, pause, isRead]);
    return (
        <Grid container width={"100%"} height={"100%"}>
            {PlayPause}
            <Stack display={"flex"} spacing={.3} flexWrap={"wrap"} direction={"row"} useFlexGap width={"100%"}>
                {phases.map((ph, index) => (
                    <Paragraph key={ph.p} phase={ph} shouldRerender={index === ph.p} wordIndex={currentWordIndex}/>
                ))}
            </Stack>
        </Grid>
    );
})
type ParagraphProps = { phase: TPParagraph, wordIndex: number, shouldRerender?: boolean }
const Paragraph = memo(({phase, wordIndex}: ParagraphProps) => {
    return (<Stack display={"flex"} spacing={.3} flexWrap={"wrap"} direction={"row"} useFlexGap width={"100%"}>
        {phase.text?.split(" ").map((word, index) => (
            <Word key={`${index}-${word}`} word={word} isActive={wordIndex === index}/>
        ))}
    </Stack>)
}, (prevProps, nextProps) => {
    if (nextProps.shouldRerender) {
        return prevProps.wordIndex === nextProps.wordIndex || prevProps.phase.text === nextProps.phase.text;
    }
    return true;
});

const Word = memo(({word, isActive}: { word: string; isActive: boolean }) => {
    return (
        <p style={isActive ? {color: color.PRIMARY} : undefined}>
            {word}
        </p>
    );
}, (prev, next) => prev.isActive === next.isActive && prev.word === next.word);

export default memo(Player);

