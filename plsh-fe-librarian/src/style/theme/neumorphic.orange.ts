import {createTheme} from "@mui/material/styles";
import {viVN} from "@mui/x-date-pickers/locales";
import {genericThemeOption} from "@/style/theme/config";

export const NEUMORPHIC_COLORS = {
    PRIMARY: '#FA7C54',
    PRIMARY_LIGHT: '#ff8f61',
    PRIMARY_DARK: '#d56947',
    GREY_LIGHT_1: "#e7e1df",
    GREY_LIGHT_2: "#c4bfbe",
    GREY_LIGHT_4: "#cab9b6",
    GREY_LIGHT_3: "#ffa470",
    GREY_DARK: "#d97a52",
    WHITE: "#FFFFFF",
    TEXT_PRIMARY_2: "#603122",

    WARNING_PRIMARY: '#F09643',
    WARNING_LIGHT: '#ffad4d',
    WARNING_DARK: '#cc8039',
    SUCCESS_PRIMARY: '#41B64D',
    SUCCESS_LIGHT: '#4bd159',
    SUCCESS_DARK: '#379b41',
    ERROR_PRIMARY: '#F34040',
    ERROR_LIGHT: '#ff4a4a',
    ERROR_DARK: '#cf3636',
    BACKGROUND: '#e0e5ec',
    TEXT_PRIMARY: '#3c3f52',
    TEXT_SECONDARY: '#ffffff',
    PAPER: '#e0e5ec',
    SHADOW_LIGHT: '#ffffff',
    SHADOW_DARK: '#a3b1c6',

};

export const NEUMORPHIC_SHADOW = {
    CONVEX(theme: {
        light: string,
        dark: string
    }) {
        return `inset 0.2rem 0.2rem 1rem ${theme.light}, inset -0.2rem -0.2rem 1rem ${theme.dark}, ${NEUMORPHIC_SHADOW.SHADOW()}`
    },
    CONCAVE(theme: {
        light: string,
        dark: string
    }) {
        return `inset 0.2rem 0.2rem 1rem ${theme.dark}, inset -0.2rem -0.2rem 1rem ${theme.light}`
    },

    INNER_SHADOW: (theme?: {
        light: string,
        dark: string
    }) => `inset .2rem .2rem .5rem ${theme?.dark ?? NEUMORPHIC_COLORS.GREY_LIGHT_2}, inset -.2rem -.2rem .5rem ${theme?.light ?? NEUMORPHIC_COLORS.WHITE}`,
    TEXT_INNER_SHADOW: (theme?: {
        light: string,
        dark: string
    }) => `inset .1rem .1rem .2rem ${theme?.dark ?? NEUMORPHIC_COLORS.GREY_LIGHT_2}, inset -.1rem -.1rem .2rem ${theme?.light ?? NEUMORPHIC_COLORS.WHITE}`,
    INNER_SHADOW_TOP_LEFT: `inset 0.4rem 0.4rem 0.6rem ${NEUMORPHIC_COLORS.GREY_LIGHT_2}`,
    SHADOW: (theme?: {
        light: string,
        dark: string
    }) => `.3rem .3rem .6rem ${theme?.dark ?? NEUMORPHIC_COLORS.GREY_LIGHT_2}, -.2rem -.2rem .5rem ${theme?.light ?? NEUMORPHIC_COLORS.WHITE}`,
    TEXT_SHADOW: (theme?: {
        light: string,
        dark: string
    }) => `.1rem .1rem .2rem ${theme?.dark ?? NEUMORPHIC_COLORS.GREY_LIGHT_2}, -.1rem -.1rem .2rem ${theme?.light ?? NEUMORPHIC_COLORS.WHITE}`,
}


