"use client";
import {
    useLazyCheckAccountExistQuery,
    useLoginUsingEmailPasswordMutation,
    useLoginUsingGoogleMutation
} from "@/app/(public)/auth/store/account.api.slice";
import {Account, setStateToAccountState} from "@/app/(public)/auth/store/account.slice";
import PrimaryTypography from "@/components/primary/typography";
import appStrings, {ALREADY_HAVE_ACCOUNT, LOGIN, NEXT, PASS, USE_AS_GUEST} from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {Container, Link} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useRouter} from "next/navigation";
import React, {memo, useCallback} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {appToaster} from "@/components/primary/toaster";
import {useTheme} from "@mui/material/styles";
import {parsErrorToBaseResponse} from "@/helpers/error";

function SignInForm(props: IProps): React.JSX.Element {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<Account>();
    const [loginPost, {error, isLoading}] = useLoginUsingEmailPasswordMutation();
    const [loginGgPost, {error: ggError, isLoading: ggLoading}] = useLoginUsingGoogleMutation();
    const [checkAccount, {error: checkError}] = useLazyCheckAccountExistQuery();
    const onSubmit: SubmitHandler<Account> = useCallback(async (value) => {
        if (value.email && value.password) {
            dispatch(setStateToAccountState({
                key: "registerForm",
                value: {email: value.email, password: value.password}
            }));
            const {data} = await checkAccount({email: value.email});
            if (data?.data.emailExisted) {
                const response = await loginPost(value);
                if (response.data?.data) {
                    localStorage.setItem("token", response.data.data);
                    router.push(`/`);
                } else {
                    appToaster.error(parsErrorToBaseResponse(response.error)?.message);
                }
            } else {
                router.push(`/auth/register`);
            }
        } else {
            appToaster.error(appStrings.error.MISSING_EMAIL);
        }
    }, [checkAccount, dispatch, loginPost, router]);
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const {data} = await checkAccount({ggToken: credentialResponse.credential});
            dispatch(setStateToAccountState({
                key: "registerForm", value: {
                    email: data?.data.email,
                    fullName: data?.data.fullName,
                    googleToken: credentialResponse.credential,
                },
            }));
            if (data?.data.emailExisted) {
                const response = await loginGgPost({googleToken: credentialResponse.credential});
                if (response.data?.data) {
                    localStorage.setItem("token", response.data.data);
                    router.push(`/`);
                } else {
                    appToaster.error(parsErrorToBaseResponse(response.error)?.message);
                }
            } else {
                router.push(`/auth/register/google`);
            }
        } else {
            appToaster.error(parsErrorToBaseResponse(checkError)?.message);
        }
    };
    const theme = useTheme();
    return (
        <Container sx={{...signInFormContainerStyle, bgcolor: theme.palette.background.default}}>
            {/*<Grid component={"form"} onSubmit={handleSubmit(onSubmit)} container spacing={2}>*/}
            {/*    <Grid size={12}>*/}
            {/*        <NeumorphicTextField fullWidth type="email" label="Email"*/}
            {/*                             variant="outlined" {...register("email")}*/}
            {/*                             required/>*/}
            {/*    </Grid>*/}
            {/*    <Grid size={12}>*/}
            {/*        <NeumorphicTextField fullWidth type="password" label={PASS}*/}
            {/*                             variant="outlined" {...register("password")}*/}
            {/*                             required/>*/}
            {/*    </Grid>*/}
            {/*    <Grid size={12} justifyContent="center" alignItems="center" container>*/}
            {/*        <NeumorphicButton loading={isLoading || ggLoading} fullWidth sx={signInButtonStyle}*/}
            {/*                          type="submit">{NEXT}</NeumorphicButton>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            <Grid container spacing={2} marginTop={1}>
                <GoogleOAuthProvider
                    clientId="597774498082-72b6uc8gh7foe6rn6rav880djmq3b0ua.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={() => {
                            appToaster.error("Đăng nhập bằng Google thất bại!");
                        }}
                    />
                </GoogleOAuthProvider>
                <Grid size={12} container spacing={2}>
                    {/*<Grid container spacing={1} size={6}>*/}
                    {/*    <PrimaryTypography>{ALREADY_HAVE_ACCOUNT}</PrimaryTypography>*/}
                    {/*    <Link href="/" sx={{color: color.DARK_TEXT}}>*/}
                    {/*        <PrimaryTypography>{LOGIN}</PrimaryTypography>*/}
                    {/*    </Link>*/}
                    {/*</Grid>*/}
                    <Grid size={6}>
                        <Link href="https://book-hive.space" sx={{color: color.DARK_TEXT}} underline="hover">
                            <PrimaryTypography>{"Đến trang chủ"}</PrimaryTypography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default memo(SignInForm);

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
