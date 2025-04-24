import {color} from "@/helpers/resources";
import {SxProps, Theme} from "@mui/material";
import {NEUMORPHIC_COLORS, NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

export const signInContainerStyle: SxProps<Theme> = {
    bgcolor: NEUMORPHIC_COLORS.GREY_LIGHT_1,
    borderRadius: 2,
    padding: "71px 71px !important",
    boxShadow: NEUMORPHIC_SHADOW.SHADOW({light: NEUMORPHIC_COLORS.PRIMARY_LIGHT, dark: NEUMORPHIC_COLORS.PRIMARY_DARK}),
};
export const primaryContainerStyle: SxProps<Theme> = {
    background: "white",
    position: "relative",
    color: NEUMORPHIC_COLORS.TEXT_PRIMARY,
    overflow: "hidden",
    borderRadius: 2,
    padding: "0 !important",
    height: "calc(100vh - 60px)",
    width: "calc(100vw - 60px)",
    boxShadow: `1px 1px 20px 1px ${color.SHADOW}`,
};
export const navBarContainerStyle: SxProps<Theme> = {
    padding: "24px",
    height: "100%",
};
export const concaveContainerStyle: SxProps = {
    // background: color.CONCAVE_BACKGROUND,
    borderRadius: "10px !important",
    boxShadow: `inset 0.2rem 0.2rem 0.5rem ${color.CONCAVE_SHADOW}, inset -0.2rem -0.2rem 0.5rem ${color.CONCAVE_HIGHLIGHT}`,
};
export const shadowContainerStyle: SxProps<Theme> = {
    boxShadow: `0px 0px 4px ${color.SHADOW}`,
}
export const shadowStyle: SxProps<Theme> = {
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
}
export const primaryGradientBg: SxProps<Theme> = {
    background: `linear-gradient(to right, ${color.SIXTH},${color.PRIMARY})`,
}
