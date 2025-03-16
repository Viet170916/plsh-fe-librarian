"use client";
import ImageWithSkltWhileLoading from "@/components/primary/ImageWithSkltWhileLoading";
import Typography from "@/components/primary/typography";
import appStrings from "@/helpers/appStrings";
import {Availability, BookAvailability, BookAvailabilityStatus, BookData} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {truncateTextStyle} from "@/style/text.style";
import {Box, Chip, Link, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {timeYear} from "d3-time";
import React, {memo, useCallback, useMemo} from "react";
import {FaCircleCheck} from "react-icons/fa6";
import {IoIosCheckmarkCircle, IoIosCloseCircle} from "react-icons/io";
import {TbMapPinFilled} from "react-icons/tb";

interface IProps {
    children?: React.ReactNode,
    book: BookData
}

function BookRow(props: IProps) {
    return (
        <Grid
            container
            size={12}
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={2}
            paddingRight={2}
            borderRadius={"10px"}
            overflow="hidden"
            sx={{background: color.WHITE}}>

            <Link href={`/books/${props.book.id}`}>
                <Grid container
                      spacing={2}
                >

                    <Title title={props.book.title ?? ""} author={props.book.authors[0]??{}} version={props.book.version}
                           imageUrl={props.book.thumbnail}/>

                    <Grid container size={1} spacing={0} justifyContent="center" alignItems="center">
                        <Grid size={6}>
                            <Typography fontSize={20}>
                                {props.book.rating}
                            </Typography>
                        </Grid>
                        <Grid size={6} fontSize={15}>
                            <Typography
                                sx={{justifyContent: "start", alignItems: "end", color: color.DARK_LIGHTER_TEXT}}>
                                /5
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container size={1} spacing={0} justifyContent="start" alignItems="center">
                        <Typography fontSize={15} sx={{justifyContent: "start", ...truncateTextStyle}}>
                            {props.book.category.name}
                        </Typography>
                    </Grid>
                    <AvailabilityTable availabilityDataItems={props.book.availabilities}/>

                    <Status
                        bookAvailability={props.book.bookStatus
                        }/>

                </Grid>
            </Link>
        </Grid>

    );
}

function Status(props: { bookAvailability: BookAvailability }) {
    const inShelfBook = props.bookAvailability.bookAvailabilityStatuses.find(b => b.status === "In-Shelf");
    const getStatusData = useCallback((status: BookAvailabilityStatus) => {
        return props.bookAvailability.bookAvailabilityStatuses.find(b => b.status === status);
    }, [props.bookAvailability]);
    const chip = useMemo(() => {
                if (inShelfBook?.count === 0) {
                    return <Chip label={appStrings.CHECKED_OUT__UNAVAILABLE}
                                 sx={{background: color.SERIOUS, borderRadius: "5px!important"}}/>;
                }
                return <Chip label={`${appStrings.IN_SHELF} (${inShelfBook?.count} ${appStrings.unit.BOOK})`}
                             sx={{background: color.COMFORT, borderRadius: "5px!important"}}/>;
            },
            [inShelfBook?.count]
        )
    ;
    const colors = {
        "In-Shelf": color.COMFORT,
        "Checked Out": color.SIXTH,
        "Lost": color.SERIOUS,
        "Damaged": color.FOUR,
        "Processing": color.FIFTH,
    };
    const titles = {
        "In-Shelf": appStrings.IN_SHELF,
        "Checked Out": appStrings.CHECKED_OUT,
        "Lost": appStrings.LOST,
        "Damaged": appStrings.DAMAGED,
        "Processing": appStrings.PROCESSING,
    };
    return (
        <Grid container size={1.5} justifyContent="center" alignItems="center">
            <Tooltip title={
                <>
                    {props.bookAvailability.bookAvailabilityStatuses.map(sD => {
                        return (
                            <Grid container key={sD.status} marginBottom={1} marginTop={1}>
                                <Typography sx={{
                                    background: colors[sD.status],
                                    color: color.WHITE,
                                    borderRadius: "5px!important",
                                    padding: "0 5px"
                                }}>{`${titles[sD.status]}`}</Typography>
                                <Typography sx={{}}>{`: ${sD.count} ${appStrings.unit.BOOK}`}</Typography>
                            </Grid>
                        )
                            ;
                    })}
                </>
            }>
                {chip}
            </Tooltip>


            <Grid container size={12} spacing={2} alignSelf="center" alignItems={"center"}
                  justifyContent={"center"}>
                <TbMapPinFilled color={color.PRIMARY} size={16}/>
                <Typography fontSize={15} sx={{justifyContent: "start", alignItems: "center", ...truncateTextStyle}}>
                    {props.bookAvailability.position ?? appStrings.UNKNOWN}
                </Typography>

            </Grid>


        </Grid>
    )
        ;
}

function AvailabilityTable(props: {
    availabilityDataItems: Availability[]
}) {
    const availabilityItems = useMemo(() => {
        return (
            props.availabilityDataItems.map((availability, i) => (
                <AvailabilityItem
                    kind={availability.kind}
                    title={availability.title}
                    isChecked={availability.isChecked}
                    key={availability.title}/>))
        );
    }, [props.availabilityDataItems]);
    return (
        <Grid container size={2} spacing={0} justifyContent="start" alignItems="center">
            {availabilityItems}
        </Grid>
    );
}

export function AvailabilityItem(props: Availability) {
    return (
        <Grid container spacing={0.5} justifyContent="start" alignItems="center" width={"100%"}>
            {props.isChecked ? <IoIosCheckmarkCircle size={16} color={color.COMFORT}/> :
                <IoIosCloseCircle size={16} color={color.SERIOUS}/>}
            <Typography fontSize={15} sx={{justifySelf: "start", ...truncateTextStyle}}>{props.title}</Typography>
        </Grid>
    );
}

function Title(props: {
    imageUrl?: string,
    title?: string,
    author: { fullName?: string, birthYear?: string, deathYear?: string },
    version?: string
}) {
    return (
        <Grid columnSpacing={2} container size={4} height={100}
              justifyContent={"center"}
              alignItems={"center"}>
            <Grid size={3} borderRadius={"5px"} overflow={"hidden"} justifyContent={"center"}
                  alignItems={"center"}>
                <ImageWithSkltWhileLoading src={props.imageUrl ?? "https://image.com/ll"} width={75} height={100}/>
            </Grid>
            <Grid container size={9} rowSpacing={0} justifyContent={"start"} alignItems={"start"}
                  justifySelf={"start"}>
                <Grid size={12}>
                    <Typography sx={{justifySelf: "start", ...truncateTextStyle}} fontSize={20}>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Typography sx={{justifySelf: "start", ...truncateTextStyle}} fontSize={15}>
                        {`${props.author?.fullName}, ${props.author?.birthYear ?? ""}${props.author?.deathYear ? `-${props.author?.deathYear}` : ""}`}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Typography sx={{justifySelf: "start", ...truncateTextStyle}} fontSize={10}>
                        {props.version}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>);
}

export default memo(BookRow);