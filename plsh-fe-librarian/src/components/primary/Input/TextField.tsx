'use client'

import React from 'react'
import {TextField, TextFieldProps} from '@mui/material'
import {styled} from '@mui/material/styles'

const AppTextField = styled((props: TextFieldProps) => (
    <TextField {...props} size="small"/>
))(({theme}) => ({
    minWidth: 200,
    '& .MuiOutlinedInput-root': {
        fontSize: '0.65rem',
        borderRadius: 40,
        padding: '2px 6px',
        '& input': {
            padding: '7px 6px',
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '0.65rem',
    },
}))

export default AppTextField
