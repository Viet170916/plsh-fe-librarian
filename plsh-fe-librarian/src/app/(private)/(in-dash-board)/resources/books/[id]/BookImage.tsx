import ImageWithSkltWhileLoading from "@/components/primary/ImageWithSkltWhileLoading";
import NotesIcon from "@mui/icons-material/NoteOutlined";
import ReviewsIcon from "@mui/icons-material/RateReviewOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import { Box, Card, Typography } from "@mui/material";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
interface BookImageProps{
  src: string;
}
const BookImage = ( props: BookImageProps ) => {
  return (
    <Card
      sx = { {
        width: 273,
        height: 405,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "white",
      } }
    >
      <Box sx = { { width: 209, height: 277, margin: "32px" } } position = { "relative" }>
        <ImageWithSkltWhileLoading
          fill
          src = { props.src }
        />
      </Box>
      <Box
        sx = { {
          width: 193,
          height: 52,
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        } }
      >
        <Box sx = { { textAlign: "center" } }>
          <ReviewsIcon sx = { { fontSize: 32 } } />
          <Typography variant = "body2" fontWeight = "bold" color = "#333333">
            Review
          </Typography>
        </Box>
        <Box sx = { { textAlign: "center" } }>
          <NotesIcon sx = { { fontSize: 32 } } />
          <Typography variant = "body2" fontWeight = "bold" color = "#333333">
            Notes
          </Typography>
        </Box>
        <Box sx = { { textAlign: "center" } }>
          <ShareIcon sx = { { fontSize: 32 } } />
          <Typography variant = "body2" fontWeight = "bold" color = "#333333">
            Share
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
export default memo( BookImage );
