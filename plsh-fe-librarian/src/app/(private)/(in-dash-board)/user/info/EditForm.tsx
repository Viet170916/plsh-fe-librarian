"use client";
import appStrings from "@/helpers/appStrings";
import {Member} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {useSelector} from "@/hooks/useSelector";
import {useUpdateMemberMutation, useUpdateMeMutation} from "@/stores/slices/api/member.api.slice";
import {Autocomplete, Avatar, Box, LinearProgress, MenuItem, Select} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, {memo, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";

export const AfterLoad_Member = memo(({member}: { member: Member }) => {
    const [updateMemberPut, {error, data, isLoading}] = useUpdateMeMutation();
    const {handleSubmit, control, reset, formState} = useForm<Member>({
        defaultValues: member,
    });
    useEffect(() => {
        reset(member);
    }, [member, reset]);
    const onSubmit = async (data: Member) => {
        if (!data.id) return;
        const updateResponse = await updateMemberPut(data);

    };
    useEffect(() => {
        if (data) {
            appToaster.success(data.message);
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    const statusOptions = [
        {value: -1, label: "Chọn trạng thái", color: "text.disabled", disabled: true},
        {value: 0, label: "Ngừng hoạt động", color: "error.main"},
        {value: 1, label: "Hoạt động", color: "success.main"},
    ];

    return (

        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}
             sx={{
                 maxWidth: 800,
                 mx: "auto",
                 minHeight: "100%",
                 p: 3,
                 borderRadius: 2,
             }}>
            <Box sx={{mt: 3}}>
                <Grid container spacing={3} alignItems="center">
                    <Grid>
                        <Avatar sx={{width: 80, height: 80}} src={member.avatarUrl} alt={member.fullName}/>
                    </Grid>
                    <Grid>
                        <NeumorphicButton disabled variant="text" sx={{textTransform: "none"}}>
                            {appStrings.UPLOAD_IMAGE}
                        </NeumorphicButton>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{mt: 3}}>
                    <Grid size={6}>
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{required: false}}
                            render={({field}) => <NeumorphicTextField

                                fullWidth label={appStrings.member.FULLNAME} {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            />}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{required: false}}
                            render={({field}) => <NeumorphicTextField
                                fullWidth label={appStrings.member.EMAIL} {...field} disabled
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            />}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Controller
                            rules={{required: false}}
                            name="phoneNumber"
                            control={control}
                            render={({field}) => <NeumorphicTextField
                                fullWidth label={appStrings.member.PHONE} {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            />}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Controller
                            rules={{required: false}}
                            name="birthdate"
                            control={control}
                            render={({field}) => (
                                <DatePicker

                                    sx={{width: "100%"}}
                                    label={appStrings.member.BIRTH}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(value) => field.onChange(value?.toDate().toISOString())}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={8}>
                        <Controller
                            name="address"
                            control={control}
                            rules={{required: false}}
                            render={({field}) => <NeumorphicTextField
                                fullWidth label={appStrings.member.ADDRESS} {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            />}
                        />
                    </Grid>
                    <Grid size={4}>

                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="role"
                            disabled
                            control={control}
                            defaultValue={"student"}
                            rules={{required: false}}
                            render={({field}) => (
                                <Autocomplete
                                    {...field}
                                    options={constants.roles}
                                    renderInput={(params) => <NeumorphicTextField {...params}

                                                                                  label={appStrings.member.ROLE}
                                                                                  fullWidth
                                    />}
                                    onChange={(_, value) => field.onChange(value)}
                                />
                            )}
                        />
                    </Grid>
                    {member.role === "student" ?
                        <Grid size={4}>
                            <Controller
                                name="classRoom"
                                control={control}
                                rules={{required: false}}
                                render={({field}) => <NeumorphicTextField
                                    fullWidth label={appStrings.member.CLASSNAME} {...field}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />}
                            />
                        </Grid> : <></>
                    }
                    <Grid size={6}>
                        <Controller
                            name="identityCardNumber"
                            control={control}
                            rules={{required: false}}
                            render={({field}) => <NeumorphicTextField
                                fullWidth
                                label={appStrings.member.IDENTITY_CARD_NUMBER}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            />}
                        />
                    </Grid>
                </Grid>
                <Box sx={{mt: 3, display: "flex", gap: 2}}>
                    <NeumorphicButton loading={isLoading} type="submit" variant_2="primary" color="primary"
                                      disabled={!member.id}>
                        {appStrings.SAVE}
                    </NeumorphicButton>
                </Box>
            </Box>
        </Box>
    );
});
const ProfileSettingsForm = () => {
    const me = useSelector(state => state.global.me);
    return me ? <AfterLoad_Member member={me}/> : <LinearProgress/>;
};
export default memo(ProfileSettingsForm);