export const neumorphicTheme = createTheme(
    {

        palette: {
            mode: 'light',
            primary: {
                main: NEUMORPHIC_COLORS.PRIMARY,
                light: NEUMORPHIC_COLORS.PRIMARY_LIGHT,
                dark: NEUMORPHIC_COLORS.PRIMARY_DARK,
                200: NEUMORPHIC_COLORS.GREY_LIGHT_3,
            },
            // secondary: {main: NEUMORPHIC_COLORS.SECONDARY},
            background: {
                default: NEUMORPHIC_COLORS.GREY_LIGHT_1,
                paper: NEUMORPHIC_COLORS.PAPER,
            },
            text: {
                primary: NEUMORPHIC_COLORS.TEXT_PRIMARY_2,
                secondary: NEUMORPHIC_COLORS.TEXT_SECONDARY,
                disabled: NEUMORPHIC_COLORS.GREY_LIGHT_2,
            },
            grey: {
                100: NEUMORPHIC_COLORS.GREY_LIGHT_1,
                200: NEUMORPHIC_COLORS.GREY_LIGHT_2,
                300: NEUMORPHIC_COLORS.GREY_LIGHT_3,
                400: NEUMORPHIC_COLORS.GREY_LIGHT_4,
                900: NEUMORPHIC_COLORS.GREY_DARK,
            },
            warning: {
                main: NEUMORPHIC_COLORS.WARNING_PRIMARY,
                light: NEUMORPHIC_COLORS.WARNING_LIGHT,
                dark: NEUMORPHIC_COLORS.WARNING_DARK,
            },
            success: {
                main: NEUMORPHIC_COLORS.SUCCESS_PRIMARY,
                light: NEUMORPHIC_COLORS.SUCCESS_LIGHT,
                dark: NEUMORPHIC_COLORS.SUCCESS_DARK,
            },
            error: {
                main: NEUMORPHIC_COLORS.ERROR_PRIMARY,
                light: NEUMORPHIC_COLORS.ERROR_LIGHT,
                dark: NEUMORPHIC_COLORS.ERROR_DARK,
            },

        },

        shape: {
            borderRadius: 12,
        },
        components: {
            MuiSkeleton: {
                styleOverrides: {
                    root: {
                        backgroundColor: NEUMORPHIC_COLORS.TEXT_SECONDARY,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        // backgroundColor: '#E4EBF5',
                        // color: '#6d5dfc',
                        borderRadius: '1rem',
                        boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                        '&:active': {
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: NEUMORPHIC_COLORS.GREY_LIGHT_1,
                        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    track: {
                        backgroundColor: NEUMORPHIC_COLORS.SHADOW_LIGHT,
                        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                    },
                    thumb: {
                        backgroundColor: NEUMORPHIC_COLORS.TEXT_PRIMARY,
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        backgroundColor: NEUMORPHIC_COLORS.GREY_LIGHT_1,
                        borderRadius: 8,
                        boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                        '&.Mui-checked': {
                            color: NEUMORPHIC_COLORS.PRIMARY,
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: ({theme}) => ({
                        borderRadius: '1rem',
                        background: theme.palette.background.default,
                        fontFamily: 'inherit',
                        color: theme.palette.text.primary,
                        '& label': {
                            color: theme.palette.primary.light,
                            transition: '0.3s ease',
                        },
                        '& label.Mui-focused': {
                            color: theme.palette.primary.main,
                        },
                        '& label.MuiInputLabel-shrink': {
                            transform: 'translate(10px, -18px) scale(0.75)',
                        },
                    }),
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({theme}) => ({
                        height: '100%',
                        borderRadius: '1rem',
                        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                        paddingLeft: '1rem',
                        color: theme.palette.text.primary,
                        transition: 'box-shadow 0.3s ease',
                        '&.Mui-focused': {
                            boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            '& svg': {
                                color: theme.palette.text.primary,
                            },
                        },
                    }),
                    notchedOutline: {
                        border: 'none',
                    },
                },
            },
            // MuiInputAdornment: {
            //     styleOverrides: {
            //         root: ({theme}) => ({
            //             position: 'absolute',
            //             left: '1rem',
            //             height: '100%',
            //             display: 'flex',
            //             alignItems: 'center',
            //             color: theme.palette.grey["900"],
            //             transition: 'color 0.3s ease',
            //         }),
            //     },
            // },
        },


        ...genericThemeOption,
        typography: {
            fontFamily: 'Poppins, sans-serif',

            ...genericThemeOption.typography,
        },
    },
    viVN
);
