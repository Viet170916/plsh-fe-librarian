"use client"
import React, {JSX, memo, useEffect, useMemo} from "react";
import {useGetShelvesQuery} from "@/stores/slices/api/library-room.api.slice";
import {LinearProgress, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import {usePathname, useRouter} from "next/navigation";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";

type TTab = { href: string; label: string; index: number }

function ShelfTabs(): JSX.Element {
    const path = usePathname();
    const {data, error, isFetching} = useGetShelvesQuery({minimum: true});
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message)
        }
    }, [error])
    const tabs = useMemo(() => {
        return data?.map((sh, index) => ({
            href: `/resources/library-room/shelf/${sh.id}`,
            label: sh.name ?? `kệ sách #${sh.id ?? "--"}`,
            index
        }));
    }, [data])
    const router = useRouter();
    const handleChange = (event: SelectChangeEvent<string>) => {
        const href = event.target.value;
        router.push(href);
    };


    return (
        <Grid size={12} width={"100%"}>
            {isFetching && <LinearProgress/>}
            <TabBar right={
                <Grid sx={{m: .5}}>
                    <Select
                        size={"small"}
                        value={path}
                        onChange={handleChange}
                        displayEmpty
                        sx={{minWidth: 200}}
                    >
                        <MenuItem value="" disabled>
                            <em>Chọn trang</em>
                        </MenuItem>
                        {tabs?.map((option) => (
                            <MenuItem key={option.href} value={option.href}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

            }/>
        </Grid>
    );
}

export default memo(ShelfTabs);

