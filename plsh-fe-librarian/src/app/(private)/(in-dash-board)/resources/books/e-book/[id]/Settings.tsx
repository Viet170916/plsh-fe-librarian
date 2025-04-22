"use client"
import React, {memo, useEffect, useState} from "react";
import {Chip, FormControl, IconButton, InputLabel, MenuItem, Stack, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToEBookState} from "@/stores/slices/book-states/e-book.book.slice";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import {TabBar} from "@/components/primary/navigation/TabBar";
import {AppSelect} from "@/components/primary/Input/AppSelect";
import AppChip from "@/components/primary/display/AppChip";


type ThemeOption = {
    label: string
    backgroundColor: string
    textColor: string
}

const themeOptions: ThemeOption[] = [
    {label: 'Sáng', backgroundColor: color.WHITE, textColor: color.DARK_TEXT},
    {label: 'Tối', backgroundColor: color.DARK, textColor: color.LIGHT_TEXT},
    {label: 'Ngà', backgroundColor: color.WARNING_BRIGHTER, textColor: color.PRIMARY80},
]

const EbookSettings = () => {
    const dispatch = useAppDispatch();
    const [fontSize, setFontSize] = useState(16)
    const [theme, setTheme] = useState<ThemeOption>(themeOptions[0]);
    useEffect(() => {
        if (fontSize) {
            dispatch(setPropToEBookState({key: "ebookSettings.fontSize", value: fontSize}));

        }
        if (theme) {
            dispatch(setPropToEBookState({
                key: "ebookSettings.theme",
                value: {bgcolor: theme.backgroundColor, color: theme.textColor}
            }));
        }
    }, [fontSize, theme, dispatch]);

    const handleFontSizeChange = (delta: number) => {
        setFontSize((prev) => (Math.max(10, prev + delta) > 5 && Math.max(10, prev + delta) < 31) ? Math.max(10, prev + delta) : prev)
    }

    return (
        <TabBar bgcolor={theme.backgroundColor} left={
            <Grid sx={{py: 1.1, color: theme.textColor, borderRadius: 2}} container>
                <Grid size={"grow"}>
                    <FormControl fullWidth>
                        <InputLabel id="theme-select-label" sx={{bgcolor: color.WHITE, px: .3}}>Chọn
                            giao
                            diện</InputLabel>
                        <AppSelect
                            labelId="theme-select-label"
                            value={theme.label}
                            onChange={(e) => {
                                const selected = themeOptions.find((t) => t.label === e.target.value);
                                if (selected) setTheme(selected);
                            }}
                            renderValue={(selectedValue) => {
                                const selected = themeOptions.find((t) => t.label === selectedValue);
                                if (!selected) return null;
                                return (
                                    <AppChip label={selected?.label}
                                             sx={{
                                                 bgcolor: selected?.backgroundColor,
                                                 color: selected?.textColor,
                                                 width: "100%"
                                             }}
                                             variant={"filled"}/>
                                );
                            }}
                        >
                            {themeOptions.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    <Chip label={option.label}
                                          sx={{bgcolor: option.backgroundColor, color: option.textColor, width: "100%"}}
                                          variant={"filled"}/>

                                </MenuItem>
                            ))}
                        </AppSelect>
                    </FormControl>
                </Grid>
                <Stack direction="row" spacing={1} alignItems="center" sx={{mx: 2}}>
                    <IconButton sx={{p: 0}} onClick={() => handleFontSizeChange(-1)} color="primary">
                        <RemoveIcon/>
                    </IconButton>
                    <Typography sx={{color: color.PRIMARY}}>{fontSize}</Typography>
                    <IconButton sx={{p: 0}} onClick={() => handleFontSizeChange(1)} color="primary">
                        <AddIcon/>
                    </IconButton>
                </Stack>
            </Grid>
        }/>

    )
}
export default memo(EbookSettings);

