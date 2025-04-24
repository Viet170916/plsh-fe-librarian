import {createTheme} from "@mui/material/styles";
import {viVN} from "@mui/x-date-pickers/locales";
import {color} from "@/helpers/resources";
import {genericThemeOption} from "@/style/theme/config";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: color.PRIMARY,
        },
        secondary: {
            main: color.SECONDARY,
        },
    },
    ...genericThemeOption,
}, viVN);
