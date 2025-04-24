"use client"
import React, {memo} from "react";
import {styled} from "@mui/system";
import {TextField} from "@mui/material";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

type TextFieldProps = {
    children?: React.ReactNode;
}

const NeumorphicTextField = styled(TextField)(({theme}) => ({
    mt: 3,
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
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-root': {
        height: '100%',
        borderRadius: '1rem',
        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
        paddingLeft: '1rem',
        color: theme.palette.text.primary,
        transition: 'box-shadow 0.3s ease',

        '&.Mui-focused': {
            boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
            bgColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            '& svg': {
                color: theme.palette.text.primary,
            },
        },
    },

    '& input::placeholder': {
        color: theme.palette.primary.main,
    },

    '& .MuiInputAdornment-root': {
        position: 'absolute',
        left: '1rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.grey["900"],
        transition: 'color 0.3s ease',
    },

}));

export default memo(NeumorphicTextField);
