"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import {JSX, memo} from "react";
import {color} from "@/helpers/resources";


import {
    Autocomplete,
    Avatar,
    Box,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import {BsUpcScan} from "react-icons/bs";
import {FiSearch} from "react-icons/fi";
import {TbBellFilled} from "react-icons/tb";
import {truncateTextStyle} from "@/style/text.style";
import {styled} from "@mui/material/styles";
import {FaCaretDown} from "react-icons/fa6";
import {TextFieldNoBorder} from "@/components/primary/Input/TextFieldNoBorder";

const primaryHeight = "47px";

const SearchBox = styled(Box)<{ width?: number | string; height?: number | string }>
(({width, height}) => (
    {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.WHITE,
        width: width ?? "100%",
        borderRadius: 47 / 2,
        boxShadow: `0px 0px 4px ${color.SHADOW}`,
        height: height ?? primaryHeight,
        minHeight: primaryHeight,
        padding: "0 5px",
    }));

const PrimarySearchAppBar = (): JSX.Element => {
    const options = [
        {title: "All", id: 1},
        {title: "this is a long text to test how the long text display on the text field", id: 2},
        {title: "test 2", id: 3},
        {title: "test3", id: 4}];


    return (

        <Box sx={{flexGrow: 1, padding: "38px 0"}}>
            <AppBar position="static" sx={{boxShadow: 'none', background: 'transparent'}}>
                <Toolbar sx={{background: "transparent", color: color.DARK_TEXT}}>
                    <Grid
                        container
                        alignItems="center"
                        width="100%"
                        spacing={1}
                        justifyContent="space-between"
                        sx={{height: "100%"}}
                    >
                        <Grid size={8}>
                            <SearchBar/>
                        </Grid>
                        <Grid size={2} justifyContent="center" alignItems="center" container>
                            <SearchBox>
                                <IconButton>
                                    <TbBellFilled color={color.PRIMARY}/>
                                </IconButton>
                            </SearchBox>
                        </Grid>
                        <Grid size={2} container alignItems="end" justifyContent={"end"}>
                            <SearchBox>
                                <Grid container alignItems="center" justifyContent={"center"} width={"100%"}
                                      spacing={1}>
                                    <Grid alignSelf={"start"} size={3}>
                                        <Avatar src="ellipse-10.svg"/>
                                    </Grid>
                                    <Grid size={7}>
                                        <Typography>Kenson</Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <FaCaretDown/>
                                    </Grid>
                                </Grid>

                            </SearchBox>
                        </Grid>

                        <Grid size={6}>
                            <SearchBox height={"auto"} width={"fit-content"}>
                                <Autocomplete

                                    multiple
                                    limitTags={2}
                                    // id="multiple-limit-tags"
                                    options={options}
                                    getOptionLabel={(option) => option.title}
                                    defaultValue={[options[0]]}
                                    renderInput={(params) => (
                                        <TextFieldNoBorder {...params} variant="outlined" placeholder={" category"}

                                                   size="small"
                                                   sx={{
                                                       padding: 0,
                                                       height: "100%", ...truncateTextStyle,
                                                   }}/>
                                    )}
                                    sx={{
                                        maxWidth: "100%",
                                        width: "100%",
                                        overflowX: 'hidden',
                                        justifySelf: "center",
                                        alignSelf: "center"
                                    }}
                                />
                            </SearchBox>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
const SearchBar = memo(function SearchBar(): JSX.Element {
    const options = [{title: "All", id: 1}, {title: "2gfchjfgkgjhj", id: 2}];
    return (
        <SearchBox>
            <Grid container spacing={1} width={"100%"}>
                <Grid size={3}>
                    <Autocomplete
                        limitTags={1}
                        id="multiple-limit-tags"
                        options={options}
                        getOptionLabel={(option) => option.title}
                        defaultValue={options[0]}
                        renderInput={(params) => (
                            <TextFieldNoBorder {...params} variant="outlined" placeholder={" category"}
                                       sx={{padding: 0, height: "100%", ...truncateTextStyle}}/>
                        )}
                        sx={{width: "100%", overflowX: 'hidden', justifySelf: "center", alignSelf: "center"}}
                    />
                </Grid>
                <Grid size={8}>
                    <TextFieldNoBorder

                        variant="outlined"
                        placeholder="Search"
                        sx={{width: "100%", marginLeft: "10px"}}
                    />
                </Grid>
                <Grid size={1} container>
                    <Grid size={6}>
                        <IconButton>
                            <FiSearch color={color.PRIMARY}/>
                        </IconButton>
                    </Grid>
                    <Grid size={6}>
                        <IconButton>
                            <BsUpcScan color={color.PRIMARY}/>
                        </IconButton>
                    </Grid>
                </Grid>


            </Grid>
        </SearchBox>);
});


export default memo(PrimarySearchAppBar);

