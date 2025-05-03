"use client";
import {appToaster} from "@/components/primary/toaster";
import {BookData} from "@/helpers/appType";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useGetBooksQuery} from "@/stores/slices/api/book.api.slice";
import {setPropToBookState} from "@/stores/slices/book-states/book.slice";
import {ListItemButton, ListItemText} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback, useEffect, useState} from "react";
import {Zoom} from "@/components/Animation/animation";
import {BookSelectedModal} from "@/app/(private)/(in-dash-board)/resources/books/component/modal";
import {BookCard} from "@/app/(private)/(in-dash-board)/resources/books/component/item";
import LoadingModal from "@/components/primary/LoadingModal";
import SmartFloatingMenu from "@/components/Animation/SmartMenu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import appStrings from "@/helpers/appStrings";
import AppPagination from "@/components/primary/Input/AppPagination";
import {useSelector} from "@/hooks/useSelector";
import {shallowEqual} from "react-redux";

function BookDisplay(): JSX.Element {
    const dispatch = useAppDispatch();
    const [menuBookSelected, setMenuBookSelected] = useState<{
        id: number | null,
        anchorEl: HTMLElement | null
    } | null>(null);
    const filter = useSelector(state => state.bookState.booksFilter, shallowEqual);
    const {data: books, isFetching, error} = useGetBooksQuery(filter ?? {page: 1, limit: 18});

    const onSelectBook = useCallback((book: BookData) => {
        dispatch(setPropToBookState({key: "currentBook", value: book}));
    }, [dispatch]);

    useEffect(() => {
        setMenuBookSelected(null);
    }, [books]);

    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    console.log("23456789")
    return (
        <>
            <LoadingModal open={isFetching}/>
            <BookSelectedModal/>
            {menuBookSelected?.id && menuBookSelected.anchorEl &&
                <BookMenu bookId={menuBookSelected.id} onClose={() => setMenuBookSelected(null)}
                          anchor={menuBookSelected.anchorEl}/>}
            <Grid size={12} container justifyContent={"end"}>
            </Grid>
            <Grid container spacing={2} alignItems={"center"}>
                {books?.data?.map((book, index) => (
                    <Grid key={book.id} size={{xl: 2, lg: 2, md: 3, sm: 6, xs: 12}} height={"100%"}
                          onClick={() => onSelectBook(book)}
                          sx={{cursor: "pointer"}}
                    >
                        <Zoom index={index} style={{height: "100%"}}>
                            <BookCard book={book} onMenuSelect={setMenuBookSelected}/>
                        </Zoom>
                    </Grid>
                ))}
                <Grid size={12}>
                    <AppPagination
                        count={books?.pageCount} shape="rounded" size={"small"}
                        page={books?.page ?? books?.currentPage ?? 1} onChange={async (_, newPage) => {
                        dispatch(setPropToBookState({key: "booksFilter.page", value: newPage}));
                    }}
                    />

                </Grid>
            </Grid>
        </>
    );
}

const BookMenu = memo(({bookId, onClose, anchor}: {
    anchor: HTMLElement,
    bookId: number | null,
    onClose: () => void
}) => {


    return (
        <SmartFloatingMenu anchorEl={anchor} open={bookId as unknown as boolean} onClose={onClose}>
            <Grid container width={"100%"}>
                <List sx={{width: "100%"}}>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href={`/resources/books/${bookId}`}>
                            <ListItemText primary={appStrings.SEE_DETAIL}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href={`/resources/books/${bookId}/edit`}>
                            <ListItemText primary={appStrings.EDIT}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={appStrings.DELETE}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </SmartFloatingMenu>
    )
})

export default memo(BookDisplay);

