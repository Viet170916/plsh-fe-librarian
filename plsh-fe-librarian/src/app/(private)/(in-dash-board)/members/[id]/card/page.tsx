import React from "react";
import CardForm from "@/app/(private)/(in-dash-board)/members/[id]/card/Form";
import Grid from "@mui/material/Grid2";
import LibraryBg from "@/app/(private)/(in-dash-board)/members/[id]/card/bg";

const Card = () => {
    return (
        <Grid height={"100%"} width={"100%"} position={"relative"} container>
            <LibraryBg/>
            <CardForm/>
        </Grid>
    );
};


export default Card;
