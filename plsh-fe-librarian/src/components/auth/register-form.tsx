"use client";
import { ADDRESS, CLASS_ROOM, FULL_NAME, IDENTITY_CARD_NUMBER, PHONE_NUMBER, REGISTER, ROLE_IN_SCHOOL } from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { IUserRegisterInfo } from "@/stores/slices/register-infomation.slice";
import { RootState } from "@/stores/store";
import { Button, Container, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { useSelector } from "react-redux";

function ResisterForm( props: IProps ): React.JSX.Element{

				const session = useSelector( ( state: RootState ) => state.session );
				useEffect( () => {
				}, [ session ] );
				const { register, handleSubmit, watch, formState: { errors } } = useForm<IUserRegisterInfo>();
				const onSubmit: SubmitHandler<IUserRegisterInfo> = useCallback( ( data: IUserRegisterInfo ) => {
								const finalData: IUserRegisterInfo = {
												...data,
												identityCardNumber: data.roleInSchool == "student" ? undefined : data.identityCardNumber,
												classRoom: data.roleInSchool == "teacher" ? undefined : data.classRoom,
								};
				}, [] );
				if( session )
								return (
												<Container sx = { signInFormContainerStyle }>
																<form onSubmit = { handleSubmit( onSubmit ) }>
																				<Grid container spacing = { 2 }>
																								<Grid size = { 12 }>
																												<TextField
																																fullWidth = { true }
																																type = { "email" }
																																id = "email-field-sign-in-form"
																																label = "Email"
																																variant = "outlined" { ...register( "email" ) }
																																value = { session.user?.Email ?? "" }
																																disabled
																																required = { true }
																												/>
																								</Grid>
																								<Grid size = { 12 }>
																												<TextField
																																fullWidth = { true }
																																type = { "text" }
																																id = "full-name-field-sign-in-form"
																																label = { FULL_NAME }
																																variant = "outlined" { ...register( "fullName" ) }
																																required = { true }
																												/>
																								</Grid>
																								<Grid size = { 12 }>
																												<TextField
																																fullWidth = { true }
																																type = { "tel" }
																																id = "phone-field-sign-in-form"
																																label = { PHONE_NUMBER }
																																variant = "outlined" { ...register( "phoneNumber" ) }
																																required = { true }
																												/>
																								</Grid>
																								<Grid size = { 12 }>
																												<TextField
																																fullWidth = { true }
																																type = { "text" }
																																id = "address-field-sign-in-form"
																																label = { ADDRESS }
																																variant = "outlined" { ...register( "address" ) }
																																required = { true }
																												/>
																								</Grid>
																								<RoleChoosing register = { register } />
																								<Grid size = { 12 } justifyContent = "center" alignItems = "center" container>
																												<Button
																																fullWidth = { true } autoCapitalize = { "none" } sx = { signInButtonStyle }
																																type = "submit"
																												>{ REGISTER }</Button>
																								</Grid>
																				</Grid>
																</form>
												</Container>
								);
				else return (<></>);
}
const RoleChoosing = memo( function Compo( { register }: {
				register: UseFormRegister<IUserRegisterInfo>
} ): React.ReactElement{
				const [ role, setRole ] = useState<"student" | "teacher">( "student" );
				const onChange = useCallback( ( event: SelectChangeEvent<"student" | "teacher"> ) => {
								return setRole( event.target.value as ("student" | "teacher") );
				}, [] );
				return (<>
								<Grid size = { 12 }>
												<InputLabel id = "role-select-label">{ ROLE_IN_SCHOOL }</InputLabel>
												<Select
																labelId = "role-select-label"
																fullWidth = { true }
																{ ...register( "roleInSchool" ) }
																id = "role-select"
																label = { ROLE_IN_SCHOOL }
																value = { role }
																onChange = { onChange }
												>
																<MenuItem value = { "student" }>student</MenuItem>
																<MenuItem value = { "teacher" }>teacher</MenuItem>
												</Select>
								</Grid>
								<Grid size = { 12 }>
												{
																role === "student" ?
																				<TextField
																								fullWidth = { true }
																								type = { "text" }
																								id = "class-room-field-sign-in-form"
																								label = { CLASS_ROOM }
																								variant = "outlined" { ...register( "classRoom" ) }
																								required = { true }
																				/> :
																				<TextField
																								fullWidth = { true }
																								type = { "text" }
																								id = "identity-field-sign-in-form"
																								label = { IDENTITY_CARD_NUMBER }
																								variant = "outlined" { ...register( "identityCardNumber" ) }
																								required = { true }
																				/>
												}
								</Grid>
								<Grid size = { 12 }>
								</Grid>
				</>);
} );
export default memo( ResisterForm );
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
