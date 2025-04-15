"use client"
import React, {memo, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, CardContent, TextField} from "@mui/material";
import {CardDisplay, CardFormData} from "@/app/(private)/(in-dash-board)/members/[id]/card/Card";
import Grid from "@mui/material/Grid2";
import {useSelector} from "@/hooks/useSelector";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import appStrings from "@/helpers/appStrings";

const months = Array.from({length: 12}, (_, i) => `${i + 1}`.padStart(2, '0'));
const years = Array.from({length: 12}, (_, i) => `${new Date().getFullYear() + i}`);

function CardForm() {
    const member = useSelector((state) => state.memberState.currentMember);
    const {control, handleSubmit, watch, reset} = useForm<CardFormData>({
        defaultValues: {
            cardNumber: '',
            cardHolder: '',
            cardMemberExpiredDate: "",
            id: member?.id ?? 0,
        },
    });
    useEffect(() => {
        if (member)
            reset({
                cardNumber: member.cardMemberNumber?.toString() ?? "",
                cardHolder: member.fullName ?? "",
                cardMemberExpiredDate: member.cardMemberExpiredDate ?? "",
                id: member.id,
            });
    }, [member, reset]);

    const onSubmit = (data: CardFormData) => {
        console.log('Form submitted:', data);
    };

    return (
        <Box sx={{position: "relative", mx: 'auto',}}>
            <Box
                sx={{
                    maxWidth: 500,
                    backdropFilter: 'blur(10px)',
                    mt: 18,
                    mb: 4,
                    p: 4,
                    pt: 8,
                    position: 'relative',
                    bgcolor: '#f9f9f9',
                    borderRadius: 4,
                    boxShadow: 3,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Controller
                            name="cardNumber"
                            control={control}
                            render={({field}) =>
                                <TextField disabled fullWidth label="Card Number" margin="normal" {...field} />
                            }
                        />
                        <Controller
                            name="cardHolder"
                            control={control}
                            render={({field}) => <TextField disabled fullWidth label="Card Holders"
                                                            margin="normal" {...field} />}
                        />
                        <Grid size={12}>
                            <Controller
                                name="cardMemberExpiredDate"
                                control={control}
                                render={({field}) => (
                                    <DatePicker label={'"Tháng" và "Năm"'} views={['month', 'year']}
                                                value={dayjs(field.value)}
                                                onChange={(value) => field.onChange(value?.toISOString())}/>
                                )}
                            />
                        </Grid>
                        <Box mt={3}>
                            <Button variant="contained" fullWidth type="submit">
                                {appStrings.SAVE}
                            </Button>
                        </Box>
                    </CardContent>
                </form>
            </Box>
            <CardDisplay {...watch()} />
        </Box>
    );
}

export default memo(CardForm);

