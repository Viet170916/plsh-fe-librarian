"use client";
import {BookData} from "@/helpers/appType";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setAddEditBookWithBookData} from "@/stores/slices/book-states/book.add-edit.slice";
import {setEditedBook_g} from "@/stores/slices/global.slice";
import {JSX, useEffect} from "react";

export default function SaveToStore({book}: { book: BookData }): JSX.Element {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setAddEditBookWithBookData(book));
        dispatch(setEditedBook_g(book));
    }, [dispatch, book]);
    return (
        <></>
    );
}
