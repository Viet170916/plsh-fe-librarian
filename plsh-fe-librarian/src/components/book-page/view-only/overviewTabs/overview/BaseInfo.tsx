import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import {Paper, Typography} from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}

function BaseInfo(props: IProps) {
    return (
        <Grid container spacing={2}>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                    >
                        Publish Date
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        2000
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                    >
                        Publisher
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                        New Riders Press
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                    >
                        Language
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                        English
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={3}>
                <Paper
                    sx={{
                        p: 2.5,
                        textAlign: "center",
                        border: 1,
                        borderColor: "#dddddd",
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                    >
                        Pages
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        216
                    </Typography>
                </Paper>
            </Grid>
        </Grid>)
}

export default memo(BaseInfo);