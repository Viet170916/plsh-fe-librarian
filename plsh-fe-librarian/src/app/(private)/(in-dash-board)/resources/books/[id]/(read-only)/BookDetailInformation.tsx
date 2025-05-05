"use client";
import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import StarRating from "@/components/primary/StarRating";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {useSelector} from "@/hooks/useSelector";
import {useLazyGetBookAnalyticsQuery} from "@/stores/slices/api/analysis.api.slice";
import {Box, CircularProgress, List, ListItem, Skeleton, Tooltip, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {JSX, memo, useEffect} from "react";
import {FaHeadphones} from "react-icons/fa6";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

function BookDetails(): JSX.Element {
    const book = useSelector((state) => state.bookState.currentBook);
    const [getAnalytic, {data: analyticData, isLoading}] =
        useLazyGetBookAnalyticsQuery();
    useEffect(() => {
        if (book?.id) {
            getAnalytic(book.id);
        }
    }, [book, getAnalytic]);
    if (!book) {
        return <BookDetailSkeleton/>;
    }
    return (
        <Box sx={{width: "100%", position: "relative"}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography fontSize={35} sx={{color: color.DARK_TEXT}}>
                        {book.title}
                    </Typography>
                    <Grid
                        width={"100%"}
                        container
                        sx={{color: color.DARK_TEXT, gap: 1}}
                    >
                        {`${appStrings.WRITE_BY}: `}
                        <Grid
                            size={"grow"}
                            maxHeight={70}
                            sx={{overflowX: "hidden", overflowY: "auto"}}
                        >
                            <Box
                                display={"flex"}
                                flexWrap={"wrap"}
                                width={"100%"}
                                height={"fit-content"}
                                sx={{mt: 0.5}}
                            >
                                {book.authors ? (
                                    book.authors.map((author) => (
                                        <Typography
                                            width={"max-content"}
                                            variant={"h5"}
                                            key={`${author.id}-${author.fullName}`}
                                        >
                                            {`${author.fullName}, `}{" "}
                                        </Typography>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="body2" sx={{color: color.DARK_TEXT}}>
                    {book.version}
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="start" alignItems="center">
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <StarRating value={book.rating === 0 ? 5 : book.rating} readOnly/>
                    <Typography variant="body2" sx={{color: color.DARK_TEXT}}>
                        {book.rating === 0 ? appStrings.book.DEFAULT_RATING : `${book.rating} ${appStrings.unit.RATING}`}
                    </Typography>
                </Box>
                <Grid size={12}>
                    <Typography variant="body2" sx={{color: color.DARK_TEXT}}>
                        {isLoading ? (
                            <CircularProgress size="10px"/>
                        ) : (
                            (analyticData?.borrowedBooks ?? appStrings.NO_DATA)
                        )}{" "}
                        {appStrings.unit.CURRENTLY_READING}
                    </Typography>
                    <Typography variant="body2" sx={{color: color.DARK_TEXT}}>
                        {isLoading ? (
                            <CircularProgress size="10px"/>
                        ) : (
                            (analyticData?.totalBorrowCount ?? appStrings.NO_DATA)
                        )}{" "}
                        {appStrings.unit.HAVE_READ}
                    </Typography>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    gap: 4
                }}
            >
                <Box>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "bold", color: color.DARK_TEXT}}
                    >
                        {appStrings.AVAILABILITY}
                    </Typography>
                    <List>
                        <AvailabilityItem
                            kind={"physical"}
                            title={appStrings.book.PHYSIC_BOOK}
                            isChecked={(book.quantity ?? 0) > 0}
                        />
                        <Tooltip
                            title={
                                !(book.epubResource && true)
                                    ? appStrings.UNAVAILABLE
                                    : appStrings.HAS_SUPPORT
                            }
                        >
                            <Link
                                href={
                                    book.epubResource && true
                                        ? `/resources/books/e-book/${book.id}`
                                        : ""
                                }
                                aria-disabled={!(book.epubResource && true)}
                            >
                                <AvailabilityItem
                                    kind={"epub"}
                                    title={appStrings.book.E_BOOK}
                                    isChecked={book.epubResource && true}
                                />
                            </Link>
                        </Tooltip>
                        {/*<Tooltip*/}
                        {/*    title={*/}
                        {/*        !(book.audioResource && true)*/}
                        {/*            ? appStrings.UNAVAILABLE*/}
                        {/*            : appStrings.HAS_SUPPORT*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    <Link*/}
                        {/*        href={*/}
                        {/*            book.epubResource && true*/}
                        {/*                ? `/resources/books/audio/${book.id}`*/}
                        {/*                : ""*/}
                        {/*        }*/}
                        {/*        aria-disabled={!(book.audioResource && true)}*/}
                        {/*    >*/}
                        {/*        <AvailabilityItem*/}
                        {/*            kind={"audio"}*/}
                        {/*            title={appStrings.book.AUDIO_BOOK}*/}
                        {/*            isChecked={book.audioResource && true}*/}
                        {/*        />*/}
                        {/*    </Link>*/}
                        {/*</Tooltip>*/}
                    </List>
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "bold", color: "#4c4c4c"}}
                    >
                        Status
                    </Typography>
                    <List>
                        <Tooltip
                            title={`${appStrings.book.AVAILABILITY} ${analyticData?.availableBooks} ${appStrings.unit.BOOK}`}
                        >
                            <ListItem>
                                {(analyticData?.availableBooks ?? 0) > 0 ? (
                                    <NeumorphicButton
                                        loading={isLoading}
                                        variant_2={"primary"}
                                        color={"success"}
                                        sx={{
                                            textTransform: "none",
                                            background: color.COMFORT,
                                            color: color.LIGHT_TEXT,
                                        }}
                                    >
                                        {appStrings.book.ON_SHELF}
                                    </NeumorphicButton>
                                ) : (
                                    <NeumorphicButton
                                        loading={isLoading}
                                        variant_2={"primary"}
                                        color={"error"}
                                        sx={{
                                            textTransform: "none",
                                            background: color.SERIOUS,
                                            color: color.LIGHT_TEXT,
                                        }}
                                    >
                                        {appStrings.book.OUT_OF_STOCK}
                                    </NeumorphicButton>
                                )}
                            </ListItem>
                        </Tooltip>
                        {/*<ListItem>*/}
                        {/*  <ListItemIcon>*/}
                        {/*    <LocationOnIcon sx={{ color: "#4c4c4c" }} />*/}
                        {/*  </ListItemIcon>*/}
                        {/*  <ListItemText primary={book.} />*/}
                        {/*</ListItem>*/}
                    </List>
                </Box>
            </Box>
            <Grid container width={"100%"} spacing={3}>
                <Grid size={6}>
                    <NeumorphicButton
                        component={Link}
                        href={`/resources/books/${book.id}/edit`}
                        fullWidth
                        variant_2={"primary"}
                        color={"primary"}
                        sx={{
                            height: 61,
                        }}
                    >
                        <Typography variant="h6" sx={{color: "white"}}>
                            {appStrings.EDIT}
                        </Typography>
                    </NeumorphicButton>
                </Grid>
                <Grid size={6}>
                    <NeumorphicButton
                        disabled={!book.hasEbook}
                        component={Link}
                        href={`/resources/books/e-book/${book.id}`}
                        fullWidth
                        variant_2={"primary"}
                        color={"success"}
                        sx={{
                            height: 61,
                        }}
                    >
                        <Grid
                            container
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={1}
                        >
                            <Typography variant="h6" sx={{color: "white"}}>
                                {appStrings.book.READ}
                            </Typography>
                            <FaHeadphones color={color.WHITE}/>
                        </Grid>
                    </NeumorphicButton>
                </Grid>
            </Grid>
        </Box>
    );
}

