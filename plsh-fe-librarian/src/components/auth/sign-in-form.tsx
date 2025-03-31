"use client";
import { useLazyCheckAccountExistQuery, useLoginUsingEmailPasswordMutation, useLoginUsingGoogleMutation } from "@/app/(public)/auth/store/account.api.slice";
import { Account, setStateToAccountState } from "@/app/(public)/auth/store/account.slice";
import PrimaryTypography from "@/components/primary/typography";
import appStrings, { ALREADY_HAVE_ACCOUNT, LOGIN, NEXT, PASS, USE_AS_GUEST } from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { useAppDispatch } from "@/hooks/useDispatch";
import { Button, Container, Link, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

function SignInForm( props: IProps ): React.JSX.Element{
				const router = useRouter();
				const dispatch = useAppDispatch();
				const { register, handleSubmit } = useForm<Account>();
				const [ loginPost, { error, isLoading } ] = useLoginUsingEmailPasswordMutation();
				const [ loginGgPost, { error: ggError, isLoading: ggLoading } ] = useLoginUsingGoogleMutation();
				const [ checkAccount, { error: checkError } ] = useLazyCheckAccountExistQuery();
				const onSubmit: SubmitHandler<Account> = useCallback( async( value ) => {
								if( value.email && value.password ){
												dispatch( setStateToAccountState( { key: "registerForm", value: { email: value.email, password: value.password } } ) );
												const { data } = await checkAccount( { email: value.email } );
												console.log( data );
												if( data?.data.emailExisted ){
																console.log( data?.data.emailExisted );
																const response = await loginPost( value );
																if( response.data?.data ){
																				localStorage.setItem( "token", response.data.data );
																				router.push( `/` );
																}else{
																				toast.error( appStrings.error.LOGIN_FAIL, { duration: 1500 } );
																}
												}else{
																router.push( `/auth/register` );
												}
								}else{
												toast.error( appStrings.error.MISSING_EMAIL );
								}
				}, [ checkAccount, dispatch, loginPost, router ] );
				const handleGoogleLoginSuccess = async( credentialResponse: CredentialResponse ) => {
								if( credentialResponse.credential ){
												const { data } = await checkAccount( { ggToken: credentialResponse.credential } );
												dispatch( setStateToAccountState( {
																key: "registerForm", value: {
																				email: data?.data.email,
																				fullName: data?.data.fullName,
																				googleToken: credentialResponse.credential,
																},
												} ) );
												if( data?.data.emailExisted ){
																const response = await loginGgPost( { googleToken: credentialResponse.credential } );
																if( response.data?.data ){
																				localStorage.setItem( "token", response.data.data );
																				console.log( "register form" );
																				router.push( `/` );
																}else{
																				toast.error( appStrings.error.LOGIN_FAIL, { duration: 1500 } );
																}
												}else{
																router.push( `/auth/register/google` );
												}
								}else{
												toast.error( appStrings.error.UNAUTHORIZED );
								}
				};
				return (
								<Container sx = { signInFormContainerStyle }>
												<form onSubmit = { handleSubmit( onSubmit ) }>
																<Grid container spacing = { 2 }>
																				<Grid size = { 12 }>
																								<TextField fullWidth type = "email" label = "Email" variant = "outlined" { ...register( "email" ) } required />
																				</Grid>
																				<Grid size = { 12 }>
																								<TextField fullWidth type = "password" label = { PASS } variant = "outlined" { ...register( "password" ) } required />
																				</Grid>
																				<Grid size = { 12 } justifyContent = "center" alignItems = "center" container>
																								<Button loading = { isLoading || ggLoading } fullWidth sx = { signInButtonStyle } type = "submit">{ NEXT }</Button>
																				</Grid>
																</Grid>
												</form>
												<Grid container spacing = { 2 } marginTop = { 1 }>
																<GoogleOAuthProvider clientId = "597774498082-72b6uc8gh7foe6rn6rav880djmq3b0ua.apps.googleusercontent.com">
																				<GoogleLogin
																								onSuccess = { handleGoogleLoginSuccess }
																								onError = { () => {
																												toast.error( "Đăng nhập bằng Google thất bại!", { duration: 1500 } );
																								} }
																				/>
																</GoogleOAuthProvider>
																<Grid size = { 12 } container spacing = { 2 }>
																				<Grid container spacing = { 1 } size = { 6 }>
																								<PrimaryTypography>{ ALREADY_HAVE_ACCOUNT }</PrimaryTypography>
																								<Link href = "/" sx = { { color: color.DARK_TEXT } }>
																												<PrimaryTypography>{ LOGIN }</PrimaryTypography>
																								</Link>
																				</Grid>
																				<Grid size = { 6 }>
																								<Link href = "/" sx = { { color: color.DARK_TEXT } } underline = "hover">
																												<PrimaryTypography>{ USE_AS_GUEST }</PrimaryTypography>
																								</Link>
																				</Grid>
																</Grid>
												</Grid>
								</Container>
				);
}
export default memo( SignInForm );
interface IProps{
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
