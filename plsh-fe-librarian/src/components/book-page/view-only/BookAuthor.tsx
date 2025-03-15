"use client"
import React, {JSX, memo} from "react";

interface IProps {
    displayAuthorPublication?: boolean;
    children?: React.ReactNode;
    author?: Author;
}

import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageWithSkltWhileLoading from "@/components/primary/ImageWithSkltWhileLoading";
import {truncateMaxLineTextStyle, truncateTextStyle} from "@/style/text.style";
import {color} from "@/helpers/resources";
import {Author} from "@/helpers/appType";
import appStrings from "@/helpers/appStrings";

const BookAuthor = (props: IProps): JSX.Element => {
    return (
        <Box
            sx={{
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
            }}
        >
            <Box
                sx={{
                    width: "100%",
                }}
            >

                {/*<ImageWithSkltWhileLoading width={75} height={99} alt="Rectangle" src={rectangle16}/>*/}
                <Grid container width={"100%"} spacing={1}>
                    <Grid size={6}>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                width: "100%",
                                top: 0,
                                left: 0,
                                fontWeight: "bold",
                                fontFamily: "Inter, Helvetica",
                                color: "transparent",
                                background: "linear-gradient(90deg, #f27851 50%, #4c4c4c 50%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                            }}
                        >
                            About Author
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                width: "100%",
                                ...truncateTextStyle,
                                top: 51,
                                left: 0,
                                fontFamily: "Inter, Helvetica",
                                color: "#4c4c4c",
                            }}
                        >
                            {props.author?.fullName ?? `${appStrings.AUTHOR_NAME}...`}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        size={6}
                        justifyContent="end"
                    >
                        <div style={{width: 88, height: 101, position: "relative"}}>
                            <ImageWithSkltWhileLoading
                                fill
                                alt="Rectangle"
                                src={props.author?.avatarUrl??null}/>

                        </div>

                    </Grid>


                </Grid>

                <Typography
                    variant="body2"
                    component="p"
                    sx={{
                        ...truncateMaxLineTextStyle(5),
                        width: "100%",
                        maxHeight: 100,
                        fontFamily: "Inter, Helvetica",
                        color: color.DARK_TEXT,
                    }}
                >
                    {props.author?.summaryDescription}
                </Typography>

            </Box>
            {(props.author?.publications && props.displayAuthorPublication)
                ? <>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                            paddingTop: "40px",
                            fontWeight: "bold",
                            fontFamily: "Inter, Helvetica",
                            color: "#4c4c4c",
                        }}
                    >
                        Other Books
                    </Typography>
                    <Grid
                        container
                        spacing={6}
                    >

                        <Box width={75} height={99} position={"relative"}>
                            <ImageWithSkltWhileLoading fill alt="Rectangle"
                                                       src={"https://i.redd.it/c3uhsgo1vx541.jpg"}/>
                        </Box>
                        <Box width={75} height={99} position={"relative"}>
                            <ImageWithSkltWhileLoading fill alt="Rectangle"
                                                       src={"https://i.redd.it/c3uhsgo1vx541.jpg"}/>
                        </Box>
                    </Grid></> : <></>
            }
        </Box>
    );
};


export default memo(BookAuthor);