"use client";
import ImageWithSkltWhileLoading from "@/components/primary/ImageWithSkltWhileLoading";
import { color } from "@/helpers/resources";
import { truncateMaxLineTextStyle, truncateTextStyle } from "@/style/text.style";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { JSX, memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
const Add_EditBookAuthor = ( props: IProps ): JSX.Element => {
  return (
    <Box
      sx = { {
        position: "relative",
        // width: "100%",
        minWidth: 100,
        maxWidth: 386,
        height: 418,
        bgcolor: "white",
        borderRadius: 1,
        overflow: "hidden",
        p: 3,
        padding: "30px",
        margin: 0,
      } }
    >
      <Box
        sx = { {
          width: "100%",
        } }
      >
        {/*<ImageWithSkltWhileLoading width={75} height={99} alt="Rectangle" src={rectangle16}/>*/ }
        <Grid container width = { "100%" } spacing = { 1 }>
          <Grid size = { 6 }>
            <Typography
              variant = "h6"
              component = "p"
              sx = { {
                width: "100%",
                top: 0,
                left: 0,
                fontWeight: "bold",
                fontFamily: "Inter, Helvetica",
                color: "transparent",
                background: "linear-gradient(90deg, #f27851 50%, #4c4c4c 50%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              } }
            >
              About Author
            </Typography>
            <Typography
              variant = "h6"
              component = "div"
              sx = { {
                width: "100%",
                ...truncateTextStyle,
                top: 51,
                left: 0,
                fontFamily: "Inter, Helvetica",
                color: "#4c4c4c",
              } }
            >
              Steve Krug
            </Typography>
          </Grid>
          <Grid
            container
            size = { 6 }
            justifyContent = "end"
          >
            <div style = { { width: 88, height: 101, position: "relative" } }>
              <ImageWithSkltWhileLoading
                fill
                alt = "Rectangle"
                src = { "https://i.redd.it/c3uhsgo1vx541.jpg" }
              />
            </div>
          </Grid>
        </Grid>
        <Typography
          variant = "body2"
          component = "p"
          sx = { {
            ...truncateMaxLineTextStyle( 5 ),
            width: "100%",
            maxHeight: 100,
            fontFamily: "Inter, Helvetica",
            color: color.DARK_TEXT,
          } }
        >
          Steve Krug is a usability consultant who has more than 30 years of
          experience as a user advocate for companies like Apple, Netscape, AOL,
          Lexus, and others. Based in part on the success of his first book,
          Don&#39;t Make Me Think, he has become a highly sought-after speaker
          on usability design.
        </Typography>
      </Box>
      <Typography
        variant = "subtitle2"
        component = "div"
        sx = { {
          paddingTop: "40px",
          fontWeight: "bold",
          fontFamily: "Inter, Helvetica",
          color: "#4c4c4c",
        } }
      >
        Other Books
      </Typography>
      <Grid
        container
        spacing = { 6 }
      >
        <Box width = { 75 } height = { 99 } position = { "relative" }>
          <ImageWithSkltWhileLoading
            fill alt = "Rectangle"
            src = { "https://i.redd.it/c3uhsgo1vx541.jpg" }
          />
        </Box>
        <Box width = { 75 } height = { 99 } position = { "relative" }>
          <ImageWithSkltWhileLoading
            fill alt = "Rectangle"
            src = { "https://i.redd.it/c3uhsgo1vx541.jpg" }
          />
        </Box>
      </Grid>
    </Box>
  );
};
export default memo( Add_EditBookAuthor );
