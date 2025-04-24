"use client"
import React, {JSX, memo, useMemo} from "react";
import {BookInstance} from "@/helpers/appType";
import {Avatar, Skeleton, TableCell, TableRow, Typography} from "@mui/material";
import appStrings from "@/helpers/appStrings";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import Link from "next/link";
import {useTheme} from "@mui/material/styles";

type BookInstanceTableItemProps = {
    instance: BookInstance,
    index: number;
}

function BookInstanceTableItem({instance, index}: BookInstanceTableItemProps): JSX.Element {
    return (
        <TableRow>
            {/*<SlideInFromRight index={index}>*/}
            <TableCell>
                <Avatar src={instance.bookThumbnail} alt={instance.bookName}/>
            </TableCell>
            <TableCell>{instance.code}</TableCell>
            <TableCell><Typography component={Link} href={`resources/books/instance/${instance.id}`}
                                   color={"primary"}
                                   sx={{textDecoration: "underline"}}>{instance.bookName}</Typography></TableCell>
            <TableCell>{instance.bookName}</TableCell>
            <TableCell>{instance.shelfPosition}</TableCell>
            <TableCell>
                {instance.isInBorrowing}
            </TableCell>
            <TableCell>
                <NeumorphicButton variant="outlined">
                    {/*<Link href={`/instances/${instance.id}`}>*/}
                    {appStrings.VIEW}
                    {/*</Link>*/}
                </NeumorphicButton>
            </TableCell>
            {/*</SlideInFromRight>*/}

        </TableRow>
    );
}

export const SkeletonRow = memo(({index}: { index: number }) => {
    const theme = useTheme();
    const bgcolor = useMemo(() => theme.palette.grey[400], [theme])

    return (<TableRow>
        <TableCell>
            <Skeleton sx={{bgcolor}} variant="circular" width={40} height={40}/>
        </TableCell>
        <TableCell>
            <Skeleton sx={{bgcolor}} width="60%"/>
        </TableCell>
        <TableCell>
            <Skeleton sx={{bgcolor}} width="80%"/>
        </TableCell>
        <TableCell>
            <Skeleton sx={{bgcolor}} width="80%"/>
        </TableCell>
        <TableCell>
            <Skeleton sx={{bgcolor}} width="50%"/>
        </TableCell>
        <TableCell>
            <Skeleton sx={{bgcolor}} width="40%"/>
        </TableCell>
        <TableCell>
            <Skeleton sx={{bgcolor}} variant="rectangular" width={80} height={36}/>
        </TableCell>
    </TableRow>)
});
export default memo(BookInstanceTableItem);

