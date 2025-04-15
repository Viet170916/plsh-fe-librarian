"use client";
import {appToaster} from "@/components/primary/toaster";
import {BookData, FilterParams} from "@/helpers/appType";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useLazyGetBooksQuery} from "@/stores/slices/api/book.api.slice";
import {setPropToBookState} from "@/stores/slices/book-states/book.slice";
import {Pagination} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback, useEffect, useRef, useState} from "react";
import {Zoom} from "@/components/Animation/animation";
import {BookSelectedModal} from "@/app/(private)/(in-dash-board)/resources/books/component/modal";
import {BookCard} from "@/app/(private)/(in-dash-board)/resources/books/component/item";
import LoadingModal from "@/components/primary/LoadingModal";
import {QueryActionCreatorResult, QueryDefinition} from "@reduxjs/toolkit/query";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";

function BookDisplay(): JSX.Element {
    const dispatch = useAppDispatch();
    const [bookParams, setBookParams] = useState<FilterParams<BookData>>({
        page: 1, limit: 18, pageCount: 1
    });
    const beforeFetchRef = useRef<QueryActionCreatorResult<QueryDefinition<unknown, BaseQueryFn, string, unknown>> | null>(null);
    const [getBooks, {data: books, isFetching, error}] = useLazyGetBooksQuery();
    useEffect(() => {
        // beforeFetchRef.current?.abort();
        if (bookParams) {
            beforeFetchRef.current = getBooks(bookParams);
        }
    }, [getBooks, bookParams]);

    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    const onSelectBook = useCallback((book: BookData) => {
        dispatch(setPropToBookState({key: "currentBook", value: book}));
    }, [dispatch]);
    return (
        <>
            <LoadingModal open={isFetching}/>
            <BookSelectedModal/>
            <Grid size={12} container justifyContent={"end"}>
            </Grid>
            <Grid container spacing={2} alignItems={"center"}>
                {books?.data?.map((book, index) => (
                    <Grid key={book.id} size={{xl: 2, lg: 2, md: 3, sm: 6, xs: 12}} height={"100%"}
                          onClick={() => onSelectBook(book)}
                          sx={{cursor: "pointer"}}
                    >
                        <Zoom index={index} style={{height: "100%"}}>
                            <BookCard book={book}/>
                        </Zoom>
                    </Grid>
                ))}
                <Grid size={12}>
                    <Pagination
                        count={books?.pageCount} shape="rounded" size={"small"}
                        page={books?.page ?? books?.currenPage ?? 1} onChange={async (_, newPage) => {
                        setBookParams(prevState => ({...prevState, page: newPage}));
                    }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default memo(BookDisplay);

