import React, {memo} from "react";


import {styled} from '@mui/material/styles';
import Rating from '@mui/material/Rating';
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
    children?: React.ReactNode,
    value?: number,
    setValue?: (value: number | null) => void,
    readOnly?: boolean,
    size?: "small" | "medium" | "large",
}

function StarRating({setValue, value, readOnly, size = "medium"}: IProps) {
    return (
        <StyledRating
            onChange={(e, newValue) => {
                setValue?.(newValue)
            }}
            name="customized-color"
            value={value}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            // precision={0.5}
            icon={<TiStarFullOutline fontSize="inherit"/>}
            emptyIcon={<TiStarOutline fontSize="inherit"/>}
            readOnly={readOnly}
            size={size}
        />

    );
}


export default memo(StarRating);
