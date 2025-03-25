"use client";
import { BaseResponse } from "@/app/(private)/(in-dash-board)/members/ClientRender";
import { useUpdateMemberMutation } from "@/app/(private)/(in-dash-board)/members/store/member.api.slice";
import appStrings from "@/helpers/appStrings";
import { AnyObject, Member } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { color } from "@/helpers/resources";
import { useSelector } from "@/hooks/useSelector";
import { Autocomplete, Avatar, Box, Button, LinearProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const AfterLoad = memo( ( { member }: { member: Member } ) => {
				const [ updateMemberPut, { error } ] = useUpdateMemberMutation();
				const { register, handleSubmit, control, setValue, getValues } = useForm<Member>( {
								defaultValues: member,
				} );
				const onSubmit = async( data: Member ) => {
								const updateResponse = await updateMemberPut( data );
								if( updateResponse.data ){
												toast.success( updateResponse.data.message );
								}
								console.log( "Updated Profile:", data );
				};
				useEffect( () => {
								if( error ){
												toast.error( (error as { data: BaseResponse<AnyObject> }).data.message );
								}
				}, [ error ] );
				return (
								<Box
												sx = { {
																maxWidth: 800,
																mx: "auto",
																p: 3,
																border: "1px solid #ddd",
																borderRadius: 2,
																bgcolor: "white",
												} }
								>
												<form onSubmit = { handleSubmit( onSubmit ) }>
																<Box sx = { { mt: 3 } }>
																				<Grid container spacing = { 2 } alignItems = "center">
																								<Grid>
																												<Avatar sx = { { width: 80, height: 80 } } src = "/profile.jpg" />
																								</Grid>
																								<Grid>
																												<Button disabled variant = "text" sx = { { textTransform: "none" } }>{ appStrings.UPLOAD_IMAGE }</Button>
																								</Grid>
																				</Grid>
																				<Grid container spacing = { 2 } sx = { { mt: 2 } }>
																								<Grid size = { 6 }>
																												<TextField fullWidth label = { appStrings.member.FULLNAME } { ...register( "fullName" ) } />
																								</Grid>
																								<Grid size = { 6 }>
																												<TextField fullWidth label = { appStrings.member.EMAIL } { ...register( "email" ) } disabled />
																								</Grid>
																								<Grid size = { 6 }>
																												<TextField fullWidth label = { appStrings.member.PHONE } { ...register( "phoneNumber" ) } />
																								</Grid>
																								<Grid size = { 6 }>
																												<DatePicker
																																sx = { { width: "100%" } }
																																label = { appStrings.member.BIRTH }
																																defaultValue = { dayjs( getValues( "birthdate" ) ) }
																																onChange = { ( value ) => {
																																				setValue( "birthdate", value?.toDate().toISOString() );
																																} }
																												/>
																								</Grid>
																								<Grid size = { 8 }>
																												<TextField fullWidth label = { appStrings.member.ADDRESS } { ...register( "address" ) } />
																								</Grid>
																								<Grid size = { 8 }>
																												<Controller
																																name = "role"
																																control = { control }
																																defaultValue = { "student" }
																																render = { ( { field } ) => (
																																				<Autocomplete
																																								{ ...field }
																																								options = { constants.roles }
																																								renderInput = { ( params ) => <TextField { ...params } label = { appStrings.member.ROLE } fullWidth margin = "normal" required /> }
																																								onChange = { ( _, value ) => field.onChange( value ) }
																																				/>
																																) }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<TextField fullWidth label = { appStrings.member.IDENTITY_CARD_NUMBER } { ...register( "identityCardNumber" ) } />
																								</Grid>
																								<Grid size = { 6 }>
																												<TextField fullWidth label = { appStrings.member.CARD_NUMBER } type = "number" { ...register( "cardMemberNumber" ) } />
																								</Grid>
																								<Grid size = { 6 }>
																												<TextField fullWidth label = { appStrings.member.CARD_STATUS } type = "number" { ...register( "cardMemberStatus" ) } />
																								</Grid>
																								<Grid size = { 6 }>
																												<DatePicker
																																sx = { { width: "100%" } }
																																label = { appStrings.member.CARD_EXPIRED_DATE }
																																defaultValue = { dayjs( getValues( "cardMemberExpiredDate" ) ) }
																																onChange = { ( value ) => {
																																				setValue( "cardMemberExpiredDate", value?.toDate().toISOString() );
																																} }
																												/>
																								</Grid>
																				</Grid>
																				<Box sx = { { mt: 3, display: "flex", gap: 2 } }>
																								<Button type = "submit" variant = "contained" color = "primary" sx = { { color: color.LIGHT_TEXT } }>
																												{ appStrings.SAVE }
																								</Button>
																								{/*<Button type = "button" variant = "text" onClick = { () => reset() }>*/ }
																								{/*				Reset*/ }
																								{/*</Button>*/ }
																				</Box>
																</Box>
												</form>
								</Box>
				);
} );
const ProfileSettingsForm = () => {
				const member = useSelector( state => state.memberState.currentMember );
				if( member ){
								return (<AfterLoad member = { member } />);
				}else{
								return (<LinearProgress />);
				}
};
export default memo( ProfileSettingsForm );
