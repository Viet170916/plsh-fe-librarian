'use client'
import {TextField, TextFieldProps} from "@mui/material";
import {styled} from "@mui/material/styles";

export type TextFieldNoBorderProps = {
    fontSize?: number,
    padding?: number | string,
    textColor?: string

}

export const TextFieldNoBorder = styled(({
                                             textColor,
                                             fontSize,
                                             padding,
                                             ...props
                                         }: TextFieldNoBorderProps & TextFieldProps) => (
    <TextField {...props} />
))<TextFieldNoBorderProps>(({fontSize, padding, textColor}) => ({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '.MuiInputBase-input': {
            padding: padding,
            color: textColor,
        },
        fontSize: fontSize,
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
}));
