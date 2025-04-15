"use client"
import React, {memo} from "react";
import {styled} from "@mui/material/styles";
import {Box, BoxProps, Card, CardProps, Skeleton} from "@mui/material";
import {color} from "@/helpers/resources";

interface IProps {
    src?: string;
}

// const ImageWithBgCover = styled(Box)<IProps>(({src}) => ({
//     width: "100%",
//     height: "100%",
//     backgroundImage: `url(${src})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
// }))
export const ImageWithBgCoverWithoutSkeleton = styled((props: BoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                width: "100%",
                height: "100%",
                ...props.sx,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: 2,
            }}
            width={props.width}
            height={props.height}
        >
            <Box id={"ImageCard-sdd32n-en32m-23n"} position={"absolute"}/>
        </Box>);
})<IProps>(({src}) => ({
    "#ImageCard-sdd32n-en32m-23n": {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
}));

const ImageWithBgCover = styled((props: BoxProps) => {
    return (
        <Box
            {...props}
            sx={{
                width: "100%",
                height: "100%",
                ...props.sx,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: 2,
            }}
            width={props.width}
            height={props.height}
        >
            <Skeleton sx={{bgcolor: color.PAGE_BACKGROUND}} animation="wave" variant="rectangular" height={"100%"} width={"100%"}/>
            <Box id={"ImageCard-sdd32n-en32m-23n"} position={"absolute"}/>
        </Box>)
})<IProps>(({src}) => ({
    "#ImageCard-sdd32n-en32m-23n": {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
}));
export default ImageWithBgCover;
