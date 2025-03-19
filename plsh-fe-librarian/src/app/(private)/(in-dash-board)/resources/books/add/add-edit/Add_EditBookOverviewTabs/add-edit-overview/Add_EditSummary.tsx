import React, {memo} from "react";
import {Box, TextField, Typography} from "@mui/material";
import Link from "next/link";
import {color, language, languages} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {LanguageCode} from "@/helpers/appType";
import {setBookOverview, setValueInOverview} from "@/stores/slices/book-states/book.add-edit.slice";

const Language = memo(function () {
    const langCode: LanguageCode = useSelector((state: RootState) => state.addEditBookData.overview.language as LanguageCode, shallowEqual);
    return (
        <Link href="#" color="primary">
            {language[langCode]}
        </Link>)
})
const Detail = memo(function () {
    const detail = useSelector((state: RootState) => state.addEditBookData.overview.description, shallowEqual);
    const dispatch = useDispatch();
    return (
        <TextField sx={{}} multiline fullWidth variant="outlined" value={detail}
                   onChange={(e) =>
                       dispatch(setValueInOverview({key: "description", value: e.target.value}))
                   }
        />

    )
})

function Add_EditSummary() {
    return (
        <Box sx={{top: 134, left: 0}}>
            <Typography variant="body2" fontWeight="bold">
                <span style={{color: color.DARK_TEXT}}>{appStrings.LANGUAGE}: </span>
                <Language/>
            </Typography>
            <Box sx={{top: 156, left: 0}}>
                <Detail/>
            </Box>

        </Box>

    )
}

export default memo(Add_EditSummary);