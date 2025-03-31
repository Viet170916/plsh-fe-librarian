"use client";
import appStrings from "@/helpers/appStrings";
import { AnyObject, BaseResponse, Member } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { color } from "@/helpers/resources";
import { useSelector } from "@/hooks/useSelector";
import { useUpdateMemberMutation } from "@/stores/slices/api/member.api.slice";
import { Autocomplete, Avatar, Box, Button, LinearProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const AfterLoad_Member = memo( ( { member }: { member: Member } ) => {
				const [ updateMemberPut, { error } ] = useUpdateMemberMutation();
				const { handleSubmit, control, reset } = useForm<Member>( {
								defaultValues: member,
				} );
				useEffect( () => {
								reset( member );
				}, [ member, reset ] );
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
																minHeight: "100%",
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
																												<Button disabled variant = "text" sx = { { textTransform: "none" } }>
																																{ appStrings.UPLOAD_IMAGE }
																												</Button>
																								</Grid>
																				</Grid>
																				<Grid container spacing = { 2 } sx = { { mt: 2 } }>
																								<Grid size = { 6 }>
																												<Controller
																																name = "fullName"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth label = { appStrings.member.FULLNAME } { ...field }
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<Controller
																																name = "email"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth label = { appStrings.member.EMAIL } { ...field } disabled
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<Controller
																																name = "phoneNumber"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth label = { appStrings.member.PHONE } { ...field }
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<Controller
																																name = "birthdate"
																																control = { control }
																																render = { ( { field } ) => (
																																				<DatePicker
																																								sx = { { width: "100%" } }
																																								label = { appStrings.member.BIRTH }
																																								value = { dayjs( field.value ) }
																																								onChange = { ( value ) => field.onChange( value?.toDate().toISOString() ) }
																																				/>
																																) }
																												/>
																								</Grid>
																								<Grid size = { 8 }>
																												<Controller
																																name = "address"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth label = { appStrings.member.ADDRESS } { ...field }
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
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
																																								renderInput = { ( params ) => <TextField { ...params }
																																								                                         label = { appStrings.member.ROLE } fullWidth margin = "normal" required
																																								/> }
																																								onChange = { ( _, value ) => field.onChange( value ) }
																																				/>
																																) }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<Controller
																																name = "identityCardNumber"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth
																																				label = { appStrings.member.IDENTITY_CARD_NUMBER }
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<Controller
																																name = "cardMemberNumber"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth label = { appStrings.member.CARD_NUMBER }
																																				type = "number"
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
																								</Grid>
																								<Grid size = { 6 }>
																												<Controller
																																name = "cardMemberStatus"
																																control = { control }
																																render = { ( { field } ) => <TextField
																																				fullWidth
																																				label = { appStrings.member.CARD_STATUS }
																																				type = "number"
																																				value = { field.value ?? "" }
																																				onChange = { ( e ) => field.onChange( e.target.value ) }
																																/> }
																												/>
																								</Grid>
																								<Grid
																												size = { 6 }
																								>
																												<Controller
																																name = "cardMemberExpiredDate"
																																control = { control }
																																render = { ( { field } ) => (
																																				<DatePicker
																																								sx = { { width: "100%" } }
																																								label = { appStrings.member.CARD_EXPIRED_DATE }
																																								value = { dayjs( field.value ) }
																																								onChange = { ( value ) => field.onChange( value?.toDate().toISOString() ) }
																																				/>
																																) }
																												/>
																								</Grid>
																				</Grid>
																				<Box sx = { { mt: 3, display: "flex", gap: 2 } }>
																								<Button type = "submit" variant = "contained" color = "primary" sx = { { color: color.LIGHT_TEXT } }>
																												{ appStrings.SAVE }
																								</Button>
																				</Box>
																</Box>
												</form>
								</Box>
				);
} );
const ProfileSettingsForm = () => {
				const member = useSelector( ( state ) => state.memberState.currentMember );
				return member ? <AfterLoad_Member member = { member } /> : <LinearProgress />;
};
export default memo( ProfileSettingsForm );
