import {createTheme} from "@mui/material";
import {viVN} from '@mui/x-date-pickers/locales';

export const color = {
    PRIMARY: "#FA7C54",
    PRIMARY_O10: "rgba(250,124,84,0.1)",
    SECONDARY: "#41B64D",
    COMFORT: "#41B64D",
    THIRD: "#F34040",
    LOVELY: "#F34040",
    SERIOUS: "#F34040",
    FOUR: "#926CFF",
    FIFTH: "#EC6C9A",
    SIXTH: "#F09643",
    WARNING: "#F09643",
    BRIGHT_TEXT: "#FFFFFF",
    DARK_TEXT: "#4D4D4D",
    DARK: "#4D4D4D",
    DARK_LIGHTER_TEXT: "#ABABAB",
    DARK_BUT_LIGHTER: "#ABABAB",
    LIGHT_TEXT: "#FFFFFF",
    SHADOW: "rgba(44,42,46,0.39)",
    LIGHTER_SHADOW: "rgba(44,42,46,0.19)",
    PAGE_BACKGROUND: "#F3F3F7",
    WHITE: "#FFFFFF",


    CONCAVE_SHADOW: "#c8d0e7",
    CONCAVE_HIGHLIGHT: "#FFFFFF",
    CONCAVE_BACKGROUND: "#E4EBF5",

};

export const theme = createTheme({
    palette: {
        primary: {
            main: color.PRIMARY,
        },
        secondary: {
            main: color.SECONDARY,
        }

    },
    // colorSchemes: { light: true, dark: false },
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    typography: {
        subtitle1: {fontSize: 13, fontWeight: 'lighter'},
        h1: {fontSize: 35,},
        h2: {fontSize: 30},
        h3: {fontSize: 25},
        h4: {fontSize: 20},
        h5: {fontSize: 14},
        h6: {fontSize: 12},
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
}, viVN);