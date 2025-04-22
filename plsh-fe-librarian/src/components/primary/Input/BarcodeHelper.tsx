"use client"
import React, {JSX, memo, useState} from "react";
import {CiBarcode} from "react-icons/ci";
import {IconButton, Tooltip} from "@mui/material";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";

type BarcodeHelperProps = {
    children?: React.ReactNode;
}

function BarcodeHelper({children}: BarcodeHelperProps): JSX.Element {
    const [active, setActive] = useState<boolean>(false);
    return (
        <Tooltip title={appStrings.guide.SCAN_BUTTON}>
            <IconButton
                onFocus={() => {
                    setActive(true)
                }}
                onBlur={() => setActive(false)}>
                <CiBarcode color={!active ? color.DARK_LIGHTER_TEXT : color.COMFORT}/>
            </IconButton>
        </Tooltip>

    );
}

export default memo(BarcodeHelper);

