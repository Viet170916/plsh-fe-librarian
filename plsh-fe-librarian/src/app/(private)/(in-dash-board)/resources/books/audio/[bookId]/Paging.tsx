"use client"
import React, {JSX, memo, useEffect, useState} from "react";
import {useLazyGetTextChapterQuery} from "@/stores/slices/api/book.api.slice";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {Pagination} from "@mui/material";
import {addChapter, setPropToAudioBookState} from "@/stores/slices/book-states/audio.book.slice";
import {useAppStore} from "@/stores/store";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setStateToMemberState} from "@/stores/slices/member-states/member.slice";
import AppPagination from "@/components/primary/Input/AppPagination";

type PagingProps = {
    bookId: number
}

function Paging({bookId}: PagingProps): JSX.Element {
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const [chapter, setChapter] = useState(1);
    const [getTextChunks, {data: TextResponse, isFetching, error}] = useLazyGetTextChapterQuery();
    useEffect(() => {
        if (!store.getState().audioBookState.chapters.find(c => c.chapter === chapter)) {
            if (!TextResponse || (chapter !== TextResponse?.page)) {
                getTextChunks({chapter, bookId});
            }
        }
        if (chapter) {
            dispatch(setPropToAudioBookState({key: "currentChapter", value: chapter}));
        }
    }, [chapter, bookId, TextResponse, store, dispatch, getTextChunks]);
    useEffect(() => {
        console.log(TextResponse?.data && TextResponse?.page)
        if (TextResponse?.data && TextResponse?.page) {
            dispatch(addChapter(
                {chapter: TextResponse.page, paragraphs: TextResponse.data}
            ));

        }
        if (TextResponse?.page) {
            setChapter(TextResponse?.page);
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

