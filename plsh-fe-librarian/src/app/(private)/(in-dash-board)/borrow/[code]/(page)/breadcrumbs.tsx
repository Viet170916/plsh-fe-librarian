"use client"
import React, {JSX, memo, useMemo} from "react";
import AppBreadcrumbs from "@/components/primary/AppBreadcrum";
import {useParams} from "next/navigation";

type breadcrumbsProps = {
    children?: React.ReactNode;
}

function BorrowCodeBreadcrumbs(): JSX.Element {
    const {code} = useParams<{ code: string }>();
    const links = useMemo(() => [{
        href: `/borrow`,
        label: `Lượt mượn`
    }, {
        href: `/borrow/${code}`,
        label: code
    }], [code]);
    return (
        <>
            <AppBreadcrumbs links={links}/>
        </>
    );
}

export default memo(BorrowCodeBreadcrumbs);

