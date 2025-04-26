"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {useSelector} from "@/hooks/useSelector";
import {Box, Skeleton, Stack, Typography} from "@mui/material";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import Link from "next/link";
import appStrings from "@/helpers/appStrings";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

function BaseDisplay(): JSX.Element {
    const book = useSelector(state => state.bookInstanceState.currentBookInstance);

    return (
        <Grid container width={"100%"} sx={{mt: 1,}}>
            {book ?
                <Grid size={12} container spacing={2}>
                    <Grid sx={{p: 1, borderRadius: 2, boxShadow: NEUMORPHIC_SHADOW.SHADOW(),}}>
                        <Box sx={{
                            height: 270,
                            width: 200,
                            borderRadius: 1.5,
                            p: 1,
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW()
                        }}>
                            <ImageWithBgCover
                                src={book.bookThumbnail}
                            />
                        </Box>
                    </Grid>
                    <Grid size={"grow"}>
                        <Stack spacing={1}>

                            <Typography component={Link} href={`/resources/books/${book.bookId}`} variant="h3"
                                        fontWeight={"bold"} color={"textPrimary"}>
                                {book.bookName ?? "không có title"}
                            </Typography>
                            <Typography variant="h5" color="text.primary">
                                {`${appStrings.AUTHOR}: ${book.bookAuthor ?? "--"}`}
                            </Typography>
                            <Typography variant="h5" color="text.primary">
                                {`${appStrings.book.CATEGORY}: ${book.bookCategory ?? "--"}`}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                {`${appStrings.book.VERSION}: ${book.bookVersion ?? "--"}`}
                            </Typography>
                            <Typography variant="h4" color="text.primary">
                                {`${appStrings.book.CODE}: ${book.code}`}
                            </Typography>

                            <Typography variant="h6" color="text.primary">
                                {`${appStrings.book.POSITION}: ${book.shelfPosition}`}
                            </Typography>
                            <NeumorphicButton
                                variant_2="primary"
                                color={book.isInBorrowing ? "error" : "success"}
                                sx={{p: 0, width: "fit-content"}}
                            >
                                {book.isInBorrowing ? "Đang được mượn" : "Đang sẵn có"}
                            </NeumorphicButton>
                        </Stack>
                    </Grid>
                </Grid>
                : <BookInstanceSkeleton/>}


        </Grid>
    );
}


const BookInstanceSkeleton: React.FC = () => {
    return (
        <Grid container width={"100%"} sx={{mt: 1}}>
            <Grid size={12} container spacing={2}>
                {/* Thumbnail skeleton */}
                <Grid sx={{p: 1, borderRadius: 2, boxShadow: NEUMORPHIC_SHADOW.SHADOW()}}>
                    <Box
                        sx={{
                            height: 270,
                            width: 200,
                            borderRadius: 1.5,
                            p: 1,
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Skeleton variant="rectangular" width="100%" height="100%"/>
                    </Box>
                </Grid>

                {/* Text skeleton */}
                <Grid size="grow">
                    <Stack spacing={1}>
                        <Skeleton variant="text" height={40} width="60%"/>
                        <Skeleton variant="text" height={30} width="40%"/>
                        <Skeleton variant="text" height={30} width="50%"/>
                        <Skeleton variant="text" height={25} width="30%"/>
                        <Skeleton variant="text" height={35} width="45%"/>
                        <Skeleton variant="text" height={25} width="50%"/>
                        <Skeleton variant="rectangular" width={150} height={40} sx={{borderRadius: 2}}/>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default memo(BaseDisplay);

