"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import Typography from "@/components/primary/typography";
import appStrings from "@/helpers/appStrings";
import {Availability, BookAvailability, BookAvailabilityStatus, BookData} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {truncateTextStyle} from "@/style/text.style";
import {Chip, Link, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo, useCallback, useMemo} from "react";
import {IoIosCheckmarkCircle, IoIosCloseCircle} from "react-icons/io";
import {TbMapPinFilled} from "react-icons/tb";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {useTheme} from "@mui/material/styles";
import {FaCheck} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface IProps {
    children?: React.ReactNode,
    book: BookData
}

function BookRow(props: IProps) {
    return (
        <Grid
            container
            width={"100%"}
            size={12}
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={2}
            paddingRight={2}
            borderRadius={"10px"}
            overflow="hidden"
            sx={{background: color.WHITE}}
        >
            <Title
                title={
                    <Link href={`/resources/books/${props.book.id}`}>
                        {props.book.title ?? ""}
                    </Link>} author={props.book.authors[0] ?? {}}
                version={props.book.version}
                imageUrl={props.book.thumbnail}
            />
            <Grid container size={1} spacing={0} justifyContent="center" alignItems="center">
                <Grid size={6}>
                    <Typography fontSize={20}>
                        {props.book.rating}
                    </Typography>
                </Grid>
                <Grid size={6} fontSize={15}>
                    <Typography
                        sx={{justifyContent: "start", alignItems: "end", color: color.DARK_LIGHTER_TEXT}}
                    >
                        /5
                    </Typography>
                </Grid>
            </Grid>
            <Grid container size={1} spacing={0} justifyContent="start" alignItems="center">
                <Typography fontSize={15} sx={{justifyContent: "start", ...truncateTextStyle}}>
                    {props.book.category?.name}
                </Typography>
            </Grid>
            <AvailabilityTable availabilityDataItems={props.book.availabilities ?? []}/>
            {props.book.bookStatus && <Status
                bookAvailability={props.book.bookStatus
                }
            />}
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
                    return <Chip
                        label={appStrings.CHECKED_OUT__UNAVAILABLE}
                        sx={{background: color.SERIOUS, borderRadius: "5px!important"}}
                    />;
                }
                return <Chip
                    label={`${appStrings.IN_SHELF} (${inShelfBook?.count} ${appStrings.unit.BOOK})`}
                    sx={{background: color.COMFORT, borderRadius: "5px!important"}}
                />;
            },
            [inShelfBook?.count],
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
            <Tooltip
                title={
                    <>
                        {props.bookAvailability.bookAvailabilityStatuses.map(sD => {
                            return (
                                <Grid container key={sD.status} marginBottom={1} marginTop={1}>
                                    <Typography
                                        sx={{
                                            background: colors[sD.status],
                                            color: color.WHITE,
                                            borderRadius: "5px!important",
                                            padding: "0 5px",
                                        }}
                                    >{`${titles[sD.status]}`}</Typography>
                                    <Typography sx={{}}>{`: ${sD.count} ${appStrings.unit.BOOK}`}</Typography>
                                </Grid>
                            )
                                ;
                        })}
                    </>
                }
            >
                {chip}
            </Tooltip>
            <Grid
                container size={12} spacing={2} alignSelf="center" alignItems={"center"}
                justifyContent={"center"}
            >
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
                    key={availability.title}
                />))
        );
    }, [props.availabilityDataItems]);
    return (
        <Grid container size={2} spacing={0} justifyContent="start" alignItems="center">
            {availabilityItems}
        </Grid>
    );
}

export function AvailabilityItem(props: Availability) {
    const theme = useTheme();
    return (
        <Grid sx={{
            borderRadius: 1,
            py: .3,
            px: 1,
            m: .5,
            bgcolor: props.isChecked ? theme.palette.success.main : theme.palette.error.main,
            boxShadow: props.isChecked ? NEUMORPHIC_SHADOW.INNER_SHADOW({
                light: theme.palette.success.light,
                dark: theme.palette.success.dark
            }) : NEUMORPHIC_SHADOW.SHADOW()
        }}
              container spacing={0.5} justifyContent="start" alignItems="center" width={"100%"}>
            {props.isChecked ?
                <FaCheck size={16} color={theme.palette.text.secondary}/> :
                <IoClose size={16}  color={theme.palette.text.secondary}/>}
            <Typography color={"textSecondary"} fontSize={10}
                        sx={{justifySelf: "start", ...truncateTextStyle}}>{props.title}</Typography>
        </Grid>
    );
}

function Title(props: {
    imageUrl?: string,
    title?: React.ReactNode,
    author: { fullName?: string, birthYear?: string, deathYear?: string },
    version?: string
}) {
    return (
        <Grid
            columnSpacing={2} container
            size={4} height={100}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <ImageWithBgCover src={props.imageUrl ?? "https://image.com/ll"} sx={{width: 75, height: 100}}/>
            <Grid
                container size={"grow"} rowSpacing={0} justifyContent={"start"} alignItems={"start"}
                justifySelf={"start"}
            >
                <Grid size={12}>
                    <Typography sx={{alignSelf: "start", justifySelf: "start", ...truncateTextStyle}} fontSize={20}>
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
