"use client"
import React, {JSX, memo} from "react";
import AppBreadcrumbs from "@/components/primary/AppBreadcrum";
import {useParams} from "next/navigation";
import {useSelector} from "@/hooks/useSelector";

function BookInstanceBreadcrumbs(): JSX.Element {
    const currentBookId = useSelector(state => state.bookInstanceState.currentBookInstance?.bookId);
    const {id} = useParams<{ id: string }>();
    const links = [
        {href: `/resources/books`, label: "Sách"},
        {href: `/resources/books/${currentBookId}/instances`, label: "Sách cứng"},
        {href: `/resources/books/${currentBookId}/instances/${id}`, label: `#${id}`},
    ]

    return (<AppBreadcrumbs links={links}/>);
}

export default memo(BookInstanceBreadcrumbs);

