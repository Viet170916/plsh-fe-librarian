import React from "react";
import ClientRender from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/instances/ClientRender";
import Grid from "@mui/material/Grid2";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import Link from "next/link";
import appStrings from "@/helpers/appStrings";

async function Page({params}: { params: Promise<{ id: number }> }) {
    const {id} = await params;
    return (
        <Grid width={"100%"} container spacing={2}>
            <NeumorphicButton component={Link} href={`/resources/books/${id}/edit?tab=1`}>
                {appStrings.EDIT}
            </NeumorphicButton>
            <Grid size={12}>
                <ClientRender/>
            </Grid>
        </Grid>
    );
}

export default Page;

