"use client";
import StarRating from "@/components/primary/StarRating";
import appStrings from "@/helpers/appStrings";
import {BookData} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {IconButton, Skeleton, Tooltip, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo} from "react";
import {Zoom} from "@/components/Animation/animation";
import {BsMenuButton} from "react-icons/bs";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";

export const BookSkeleton = ({newBook, index}: { newBook?: boolean, index: number }) => (
    <Zoom index={index}>
        <Grid sx={{p: 2, bgcolor: color.WHITE, borderRadius: 3}} spacing={1} width={160} container>
            <Skeleton variant="rectangular" height={172} width={"100%"}
                      sx={{bgcolor: color.PAGE_BACKGROUND, borderRadius: 3}}/>
            {
                newBook ? <></> : <>
                    <Skeleton width="80%" height={20} sx={{bgcolor: color.PAGE_BACKGROUND}}/>
                    <Skeleton width="60%" height={15} sx={{bgcolor: color.PAGE_BACKGROUND}}/>
                    <Skeleton width="40%" height={15} sx={{bgcolor: color.PAGE_BACKGROUND, mt: 1}}/>
                </>
            }
        </Grid>
    </Zoom>

);
export const BookCard = memo(({book, newBook, onMenuSelect}: {
    book: BookData,
    newBook?: boolean,
    onMenuSelect?: (value: (((prevState: ({ id: number | null; anchorEl: HTMLElement | null } | null)) => ({
        id: number | null;
        anchorEl: HTMLElement | null
    } | null)) | { id: number | null; anchorEl: HTMLElement | null } | null)) => void
}) => {
    return (
        <Grid sx={{p: 2, bgcolor: color.WHITE, borderRadius: 3, position: "relative"}} spacing={1} width={"100%"}
              container height={"100%"}>
            <Tooltip title={appStrings.MENU}>

                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0, right: 0, bgcolor: color.WHITE, zIndex: 10,
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (book.id)
                            onMenuSelect?.({anchorEl: e.currentTarget, id: book.id});
                    }}>
                    <BsMenuButton color={color.DARK}/>
                </IconButton>
            </Tooltip>
            <ImageWithBgCover src={book.coverImageUrl ?? book.thumbnail} sx={{height: 172}}/>
            {
                newBook ? <></>
                    : <>
                        <Grid size={12}>
                            <Tooltip title={book.title}>
                                <Typography variant="body2" fontWeight="bold" noWrap sx={{color: color.DARK_TEXT}}>
                                    {book.title ?? "--"}
                                </Typography>
                            </Tooltip>
                        </Grid>
                        <Grid size={12}>

                            <Tooltip title={book.authors?.map((author) => author.fullName).join(", ")}>
                                <Typography variant="caption" color="textSecondary" noWrap>
                                    {appStrings.AUTHOR_NAME}: {book.authors?.map((author) => author.fullName).join(", ")}
                                </Typography>
                            </Tooltip>
                        </Grid>
                        <Grid container justifyContent={"center"} alignItems={"center"} spacing={1} size={12}>
                            <Grid size={"grow"}>
                                <StarRating value={book.rating && book.rating > 0 ? book.rating : 5} readOnly
                                            size={"small"}/>
                            </Grid>
                            <Typography sx={{fontWeight: "lighter", color: color.DARK_LIGHTER_TEXT}}
                                        variant={"h6"}>{`${book.rating ?? "-"}/5`}</Typography>
                        </Grid>

                    </>
            }
        </Grid>);
});
// const BookMenu = memo(({bookId}: { bookId: number }) => {
//     return();
//
// })
