"use client"
import React, {JSX, memo, useEffect, useState} from "react";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {addChapter, setPropToAudioBookState} from "@/stores/slices/book-states/audio.book.slice";
import {useAppStore} from "@/stores/store";
import {useAppDispatch} from "@/hooks/useDispatch";
import AppPagination from "@/components/primary/Input/AppPagination";
import {useLazyGetChapterTextQuery,} from "@/stores/slices/api/e-book.api.slice";

type PagingProps = {
    bookId: number
}

function Paging({bookId}: PagingProps): JSX.Element {
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const [chapter, setChapter] = useState(1);
    const [getTextChunks, {data: TextResponse, isFetching, error}] = useLazyGetChapterTextQuery();
    useEffect(() => {
        if (!store.getState().audioBookState.chapters.find(c => c.chapter === chapter)) {
            if (!TextResponse || (chapter !== TextResponse?.page)) {
                getTextChunks({chapterIndex: chapter, bookId});
            }
        }
        if (chapter) {
            dispatch(setPropToAudioBookState({key: "currentChapter", value: chapter}));
        }
    }, [chapter, bookId, TextResponse, store, dispatch, getTextChunks]);
    useEffect(() => {
        console.log(TextResponse?.data)
        if (TextResponse?.data) {
            dispatch(addChapter(
                {chapter: TextResponse.data.chapterIndex, text: TextResponse.data.plainText}
            ));

        }
        if (TextResponse?.data.chapterIndex) {
            setChapter(TextResponse?.data.chapterIndex);
        }
    }, [TextResponse, dispatch, getTextChunks]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);


    return (
        <AppPagination
            page={TextResponse?.page ?? 1}
            count={TextResponse?.pageCount ?? 1}
            onChange={(_, page) => {
                setChapter(page);
            }}
        />

    );
}

export default memo(Paging);

