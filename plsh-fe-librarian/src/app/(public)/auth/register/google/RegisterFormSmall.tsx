"use client";
import {useLoginUsingGoogleMutation} from "@/app/(public)/auth/store/account.api.slice";
import {Account} from "@/app/(public)/auth/store/account.slice";
import appStrings, {
    ADDRESS,
    CLASS_ROOM,
    FULL_NAME,
    IDENTITY_CARD_NUMBER,
    PHONE_NUMBER,
    REGISTER,
    ROLE_IN_SCHOOL
} from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {useAppStore} from "@/stores/store";
import {Container, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm, UseFormRegister} from "react-hook-form";
import {toast} from "sonner";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

function RegisterFormSmall(): JSX.Element {
    const [loginGgPost, {error: ggError, isLoading: ggLoading}] = useLoginUsingGoogleMutation();
    const store = useAppStore();

    function getAccount() {
        return store.getState().accountState.registerForm;
    }

    const {register, handleSubmit} = useForm<Account>({
        defaultValues: getAccount(),
    });
    const onSubmit: SubmitHandler<Account> = useCallback(async (data: Account) => {
        const response = await loginGgPost(data);
        if (response.data?.data) {
            localStorage.setItem("token", response.data.data);
            toast.success(appStrings.success.REGISTER_SUCCESS);
        }
    }, [loginGgPost]);
    useEffect(() => {
        if (ggError) {
            toast.error(appStrings.error.REGISTER_FAIL);
        }
    }, [ggError]);
    return (
        <Container sx={signInFormContainerStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <NeumorphicTextField
                            fullWidth={true}
                            type={"email"}
                            id="email-field-sign-in-form"
                            label="Email"
                            variant="outlined" {...register("email")}
                            // defaultValue = { getAccount().email }
                            disabled
                            required={true}
                        />
                    </Grid>
                    <Grid size={12}>
                        <NeumorphicTextField
                            fullWidth={true}
                            type={"text"}
                            id="full-name-field-sign-in-form"
                            label={FULL_NAME}
                            variant="outlined" {...register("fullName")}
                            required={true}
                        />
                    </Grid>
                    <Grid size={12}>
                        <NeumorphicTextField
                            fullWidth={true}
                            type={"tel"}
                            id="phone-field-sign-in-form"
                            label={PHONE_NUMBER}
                            variant="outlined" {...register("phoneNumber")}
                            required={true}
                        />
                    </Grid>
                    <Grid size={12}>
                        <NeumorphicTextField
                            fullWidth={true}
                            type={"text"}
                            id="address-field-sign-in-form"
                            label={ADDRESS}
                            variant="outlined" {...register("address")}
                            required={true}
                        />
                    </Grid>
                    <RoleChoosing register={register}/>
                    <Grid size={12} justifyContent="center" alignItems="center" container>
                        <NeumorphicButton
                            fullWidth={true} autoCapitalize={"none"} sx={signInButtonStyle}
                            type="submit"
                        >{REGISTER}</NeumorphicButton>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export const RoleChoosing = memo(function Compo({register}: {
    register: UseFormRegister<Account>
}): React.ReactElement {
    const [role, setRole] = useState<"student" | "teacher">("student");
    const onChange = useCallback((event: SelectChangeEvent<"student" | "teacher">) => {
        return setRole(event.target.value as ("student" | "teacher"));
    }, []);
    return (<>
        <Grid size={12}>
            <InputLabel id="role-select-label">{ROLE_IN_SCHOOL}</InputLabel>
            <Select
                labelId="role-select-label"
                fullWidth={true}
                {...register("role")}
                id="role-select"
                label={ROLE_IN_SCHOOL}
                value={role}
                onChange={onChange}
            >
                <MenuItem value={"student"}>student</MenuItem>
                <MenuItem value={"teacher"}>teacher</MenuItem>
            </Select>
        </Grid>
        <Grid size={12}>
            {
                role === "student" ?
                    <NeumorphicTextField
                        fullWidth={true}
                        type={"text"}
                        id="class-room-field-sign-in-form"
                        label={CLASS_ROOM}
                        variant="outlined" {...register("classRoom")}
                        required={true}
                    /> :
                    <NeumorphicTextField
                        fullWidth={true}
                        type={"text"}
                        id="identity-field-sign-in-form"
                        label={IDENTITY_CARD_NUMBER}
                        variant="outlined" {...register("identityCardNumber")}
                        required={true}
                    />
            }
        </Grid>
        <Grid size={12}>
        </Grid>
    </>);
});

interface IProps {
    children?: React.ReactNode;
}

const signInFormContainerStyle = {
    padding: "0 !important",
};
const signInButtonStyle = {
    backgroundColor: color.PRIMARY,
    color: color.BRIGHT_TEXT,
    textTransform: "none",
};
export default memo(RegisterFormSmall);

