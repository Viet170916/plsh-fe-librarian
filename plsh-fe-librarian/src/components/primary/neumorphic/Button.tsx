"use client"
import {memo} from "react";
import {Button, ButtonProps} from "@mui/material";
import {styled} from "@mui/system";
import {NEUMORPHIC_COLORS, NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

type VariantType = 'primary' | 'secondary';

interface NeumorphicButtonProps extends ButtonProps {
    variant_2?: VariantType;
}

const NeumorphicButton = styled(({variant, ...rest}: NeumorphicButtonProps) => (
    <Button {...rest} disableRipple/>
))<NeumorphicButtonProps>(({theme, variant_2 = "secondary", color}) => {
    const colorTheme = color === "primary" ? ({
        light: theme.palette.primary.light as string,
        dark: theme.palette.primary.dark as string
    }) : (color === "warning" ? {
        light: theme.palette.warning.light as string,
        dark: theme.palette.warning.dark as string
    } : (color === "success" ? {
        light: theme.palette.success.light as string,
        dark: theme.palette.success.dark as string
    } : (color === "error" ? {
        light: theme.palette.error.light as string,
        dark: theme.palette.error.dark as string
    } : undefined)))
    return ({
        borderRadius: '1rem',
        textTransform: "none",
        justifySelf: 'center',
        fontSize: 10,
        transition: '0.3s ease',
        boxShadow: NEUMORPHIC_SHADOW.SHADOW(colorTheme),
        borderColor: "transparent",
        ...(variant_2 === 'primary' && {
            background: theme.palette[color ?? "primary"].main,
            color: theme.palette.grey["100"],
            boxShadow: NEUMORPHIC_SHADOW.CONVEX({
                light: theme.palette[color??"primary"].light as string,
                dark: theme.palette[color??"primary"].dark as string
            }),
            '&:hover': {
                color: NEUMORPHIC_COLORS.WHITE,
                background: theme.palette[color??"primary"].main,
                boxShadow: NEUMORPHIC_SHADOW.CONVEX({
                    light: theme.palette[color??"primary"].light as string,
                    dark: theme.palette[color??"primary"].dark as string
                }),
            },
            '&:active': {
                boxShadow: NEUMORPHIC_SHADOW.CONCAVE({
                    light: theme.palette[color??"primary"].light,
                    dark: theme.palette[color??"primary"].dark
                }),
            },
        }),
        ...(variant_2 === 'secondary' && {
            backgroundColor: theme.palette.background.default,
            // backgroundColor: '#0063cc',
            color: theme.palette.primary[200],
            '&:hover': {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                boxShadow: NEUMORPHIC_SHADOW.SHADOW(colorTheme),
            },
            '&:active': {
                // backgroundColor: '#0069d9',
                transform: 'none',
                backgroundColor: theme.palette.background.default,
                boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(colorTheme),
            }
        }),
    })
});

export default memo(NeumorphicButton);

