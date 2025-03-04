import React, {memo, useState} from "react";


import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import {TiStarFullOutline, TiStarOutline} from "react-icons/ti";
import {color} from "@/helpers/resources";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: color.SIXTH,
    },
    '& .MuiRating-iconHover': {
        color: color.PRIMARY,
    },
});

interface IProps {
    children?: React.ReactNode;
    value?: number;
    setValue?: (value: number|null) => void;
}

function StarRating(props: IProps) {
    return (
            <StyledRating
                onChange={(e, newValue)=>{props.setValue?.(newValue)}}
                name="customized-color"
                value={props.value}
                getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                // precision={0.5}
                icon={<TiStarFullOutline fontSize="inherit"/>}
                emptyIcon={<TiStarOutline fontSize="inherit"/>}
            />
    );
}


export default memo(StarRating);