import React, {memo} from "react";
import {Box, TextField, Typography} from "@mui/material";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import {useDispatch} from "react-redux";
import {useSelector} from "@/hooks/useSelector";
import {BookOverview, setValueInOverview} from "@/stores/slices/book-states/book.add-edit.slice";
import {FieldPathValue} from "react-hook-form";

interface IProps {
    children?: React.ReactNode;
}

export const EditCom = memo(({overviewKey, editType, disabled, placeholder}: {
    disabled?: boolean,
    editType?: "number" | "string",
    overviewKey: keyof BookOverview,
    placeholder?: string
}) => {
    const dispatch = useDispatch();
    const value: FieldPathValue<BookOverview, keyof BookOverview> = useSelector(state => state.addEditBookData.overview[overviewKey]);

    function onChange(value: FieldPathValue<BookOverview, keyof BookOverview>) {
        dispatch(setValueInOverview({key: overviewKey, value}));
    }

    return (
        <TextField
            placeholder={placeholder}
            disabled={disabled}
            type={editType ?? "text"}
            sx={{}}
            size="small"
            onChange={(e) => onChange(e.target.value)}
            value={value ?? ""}
        />

    )
})

function Add_EditAbout(props: IProps) {
    return (<Box
        sx={{
            width: "100%",
            height: "fit-content",
            bgcolor: color.WHITE,
            border: 1,
            borderColor: color.SHADOW,
            borderRadius: 1,
            p: 2,
        }}
    >
        <Typography variant="h6" fontWeight="bold" color="textSecondary">
            {appStrings.book.DETAIL}
        </Typography>

        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.PUBLISHER}
            </Typography>
            <Box>
                <EditCom overviewKey={"publisher"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.SERIES}
            </Typography>
            <Box>
                <EditCom overviewKey={"series"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.PRICE}
            </Typography>
            <Box>
                <EditCom overviewKey={"price"} editType={"number"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.PAGE_COUNT}
            </Typography>
            <Box>
                <EditCom overviewKey={"pageCount"} editType={"number"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.ISBN10}
            </Typography>
            <Box>
                <EditCom overviewKey={"isbNumber10"}/>
            </Box>
        </Box><Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
        <Typography variant="body2" fontWeight="bold" color="textSecondary">
            {appStrings.book.ISBN13}
        </Typography>
        <Box>
            <EditCom overviewKey={"isbNumber13"}/>
        </Box>
    </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.OTHER_IDENTIFIER}
            </Typography>
            <Box>
                <EditCom overviewKey={"otherIdentifier"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                {appStrings.book.LIBRARY_CODE}
            </Typography>
            <EditCom overviewKey={"otherIdentifier"} disabled placeholder={"XXXX-XXXX-XXXX"}/>

        </Box>
    </Box>)
}

export default memo(Add_EditAbout);