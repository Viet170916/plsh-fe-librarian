"use client"
import React, {JSX, memo, useEffect, useState} from "react";

import {Typography} from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";

dayjs.extend(duration);

type TimeViewerProps = {
    targetDateTime: string;

}

function TimeViewer({targetDateTime}: TimeViewerProps): JSX.Element {

    const term = targetDateTime?.endsWith("z") || targetDateTime?.endsWith("Z") ? targetDateTime : `${targetDateTime}Z`;

    const target = dayjs(term);
    const base = dayjs("0000-01-01T00:00:00");

    const totalSeconds = target.diff(base, "second");

    const [currentSecond, setCurrentSecond] = useState(0);

    useEffect(() => {
        const steps = 20;
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            const percent = frame / steps;
            const newSeconds = Math.floor(totalSeconds * percent);
            setCurrentSecond(newSeconds);

            if (frame >= steps) clearInterval(interval);
        }, 600 / steps);

        return () => clearInterval(interval);
    }, [totalSeconds]);

    const result = dayjs("0000-01-01T00:00:00").add(currentSecond, "second");
    const date = dayjs(term);
    return (
        <Grid container spacing={1} width={"100%"} alignItems={"center"}>
            <Grid size={"grow"} container justifyContent={"end"}>
                <Typography variant="h4" sx={{fontFamily: 'Digital7, sans-serif', color: color.PRIMARY}}>
                    {result.format("HH:mm")}
                </Typography>
            </Grid>
            <Typography variant="h5" sx={{color: color.PRIMARY}}>
                {dayjs(term).format("dddd")},
            </Typography>
            <Typography variant="h5" sx={{color: color.PRIMARY, fontFamily: 'Digital7, sans-serif'}}>
                {date.format("DD")} / {date.format("MM")}, {date.format("YYYY")}
            </Typography>
        </Grid>
    );
}


export default memo(TimeViewer);

