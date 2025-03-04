import React, {memo} from "react";
import {Box, Typography} from "@mui/material";
import Link from "next/link";

interface IProps {
    children?: React.ReactNode;
}

function Summary(props: IProps) {
    return (
        <Box sx={{top: 134, left: 0}}>
            <Typography variant="body2" fontWeight="bold">
                <span style={{color: "#666666"}}>Previews available in: </span>
                <Link href="#" color="primary">
                    English
                </Link>
            </Typography>
            <Box sx={{top: 156, left: 0}}>
                <Typography variant="body2">
                    Since Don’t Make Me Think was first published in 2000, hundreds of
                    thousands of Web designers and developers have relied on usability
                    guru Steve Krug’s guide to help them understand the principles of
                    intuitive navigation and information design. Witty, commonsensical,
                    and eminently practical, it’s one of the best-loved and most...
                    <Link href="#" color="primary">
                        Read more
                    </Link>
                </Typography>
            </Box>

        </Box>

    )
}

export default memo(Summary);