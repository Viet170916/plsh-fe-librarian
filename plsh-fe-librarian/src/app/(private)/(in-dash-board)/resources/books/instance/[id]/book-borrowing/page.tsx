"use client"
import React, {JSX, memo} from "react";
import BookBorrowingTable
    from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/book-borrowing/BookBorrowingTable";

type pageProps = {
    children?: React.ReactNode;
}

function page(): JSX.Element {
    return (
        <BookBorrowingTable/>
    );
}

export default memo(page);

