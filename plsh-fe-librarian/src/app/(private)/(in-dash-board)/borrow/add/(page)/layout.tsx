"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import BookSearch from "@/app/(private)/(in-dash-board)/borrow/add/(page)/book.search";
import Helper from "@/components/primary/display/Helper";
import appStrings from "@/helpers/appStrings";
import {Typography} from "@mui/material";
import {color} from "@/helpers/resources";
import BarcodeHelper from "@/components/primary/Input/BarcodeHelper";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <Grid container width={"100%"} direction={"column"}>
            <Grid width={"100%"}>
                <TabBar left={
                    <Grid container sx={{my: .5}}>
                        <BookSearch/>
                    </Grid>}
                        right={
                            <Grid>
                                <Helper title={appStrings.guide.BOOK_SELECT_PAGE} helpModalOption={{
                                    render: <Grid container width={400}>
                                        <Typography variant={"h5"} sx={{color: color.PRIMARY}} fontWeight={"bold"}>
                                            {appStrings.guide.BOOK_SELECT_PAGE}
                                        </Typography>

                                    </Grid>
                                }}/>
                                <BarcodeHelper/>
                            </Grid>

                        }/>
            </Grid>
            {children}
        </Grid>
    );
}

export default memo(layout);

