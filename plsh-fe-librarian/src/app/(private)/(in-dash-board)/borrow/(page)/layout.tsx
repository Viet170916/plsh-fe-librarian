import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import Link from "next/link";
import AppButton from "@/components/primary/Input/AppButton";
import appStrings from "@/helpers/appStrings";
import {LoanFilter} from "@/app/(private)/(in-dash-board)/borrow/component/BorrowRequest";

interface IProps {
    children?: React.ReactNode;
}

function BorrowLayout(props: IProps) {
    return (
        <Grid direction={"column"} container width={"100%"} height={"100%"}>
            <Grid>
                <TabBar left={
                    <Grid container alignItems={"center"}>
                        <Link href={`/borrow/add`}>
                            <AppButton variant={"contained"}
                                       sx={{my: .5, borderRadius: 12}}>{appStrings.borrow.CREATE_BORROWING}</AppButton>
                        </Link>
                        <Grid size={"grow"}><LoanFilter/></Grid>
                    </Grid>}/>
            </Grid>
            <Grid size={"grow"} width={"100%"} sx={{overflowY: "auto", px: 2, pb: 2}}>
                {props.children}
            </Grid>
        </Grid>);
}

export default memo(BorrowLayout);
