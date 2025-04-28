// "use client"
// import React, {JSX, memo, useCallback, useEffect, useMemo} from "react";
// import Grid from "@mui/material/Grid2";
// import {useAudioHighlighter} from "@/hooks/useTtsPlayer";
// import {useSelector} from "@/hooks/useSelector";
// import {
//     Chapter,
//     Paragraph as TPParagraph,
//     selectCurrentChapter,
//     setPropToChapter
// } from "@/stores/slices/book-states/audio.book.slice";
// import {shallowEqual} from "react-redux";
// import {IoPauseOutline, IoPlayOutline} from "react-icons/io5";
// import {color} from "@/helpers/resources";
// import {Stack} from "@mui/material";
// import {useLazyGetAudioQuery} from "@/stores/slices/api/audio-book.api.slice";
// import {useAppDispatch} from "@/hooks/useDispatch";
// import NeumorphicButton from "@/components/primary/neumorphic/Button";
// import data_2 from "./data2.json"
//
// function Player(): JSX.Element {
//     const chapter = useSelector(selectCurrentChapter, shallowEqual);
//     return (
//         <Grid width={"100%"}>
//             {chapter && <Paragraphs chapter={chapter}/>}
//         </Grid>
//     )
//
// }
//
// const Paragraphs = memo(({chapter}: { chapter: Chapter, }) => {
//     const dispatch = useAppDispatch();
//     const [getAudio, {data, isFetching, error}] = useLazyGetAudioQuery();
//     useEffect(() => {
//         if (chapter.text){}
//             // getAudio({text: chapter.text});
//     }, [getAudio, chapter?.text]);
//     const handleFinishRead = useCallback(() => {
//         // getAudio({text: chapter.text});
//     }, [getAudio, chapter?.text])
//     useEffect(() => {
//         if (data) {
//             dispatch(
//                 setPropToChapter({
//                     chapter: chapter.chapter,
//                     key: `audio`,
//                     value: data.data,
//                 })
//             );
//         }
//     }, [data, chapter, dispatch]);
//
//     const {currentWordIndex, play, stop, isRead, pause} = useAudioHighlighter({
//         base64Audio: data_2?.data?.audioBase64 ?? "",
//         alignment: data_2?.data?.alignment ?? [],
//         onEnd: handleFinishRead,
//     });
//     const continuePlay = useCallback(() => {
//         play();
//     }, [play]);
//     // useEffect(() => {
//     //     if (currentPh && currentPh.p > 0) {
//     //         // continuePlay();
//     //     }
//     // }, [currentPh, continuePlay]);
//
//     const PlayPause = useMemo(() => (
//         <NeumorphicButton variant={"outlined"} onClick={isRead ? pause : play}>{!isRead ? <IoPlayOutline/> :
//             <IoPauseOutline/>}</NeumorphicButton>), [play, pause, isRead]);
//     return (
//         <Grid container width={"100%"} height={"100%"}>
//             {PlayPause}
//             <Stack display={"flex"} spacing={.3} flexWrap={"wrap"} direction={"row"} useFlexGap width={"100%"}>
//                 {/*{phases.map((ph, index) => (*/}
//                 {/*<Paragraph phase={chapter.text} shouldRerender={index === ph.p} wordIndex={currentWordIndex}/>*/}
//                 {/*))}*/}
//
//                 {chapter.text?.split(" ").map((word, index) => (
//                     <Word key={`${index}-${word}`} word={word} isActive={currentWordIndex === index}/>
//                 ))}
//             </Stack>
//         </Grid>
//     );
// })
// type ParagraphProps = { phase: TPParagraph, wordIndex: number, shouldRerender?: boolean }
// const Paragraph = memo(({phase, wordIndex}: ParagraphProps) => {
//     return (<Stack display={"flex"} spacing={.3} flexWrap={"wrap"} direction={"row"} useFlexGap width={"100%"}>
//         {phase.text?.split(" ").map((word, index) => (
//             <Word key={`${index}-${word}`} word={word} isActive={wordIndex === index}/>
//         ))}
//     </Stack>)
// }, (prevProps, nextProps) => {
//     if (nextProps.shouldRerender) {
//         return prevProps.wordIndex === nextProps.wordIndex || prevProps.phase.text === nextProps.phase.text;
//     }
//     return true;
// });
//
// const Word = memo(({word, isActive}: { word: string; isActive: boolean }) => {
//     return (
//         <p style={isActive ? {color: color.PRIMARY} : undefined}>
//             {word}
//         </p>
//     );
// }, (prev, next) => prev.isActive === next.isActive && prev.word === next.word);
//
// export default memo(Player);
//
