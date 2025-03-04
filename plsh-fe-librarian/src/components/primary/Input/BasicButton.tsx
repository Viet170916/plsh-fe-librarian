import React, {memo} from "react";
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";

interface IProps {
    children?: React.ReactNode;
}

export const BasicButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: 0,
    border: "none",
    // lineHeight: 1.5,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});
