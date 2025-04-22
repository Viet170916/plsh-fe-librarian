"use client"
import React, {JSX, memo, ReactNode, useState} from "react";
import {IconButton, Tooltip} from "@mui/material";
import {IoHelpCircleOutline} from "react-icons/io5";
import RightDrawer from "@/components/Animation/RightDrawer";
import {color} from "@/helpers/resources";

type HelperProps = {
    title: ReactNode;
    helpModalOption?: {
        render: ReactNode;
    }
}

function Helper({title, helpModalOption}: HelperProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Tooltip title={title}>
                <IconButton onClick={helpModalOption && (()=>setOpen(true))}>
                    <IoHelpCircleOutline color={color.DARK_TEXT}/>
                </IconButton>
            </Tooltip>
            {helpModalOption &&
                <RightDrawer open={open} onClose={() => setOpen(false)}>
                    {helpModalOption.render}
                </RightDrawer>
            }
        </>
    );
}

export default memo(Helper);

