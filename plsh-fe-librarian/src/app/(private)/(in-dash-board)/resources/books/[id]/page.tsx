import BookAuthors from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookAuthor";
import BookDetails from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookDetailInformation";
import BookImage from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookImage";
import ClientRender from "@/app/(private)/(in-dash-board)/resources/books/[id]/ClientRender";
import BookOverviewTabs from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps {
    params: Promise<{ id: number }>;
}

async function BookDetailPage(props: IProps) {
    const {id} = await props.params;
    return (
        <Grid direction="row" container spacing={2} width={"100%"}>
            <ClientRender id={id}/>
            <Grid>
                <BookImage/>
            </Grid>
            <Grid size={{xl: "grow", xs: 8}}>
                <BookDetails/>
            </Grid>
            <Grid size={{xl: 4, sm: 12}}><BookAuthors/></Grid>
            <Grid size={12}>
                <BookOverviewTabs/>
            </Grid>
        </Grid>
    );
}

export default BookDetailPage;
