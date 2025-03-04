import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import Typography from "@/components/primary/typography";
import {truncateTextStyle} from "@/style/text.style";
import {Skeleton} from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}


function BookRowSkeletonItem(props: IProps) {
    return (
        <Grid container
              size={12}
              spacing={2}
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={2}
              paddingRight={2}
              borderRadius={"10px"}
              overflow="hidden"
              sx={{background: color.PAGE_BACKGROUND}}
        >
            <Grid columnSpacing={2} container size={4} height={100}
                  justifyContent={"center"}
                  alignItems={"center"}>
                <Grid size={3} borderRadius={"5px"} overflow={"hidden"} justifyContent={"center"}>


                    <Skeleton
                        variant="rectangular"
                        width={75}
                        height={100}
                    />
                </Grid>
                <Grid container size={9} spacing={0}>
                    <Grid size={12}><Skeleton animation="wave"/></Grid>
                    <Grid size={12}><Skeleton animation="wave"/></Grid>
                    <Grid size={12}><Skeleton animation="wave"/></Grid>

                </Grid>

            </Grid>

            <Grid container size={1} spacing={1} justifyContent="center" alignItems="center">
                <Grid size={6}>
                    <Skeleton animation="wave"/>
                </Grid>
                <Grid size={6} fontSize={15}>
                    <Skeleton animation="wave"/>
                </Grid>
            </Grid>
            <Grid container size={1}>
                <Skeleton width={"100%"} animation="wave"/>

            </Grid>
            <Grid container size={2} spacing={1}>
                <Grid size={12}><Skeleton animation="wave"/></Grid>
                <Grid size={12}><Skeleton animation="wave"/></Grid>
                <Grid size={12}><Skeleton animation="wave"/></Grid>
            </Grid>
            <Grid container size={1.5} spacing={0}>
                <Grid size={12}><Skeleton animation="wave"/></Grid>
                <Grid size={12}><Skeleton animation="wave"/></Grid>
            </Grid>

        </Grid>)
        ;
}

export default memo(BookRowSkeletonItem);