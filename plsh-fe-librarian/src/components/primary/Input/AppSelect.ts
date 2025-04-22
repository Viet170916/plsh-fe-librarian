import {styled} from "@mui/system";
import {Select} from "@mui/material";

export const AppSelect = styled(Select)(({theme}) => ({
    fontSize: 13,
    borderRadius: 24,
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: 24,
    },
    '& .MuiSelect-select': {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
}));
