"use client";
import { Box, Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import React, { JSX, memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
const image2 = "https://via.placeholder.com/29";
const image3 = "https://via.placeholder.com/40";
const Add_EditBookLinks = (): JSX.Element => {
  return (
    <Card sx = { { width: 274, height: 297, bgcolor: "white", borderRadius: 2 } }>
      <CardContent
        sx = { { position: "relative", width: 215, height: 214, top: 2, left: 4 } }
      >
        <Box
          sx = { { position: "absolute", width: 40, height: 92, top: 39, left: 0 } }
        >
          <CardMedia
            component = "img"
            sx = { {
              width: 29,
              height: 29,
              position: "absolute",
              top: 63,
              left: 5,
            } }
            image = { image2 }
            alt = "Image"
          />
          <CardMedia
            component = "img"
            sx = { {
              width: 40,
              height: 40,
              position: "absolute",
              top: 0,
              left: 0,
            } }
            image = { image3 }
            alt = "Image"
          />
        </Box>
        <Typography
          variant = "h6"
          sx = { {
            position: "absolute",
            width: 207,
            height: 28,
            top: 0,
            left: 0,
            fontWeight: "bold",
            display: "inline",
          } }
        >
          <span style = { { color: "#f27851" } }>Buy</span>
          <span style = { { color: "#333333" } }> this book Online</span>
        </Typography>
        <Link
          href = "#"
          underline = "hover"
          sx = { {
            position: "absolute",
            width: 149,
            height: 28,
            top: 52,
            left: 51,
            fontWeight: "medium",
            color: "#4c4c4c",
            fontSize: 15,
          } }
        >
          Buy Now
        </Link>
        <Link
          href = "#"
          underline = "hover"
          sx = { {
            position: "absolute",
            width: 149,
            height: 28,
            top: 110,
            left: 51,
            fontWeight: "medium",
            color: "#4c4c4c",
            fontSize: 15,
          } }
        >
          Buy Now
        </Link>
        <Typography
          variant = "body2"
          sx = { {
            position: "absolute",
            width: 186,
            height: 45,
            top: 169,
            left: 0,
            fontWeight: "bold",
            color: "#333333",
            fontSize: 10.9,
          } }
        >
          When you buy books using these links the Internet Archive may earn a{ " " }
          <Link href = "#" underline = "hover">
            small commission
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default memo( Add_EditBookLinks );
