"use client"
import React, {JSX, memo, useMemo} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {FaHeadphones} from "react-icons/fa6";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {theme} from "@/components/BasicLayout";
import StarRating from "@/components/primary/StarRating";
import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import {Availability} from "@/helpers/appType";

interface IProps {
    children?: React.ReactNode;
}

function BookDetails(props: IProps): JSX.Element {
    const availability = useMemo<Availability[]>(() => [{
        kind:"physical",
        title: "Sách vật lý",
        isChecked: true,
    }, {
        kind:"e-book",
        title: "Sách điện tử",
        isChecked: true,
    }, {
        kind:"audio",
        title: "Sách nói",
        isChecked: false,
    },], [])
    return (
        <Box sx={{width: "100%", height: 381, position: "relative"}}>
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
                        Don’t Make Me Think
                    </Typography>
                    <Typography variant="body1" sx={{color: "#4c4c4c"}}>
                        By <span style={{textDecoration: "underline"}}>Steve Krug</span>
                        , 2000
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{color: "#9a9a9a"}}>
                    Second Edition
                </Typography>
            </Box>

            <Grid
                container
                spacing={3}
                justifyContent="start"
                alignItems="center"
            >
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <StarRating value={4}/>
                    <Typography variant="body2" sx={{color: "#4c4c4c"}}>
                        5.0 Ratings
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{color: "#333333"}}>
                    25 Currently reading
                </Typography>
                <Typography variant="body2" sx={{color: "#333333"}}>
                    119 Have read
                </Typography>
            </Grid>

            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "bold", color: "#4c4c4c"}}
                    >
                        Availability
                    </Typography>
                    <List>
                        {/*<Grid container>*/}
                        {availability
                            .map(i => (
                                <ListItem key={i.title}>
                                    <AvailabilityItem kind={i.kind} title={i.title} isChecked={i.isChecked}/>
                                </ListItem>
                            ))}
                        {/*</Grid>*/}
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
                        <ListItem>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{textTransform: "none"}}
                            >
                                In-Shelf
                            </Button>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <LocationOnIcon sx={{color: "#4c4c4c"}}/>
                            </ListItemIcon>
                            <ListItemText primary="CS A-15"/>
                        </ListItem>
                    </List>
                </Box>
            </Box>

            <Grid
                container
                width={"100%"}
                spacing={3}
            >
                <Grid size={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        color={"primary"}
                        sx={{
                            background: color.PRIMARY + "!important",
                            height: 61,
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{color: "white"}}>
                            BORROW
                        </Typography>
                    </Button>
                </Grid>
                <Grid size={6}>
                    <Button
                        fullWidth
                        color={"secondary"}
                        variant="contained"
                        sx={{
                            background: color.SECONDARY + "!important",
                            height: 61,
                            borderRadius: 1,
                        }}
                    >
                        <Grid container justifyContent={"center"} alignItems={"center"} spacing={1}>
                            <Typography variant="h6" sx={{color: "white"}}>
                                Read Now
                            </Typography>
                            <FaHeadphones color={color.WHITE}/>
                        </Grid>

                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}


export default memo(BookDetails);