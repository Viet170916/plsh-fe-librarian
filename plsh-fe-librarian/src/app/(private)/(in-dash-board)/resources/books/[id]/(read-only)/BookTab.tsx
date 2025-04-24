"use client"
import React, {JSX, memo, useMemo} from "react";
import {PrimaryTabBar} from "@/components/primary/navigation/PrimaryTabBar";
import appStrings from "@/helpers/appStrings";
import {useParams} from "next/navigation";

function BookTab(): JSX.Element {
    const {id} = useParams();
    const tabs = useMemo(() => {
        return ([
                {
                    label: appStrings.book.OVERVIEW,
                    href: `/resources/books/${id}`,
                    index: 0
                },
                {
                    label: appStrings.book.INSTANCE,
                    href: `/resources/books/${id}/instances`,
                    index: 1
                },
                {
                    label: appStrings.book.REVIEW,
                    href: `/resources/books/${id}/review`,
                    index: 2
                },
                {
                    label: appStrings.book.LIST,
                    href: `/resources/books/${id}/list`,
                    index: 3
                },
                {
                    label: appStrings.book.RELATED,
                    href: `/resources/books/${id}/related`,
                    index: 4
                },
            ]
        )
    }, [id]);
    return (
        <PrimaryTabBar tabs={tabs}/>
    );
}

export default memo(BookTab);

