"use client"
import {memo} from "react";
import {styled} from "@mui/material/styles";
import {Button, ButtonProps, ButtonPropsVariantOverrides} from "@mui/material";
import {color} from "@/helpers/resources";
import {OverridableStringUnion} from "@mui/types";

export interface AppButtonProps extends ButtonProps {
    variantType?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>;
}

function variantStyle(variant: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>, color: {
    bg: string,
    text: string,
    border?: string,
}) {
    switch (variant) {
        case "contained":
            return {
                backgroundColor: color.bg,
                color: color.text,
            }
        case "outlined":
            return {
                backgroundColor: color.bg,
                color: color.text,
                borderColor: color.border,
            }
        case "text":
            return {
                backgroundColor: color.bg,
                color: color.text,
            }
        default:
            return {}
    }
}

const AppButton = styled(Button)<ButtonProps>(({theme}) => ({
    // ...(variantStyle(variant ?? "outlined", {
    //     bg: sx?.background ?? sx?.bgColor ?? sx?.backgroundColor
    // })),
    fontSize: "10px",
    textTransform: "none",
    borderRadius: 6,
    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:disabled": {
        backgroundColor: color.PRIMARY_20,
        color: color.DARK_LIGHTER_TEXT,
    },
}));

export default memo(AppButton);

