"use client"
import React, {JSX, memo} from "react";
import {Chip, Pagination, PaginationProps, Tooltip, Typography} from "@mui/material";
import {color} from "@/helpers/resources";
import AppButton from "@/components/primary/Input/AppButton";
import appStrings from "@/helpers/appStrings";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

type AppPaginationProps = { pageLabel?: string, hideNavButton?: boolean } & PaginationProps

function AppPagination({pageLabel, hideNavButton, ...paginationProps}: AppPaginationProps): JSX.Element {
    return (
        <Pagination
            siblingCount={1}
            boundaryCount={2}
            renderItem={(item) => {
                const chapterLabel = `${pageLabel ?? "Trang"} ${item.page}`;
                if (hideNavButton && (item.type === 'previous' || item.type === 'next')) {
                    return <></>;
                } else if (!hideNavButton && item.type === 'previous') {
                    return (<NeumorphicButton disabled={item.disabled} onClick={item.onClick} variant={"outlined"}
                                       sx={{borderRadius: 12}}>{appStrings.PREV_PAGE}</NeumorphicButton>)
                } else if (!hideNavButton && item.type === 'next') {
                    return (<NeumorphicButton disabled={item.disabled} onClick={item.onClick} variant={"outlined"}
                                       sx={{borderRadius: 12}}>{appStrings.NEXT_PAGE}</NeumorphicButton>)
                }
                if (item.type === 'page') {
                    return (
                        <Tooltip title={chapterLabel} arrow key={item.page}>
                            <Chip
                                variant={'filled'}
                                label={item.page}
                                onClick={item.onClick}
                                sx={{
                                    mx: "5px!important",
                                    cursor: 'pointer',
                                    width: 50,
                                    bgcolor: item.selected ? color.PRIMARY : color.WHITE
                                }}
                            />
                        </Tooltip>
                    );
                }
                return <Typography variant={"h4"} sx={{color: color.PRIMARY}}>...</Typography>;
            }}
            {...paginationProps}
            sx={{
                ...paginationProps.sx,
                '& li': {
                    padding: "0!important"
                },
            }}
        />
    );
}

export default memo(AppPagination);

