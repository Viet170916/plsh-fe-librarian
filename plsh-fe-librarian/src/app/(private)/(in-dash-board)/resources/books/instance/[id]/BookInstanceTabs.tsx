"use client"
import React, {JSX, memo} from "react";
import {PrimaryTabBar} from "@/components/primary/navigation/PrimaryTabBar";
import {useParams} from "next/navigation";


function BookInstanceTabs(): JSX.Element {
    const {id} = useParams<{ id: string }>();
    const tabs = [{
        href: `/resources/books/instance/${id}`,
        label: "Tình trạng sách",
        index: 0
    }, {
        href: `/resources/books/instance/${id}/book-borrowing`,
        label: "Sách mượn",
        index: 1
    },]
    return (
        <PrimaryTabBar tabs={tabs}/>
    );
}

export default memo(BookInstanceTabs);

