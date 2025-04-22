import EbookView from "@/app/(private)/(in-dash-board)/resources/books/e-book/[id]/EbookView";
import appStrings from "@/helpers/appStrings";
import {Box} from "@mui/material";
import React from "react";

export const metadata = {
    title: appStrings.book.E_BOOK,
    icons: {
        icon: "/images/logo.svg",
    },
};

export default async function page() {
    return (
        <Box height={"100%"} width={"100%"} flexGrow={1}>
            <EbookView/>
        </Box>
    );
}
