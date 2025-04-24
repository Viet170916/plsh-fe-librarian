"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import appStrings from "@/helpers/appStrings";
import Link from "next/link";
import Filter from "@/app/(private)/(in-dash-board)/resources/books/(page)/Filter";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    const tabs = [{label: appStrings.book.ALL, href: `/resources/books`, index: 0},
        {label: appStrings.shelf.NAME, href: `/resources/library-room`, index: 1},
        {label: appStrings.book.E_BOOK, href: `/resources/books/e-book`, index: 2},
    ]
    return (
        <Grid container width={"100%"} direction={"column"}>
            <Grid size={12}>{
                <TabBar left={
                    <Grid container width={"100%"} alignItems={"center"} spacing={2}>
                        <NeumorphicButton variant_2={"primary"} component={Link} href={`/resources/books/add`}>
                            {appStrings.book.ADD_BOOK}
                        </NeumorphicButton>
                        <Grid size={"grow"}>
                            <Filter/>
                        </Grid>
                    </Grid>

                } tabs={tabs}/>}</Grid>
            <Grid size={"grow"} sx={{overflowY: "auto"}} width={"100%"}>
                {children}
            </Grid>
        </Grid>
    );
}

export default memo(layout);

