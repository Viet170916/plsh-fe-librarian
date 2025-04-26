"use client";
import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useGetBookQuery} from "@/stores/slices/api/book.api.slice";
import {setPropToBookState} from "@/stores/slices/book-states/book.slice";
import React, {JSX, memo, useEffect} from "react";
import {Fab} from "@mui/material";
import Link from "next/link";
import {FaRegEdit} from "react-icons/fa";
import {color} from "@/helpers/resources";
import {useParams} from "next/navigation";

function ClientRender(): JSX.Element {
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const {data, error} = useGetBookQuery(Number.parseInt(id as string));
    useEffect(() => {
        if (data) {
            dispatch(setPropToBookState({key: "currentBook", value: data}));
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            throw new Error(appStrings.book.NOT_BOOK_FOUND);
        }
    }, [error]);
    return <Link href={`/resources/books/${id}/edit`}>
        <Fab aria-label={"add"}
             sx={{bottom: 0, right: 0, position: "absolute", m: 2, color: color.LIGHT_TEXT, bgcolor: color.FOUR}}>
            <FaRegEdit size={20}/>
        </Fab>
    </Link>;
}

export default memo(ClientRender);
