import appStrings from "@/helpers/appStrings";
import {useSelector} from "@/hooks/useSelector";
import {BookOverview, setValueInOverview} from "@/stores/slices/book-states/book.add-edit.slice";
import {Box, Typography} from "@mui/material";
import React, {memo} from "react";
import {FieldPathValue} from "react-hook-form";
import {useDispatch} from "react-redux";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

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
        <NeumorphicTextField
            placeholder={placeholder}
            disabled={disabled}
            type={editType ?? "text"}
            sx={{}}
            size="small"
            onChange={(e) => onChange(e.target.value)}
            value={value ?? ""}
        />
    );
});

function Add_EditAbout(props: IProps) {
    return (<Box
        sx={{
            width: "100%",
            height: "fit-content",
            borderRadius: 1,
            p: 2,
            boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
        }}
    >
        <Typography variant="h6" fontWeight="bold" color="textPrimary">
            {appStrings.book.DETAIL}
        </Typography>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.PUBLISHER}
            </Typography>
            <Box>
                <EditCom overviewKey={"publisher"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.SERIES}
            </Typography>
            <Box>
                <EditCom overviewKey={"series"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.PRICE}
            </Typography>
            <Box>
                <EditCom overviewKey={"price"} editType={"number"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.PAGE_COUNT}
            </Typography>
            <Box>
                <EditCom overviewKey={"pageCount"} editType={"number"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.ISBN10}
            </Typography>
            <Box>
                <EditCom overviewKey={"isbnNumber10"}/>
            </Box>
        </Box><Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
        <Typography variant="body2" fontWeight="bold" color="textPrimary">
            {appStrings.book.ISBN13}
        </Typography>
        <Box>
            <EditCom overviewKey={"isbnNumber13"}/>
        </Box>
    </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.OTHER_IDENTIFIER}
            </Typography>
            <Box>
                <EditCom overviewKey={"otherIdentifier"}/>
            </Box>
        </Box>
        <Box sx={{mt: 2, gap: 2}} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {appStrings.book.LIBRARY_CODE}
            </Typography>
            <EditCom overviewKey={"libraryCode"} disabled placeholder={"XXXX-XXXX-XXXX"}/>
        </Box>
    </Box>);
}

export default memo(Add_EditAbout);
