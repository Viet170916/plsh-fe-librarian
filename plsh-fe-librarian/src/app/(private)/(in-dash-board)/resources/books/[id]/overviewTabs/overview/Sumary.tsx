import appStrings from "@/helpers/appStrings";
import {BookData} from "@/helpers/appType";
import {color, language} from "@/helpers/resources";
import {Box, Skeleton, Typography} from "@mui/material";
import Link from "next/link";
import React, {memo} from "react";

interface IProps {
    book: BookData;
}

function Summary({book}: IProps) {
    return (
        <Box sx={{top: 134, left: 0}}>
            <Typography variant="body2" fontWeight="bold">
        <span style={{color: color.DARK_TEXT}}>
          {appStrings.book.AVAILABLE_WITH}{" "}
        </span>
                <Link href="#" color="primary">
                    {language[book.language ?? "undefined"]}
                </Link>
            </Typography>
            <Box sx={{top: 156, left: 0}}>
                <Typography variant="body2">
                    {book.description}
                    {/*<Link href = "#" color = "primary">*/}
                    {/*  Read more*/}
                    {/*</Link>*/}
                </Typography>
            </Box>
        </Box>
    );
}

export const SummarySkeleton = memo(() => (
    <Box sx={{top: 134, left: 0}}>
        <Typography variant="body2" fontWeight="bold">
            <Skeleton
                variant="text"
                width={100}
                sx={{
                    backgroundColor: color.WHITE, borderRadius: 3,
                    display: "inline-block",
                }}
            />
            <Link href="#" color="primary">
                <Skeleton
                    variant="text"
                    width={150}
                    sx={{
                        backgroundColor: color.WHITE, borderRadius: 3,
                        display: "inline-block",
                    }}
                />
            </Link>
        </Typography>
        <Box sx={{top: 156, left: 0}}>
            <Typography variant="body2">
                <Skeleton
                    variant="text"
                    width="100%"
                    sx={{backgroundColor: color.WHITE, borderRadius: 3}}
                />
            </Typography>
        </Box>
    </Box>
));
export default memo(Summary);