const BookDetailSkeleton = memo(() => {
    return (
        <Box sx={{width: "100%", position: "relative"}}>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: 3}}>
                <Skeleton
                    sx={{bgcolor: color.PAGE_BACKGROUND}}
                    variant="text"
                    width={200}
                    height={40}
                />
                <Grid container width="100%" sx={{gap: 1}}>
                    <Skeleton
                        sx={{bgcolor: color.PAGE_BACKGROUND}}
                        variant="text"
                        width={150}
                        height={20}
                    />
                    <Skeleton
                        sx={{bgcolor: color.PAGE_BACKGROUND}}
                        variant="rectangular"
                        width={300}
                        height={40}
                    />
                </Grid>
            </Box>
            <Typography variant="body2">
                <Skeleton
                    sx={{bgcolor: color.PAGE_BACKGROUND}}
                    variant="text"
                    width={100}
                    height={20}
                />
            </Typography>
            <Grid container spacing={3} justifyContent="start" alignItems="center">
                <Skeleton
                    sx={{bgcolor: color.PAGE_BACKGROUND}}
                    variant="rectangular"
                    width={100}
                    height={20}
                />
                <Skeleton
                    sx={{bgcolor: color.PAGE_BACKGROUND}}
                    variant="text"
                    width={80}
                    height={20}
                />
                <Skeleton
                    sx={{bgcolor: color.PAGE_BACKGROUND}}
                    variant="text"
                    width={80}
                    height={20}
                />
            </Grid>
            <Box sx={{display: "flex", gap: 4, marginTop: 2}}>
                <Box>
                    <Typography variant="body2" sx={{fontWeight: "bold"}}>
                        Availability
                    </Typography>
                    <List>
                        <ListItem>
                            <Skeleton
                                sx={{bgcolor: color.PAGE_BACKGROUND}}
                                variant="rectangular"
                                width={200}
                                height={30}
                            />
                        </ListItem>
                        <ListItem>
                            <Skeleton
                                sx={{bgcolor: color.PAGE_BACKGROUND}}
                                variant="rectangular"
                                width={200}
                                height={30}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Box>
                    <Typography variant="body2" sx={{fontWeight: "bold"}}>
                        Status
                    </Typography>
                    <List>
                        <ListItem>
                            <Skeleton
                                sx={{bgcolor: color.PAGE_BACKGROUND}}
                                variant="rectangular"
                                width={100}
                                height={40}
                            />
                        </ListItem>
                        <ListItem>
                            <Skeleton
                                sx={{bgcolor: color.PAGE_BACKGROUND}}
                                variant="text"
                                width={80}
                                height={20}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Grid container width="100%" spacing={3} marginTop={2}>
                <Grid size={6}>
                    <NeumorphicButton fullWidth variant="contained" disabled>
                        <Skeleton
                            sx={{bgcolor: color.PAGE_BACKGROUND}}
                            variant="text"
                            width={80}
                            height={20}
                        />
                    </NeumorphicButton>
                </Grid>
                <Grid size={6}>
                    <NeumorphicButton fullWidth variant="contained" disabled>
                        <Skeleton
                            sx={{bgcolor: color.PAGE_BACKGROUND}}
                            variant="text"
                            width={80}
                            height={20}
                        />
                    </NeumorphicButton>
                </Grid>
            </Grid>
        </Box>
    );
});
export default memo(BookDetails);
