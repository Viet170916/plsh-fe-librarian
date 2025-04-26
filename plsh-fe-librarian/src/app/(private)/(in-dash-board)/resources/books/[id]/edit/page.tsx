import SaveToStore from "@/app/(private)/(in-dash-board)/resources/books/[id]/edit/SaveToStore";
import Add_EditBookDetails
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookDetailInformation";
import Add_EditBookImage from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookImage";
import Add_EditBookOverviewTabs
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs";
import {getBooks} from "@/request/book";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps {
    params: Promise<{ id: number }>;
}

async function EditBookPage(props: IProps) {
    const {id} = await props.params;
    const bookResponse = await getBooks(id);
    if (bookResponse.data.id)
        return (
            <Grid direction="row" container spacing={2} sx={{m: 2}}>
                <Grid>
                    <Add_EditBookImage src={""}/>
                </Grid>
                <Grid size={{sm: "grow"}}>
                    <Add_EditBookDetails/>
                </Grid>
                <Grid size={12}>
                    <Add_EditBookOverviewTabs bookId={bookResponse.data.id}/>
                </Grid>
                <SaveToStore book={bookResponse.data}/>
            </Grid>);
    return <>Not found</>;
}

export default EditBookPage;
