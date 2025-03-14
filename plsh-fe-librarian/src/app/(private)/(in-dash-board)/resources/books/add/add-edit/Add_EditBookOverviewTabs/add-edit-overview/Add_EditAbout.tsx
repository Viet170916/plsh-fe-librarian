import React, {memo} from "react";
import {Box, Typography} from "@mui/material";
import {color} from "@/helpers/resources";

interface IProps {
    children?: React.ReactNode;
}

function Add_EditAbout(props: IProps) {
    return (<Box
        sx={{
            width: "100%",
            height: "fit-content",
            bgcolor: color.WHITE,
            border: 1,
            borderColor: color.SHADOW,
            borderRadius: 1,
            p: 2,
        }}
    >
        <Typography variant="h6" fontWeight="bold" color="textSecondary">
            Book Details
        </Typography>

        <Box sx={{mt: 2}}>
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                Published in
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                United States
            </Typography>
        </Box>

        <Box sx={{mt: 2}}>
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                Edition Notes
            </Typography>
            <Box sx={{mt: 1}}>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    Series
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    Dover large print classics
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    Genre
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    Fiction.
                </Typography>
            </Box>
        </Box>

        <Box sx={{mt: 2}}>
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                Classifications
            </Typography>
            <Box sx={{mt: 1}}>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    Dewey Decimal Class
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    823/.8
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    Library of Congress
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    PR5485 .A1 2002
                </Typography>
            </Box>
        </Box>

        <Box sx={{mt: 2}}>
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                The Physical Object
            </Typography>
            <Box sx={{mt: 1}}>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    Pagination
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    ix, 112 p. (large print) ;
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    Number of pages
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    216
                </Typography>
            </Box>
        </Box>

        <Box sx={{mt: 2}}>
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                ID Numbers
            </Typography>
            <Box sx={{mt: 1}}>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    My Book Shelf
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    OL3570252M
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    ISBN 10
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    0486424715
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    LCCN
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    2002073560
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    Library Thing
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    12349
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                    sx={{mt: 1}}
                >
                    Goodreads
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="textSecondary"
                >
                    690668
                </Typography>
            </Box>
        </Box>
    </Box>)
}

export default memo(Add_EditAbout);