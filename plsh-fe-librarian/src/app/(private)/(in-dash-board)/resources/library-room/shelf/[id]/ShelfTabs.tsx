"use client"
import React, {JSX, memo, useMemo} from "react";
import {useGetShelvesQuery} from "@/stores/slices/api/library-room.api.slice";
import {LinearProgress} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";

function ShelfTabs(): JSX.Element {
    const {data, error, isFetching} = useGetShelvesQuery({minimum: true});
    const tabs = useMemo(() => {
        return data?.map((sh, index) => ({
            href: `/resources/library-room/shelf/${sh.id}`,
            label: sh.name ?? `kệ sách #${sh.id ?? "--"}`,
            index
        }));
    }, [data])
    return (
        <Grid size={12} width={"100%"}>
            {isFetching && <LinearProgress/>}
            <TabBar tabs={tabs}/>
        </Grid>
    );
}

export default memo(ShelfTabs);

