import appStrings from "@/helpers/appStrings";
import {BookData} from "@/helpers/appType";
import {color, language} from "@/helpers/resources";
import {Paper, Skeleton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo} from "react";

interface IProps {
    book: BookData;
}

function BaseInfo({book}: IProps) {
    return (
        <Grid container spacing={2}>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="caption" color="textPrimary" fontWeight="bold">
                        {appStrings.book.PUBLISH_AT}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        {book.publishDate}
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="caption" color="textPrimary" fontWeight="bold">
                        {appStrings.book.PUBLISHER}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                        {book.publisher}
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="caption" color="textPrimary" fontWeight="bold">
                        {appStrings.LANGUAGE}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                        {language[book.language ?? "undefined"]}
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="caption" color="textPrimary" fontWeight="bold">
                        {appStrings.book.PAGE_COUNT}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        {book.pageCount}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export const BaseInfoSkeleton = memo(() => {
    return (
        <Grid container spacing={2}>
            <Grid size={3}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={90}
                    sx={{backgroundColor: color.WHITE, borderRadius: 3}}
                />
            </Grid>
            <Grid size={3}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={90}
                    sx={{backgroundColor: color.WHITE, borderRadius: 3}}
                />
            </Grid>
            <Grid size={3}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={90}
                    sx={{backgroundColor: color.WHITE, borderRadius: 3}}
                />
            </Grid>
            <Grid size={3}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={90}
                    sx={{backgroundColor: color.WHITE, borderRadius: 3}}
                />
            </Grid>
        </Grid>
    );
});
export default memo(BaseInfo);
