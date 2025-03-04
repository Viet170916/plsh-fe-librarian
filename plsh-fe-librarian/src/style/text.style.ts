import {color} from "@/helpers/resources";
import {SxProps, Theme} from "@mui/material";

export const primaryTextStyle: SxProps<Theme> = {color: color.DARK_TEXT, justifySelf: "center"};
export const titleTextStyle: SxProps<Theme> = {fontWeight: "bold", fontSize: 33};
export const titleTextStyle_2: SxProps<Theme> = {fontSize: 20};
export const truncateTextStyle: SxProps<Theme> = {
    // width: "200px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1, // Số dòng tối đa trước khi cắt
    overflow: "hidden",
};
export const truncateMaxLineTextStyle = (maxLine: number): SxProps<Theme> => ({
    // width: "200px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: maxLine, // Số dòng tối đa trước khi cắt
    overflow: "hidden",
})