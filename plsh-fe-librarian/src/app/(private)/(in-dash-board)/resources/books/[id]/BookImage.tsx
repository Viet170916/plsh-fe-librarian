"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {useSelector} from "@/hooks/useSelector";
import NotesIcon from "@mui/icons-material/NoteOutlined";
import ReviewsIcon from "@mui/icons-material/RateReviewOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import {Box, Card, Typography} from "@mui/material";
import React, {memo} from "react";

const BookImage = () => {
    const imageFromSrc = useSelector(state => state.bookState.currentBook?.coverImageUrl);
    const thumbnail = useSelector(state => state.bookState.currentBook?.thumbnail);
    return (
        <Card
            sx={{
                width: 273,
                height: 405,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "white",
            }}
        >
            <Box sx={{width: 209, height: 277, margin: "32px"}} position={"relative"}>
                <ImageWithBgCover
                    src={imageFromSrc ?? thumbnail}
                />
            </Box>
            <Box
                sx={{
                    width: 193,
                    height: 52,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                }}
            >
                <Box sx={{textAlign: "center"}}>
                    <ReviewsIcon sx={{fontSize: 32}}/>
                    <Typography variant="body2" fontWeight="bold" color="#333333">
                        Review
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <NotesIcon sx={{fontSize: 32}}/>
                    <Typography variant="body2" fontWeight="bold" color="#333333">
                        Notes
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <ShareIcon sx={{fontSize: 32}}/>
                    <Typography variant="body2" fontWeight="bold" color="#333333">
                        Share
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};
export default memo(BookImage);
