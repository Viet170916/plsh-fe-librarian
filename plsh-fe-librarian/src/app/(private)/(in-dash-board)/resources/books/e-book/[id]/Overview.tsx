"use client"
import React, {JSX, memo, useCallback, useEffect, useRef, useState} from "react";

import {Box, Card, CardContent, IconButton, LinearProgress, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "next/navigation";
import {RootState} from "@/stores/store";
import {useDeleteChapterMutation, useLazyGetChapterSummaryQuery} from "@/stores/slices/api/e-book.api.slice";
import {addChapters, removeChapter, setPropToEBookState} from "@/stores/slices/book-states/e-book.book.slice";
import {truncateMaxLineTextStyle} from "@/style/text.style";
import {HiOutlineTrash} from "react-icons/hi";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {useTheme} from "@mui/material/styles";


function Overview(): JSX.Element {
    const {id} = useParams<{ id: string }>();
    const chapter = useSelector((state: RootState) => state.eBookState.currentChapter);
    const dispatch = useDispatch();
    const chapters = useSelector((state: RootState) => state.eBookState.chapters);
    const [currentPage, setCurrentPage] = useState(1);
    const [getChapters, {isFetching, data, error: chapterError}] = useLazyGetChapterSummaryQuery();
    const [deleteChapter, {isLoading, error}] = useDeleteChapterMutation();
    const containerRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    useEffect(() => {
        if (chapter) {
            const selection = containerRef.current?.querySelector(`#id-${chapter}`);
            const selectionChapter = containerRef.current?.querySelectorAll(`.chapter-item`);
            selectionChapter?.forEach(e => {
                if (e)
                    (e as HTMLElement).style.color = ""
            })
            if (selection) {
                (selection as HTMLElement).style.color = theme.palette.primary.main;
            }
        }
    }, [chapter, theme.palette.primary.main]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    useEffect(() => {
        if (chapterError) {
            appToaster.error(parsErrorToBaseResponse(chapterError)?.message);
        }
    }, [chapterError]);

    const loadChapters = useCallback((page: number) => {
        getChapters({bookId: Number.parseInt(id), page});
    }, [getChapters]);

    useEffect(() => {
        if (data?.data) {
            if (data?.page === 1) {
                dispatch(setPropToEBookState({key: "chapters", value: data.data}));
            } else {
                dispatch(addChapters(data.data));
            }
        }
    }, [data, dispatch]);

    const handleDelete = async (chapterId: number, chapter: number) => {
        try {
            await deleteChapter({chapter, id: chapterId}).unwrap();
            dispatch(removeChapter(chapterId));
        } catch (error) {
            console.error('Xoá thất bại', error);
        }
    };

    useEffect(() => {
        loadChapters(1);
    }, [id, loadChapters]);

    const handleLoadMore = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextPage = currentPage + 1;
        loadChapters(nextPage);
        setCurrentPage(nextPage);
    };
    return (
        <Box display="flex" flexDirection="row" gap={2} width="100%" height={120} sx={{overflowX: "auto", p: 1}}>
            {isFetching && <LinearProgress/>}
            <Box ref={containerRef} display="flex" flexDirection="row" gap={2}>
                {chapters.map((chapter) => (
                    <Card className={"chapter-item"} id={`id-${chapter.chapterIndex}`} key={chapter.id}
                          sx={{width: 200, height: "100%", position: "relative", cursor: "pointer"}}
                          onClick={() => dispatch(setPropToEBookState({
                              key: "currentChapter",
                              value: chapter.chapterIndex,
                          }))}>
                        <CardContent>
                            <Typography variant="h6">Chapter {chapter.chapterIndex}</Typography>
                            <Typography variant="body2" color="text.primary" sx={truncateMaxLineTextStyle(4)}>
                                {chapter.shortContent}
                            </Typography>
                        </CardContent>
                        <IconButton
                            loading={isLoading}
                            size="small"
                            onClick={() => handleDelete(chapter.id, chapter.chapterIndex)}
                            sx={{position: 'absolute', top: 8, right: 8}}
                        >
                            <HiOutlineTrash/>
                        </IconButton>
                    </Card>
                ))}
                <NeumorphicButton disabled={!data || data?.page === data?.pageCount} onClick={handleLoadMore}
                                  loading={isFetching}>
                    Xem thêm
                </NeumorphicButton>
            </Box>
        </Box>
    );
}

export default memo(Overview);
