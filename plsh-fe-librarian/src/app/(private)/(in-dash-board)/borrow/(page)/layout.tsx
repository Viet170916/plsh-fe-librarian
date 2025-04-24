import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import Link from "next/link";
import appStrings from "@/helpers/appStrings";
import {LoanFilter} from "@/app/(private)/(in-dash-board)/borrow/component/BorrowRequest";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface IProps {
    children?: React.ReactNode;
}

function BorrowLayout(props: IProps) {
    return (
        <Grid direction={"column"} container width={"100%"} height={"100%"}>
            <Grid>
                <TabBar left={
                    <Grid container alignItems={"center"} spacing={2}>
                        <NeumorphicButton component={Link} href={`/borrow/add`} variant_2={"primary"}
                                          sx={{
                                              borderRadius: 12,
                                          }}>{appStrings.borrow.CREATE_BORROWING}</NeumorphicButton>
                        <Grid size={"grow"}><LoanFilter/></Grid>
                    </Grid>}/>
            </Grid>
            <Grid size={"grow"} width={"100%"} sx={{overflowY: "auto", px: 2, pb: 2}}>
                {props.children}
            </Grid>
        </Grid>);
}

export default memo(BorrowLayout);
