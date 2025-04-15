"use client";
import { AccountEdited, useCreateMemberMutation } from "@/stores/slices/api/member.api.slice";
import appStrings from "@/helpers/appStrings";
import { AnyObject, BaseResponse } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { color } from "@/helpers/resources";
import { Autocomplete, Button, Drawer, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { JSX, memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoPersonAdd } from "react-icons/io5";
import { toast } from "sonner";

type CreateMemberFormProps = {
				children?: React.ReactNode;
}
function CreateMemberForm( { children }: CreateMemberFormProps ): JSX.Element{
				const [ createMemberPost ] = useCreateMemberMutation();
				const { control, handleSubmit, reset } = useForm<AccountEdited>();
				const [ open, setOpen ] = useState( false );
				const onSubmit = async( data: AccountEdited ) => {
								try{
												const memberCreatedRes = await createMemberPost( data );
												if( memberCreatedRes?.data ){
																toast.success( memberCreatedRes.data.message );
												}else if( memberCreatedRes.error ){
																const error = memberCreatedRes.error as { data: BaseResponse<AnyObject> };
																toast.error( error.data.message );
												}
								}catch( e ){
												toast.error( appStrings.error.REQUEST_ERROR );
								}
								reset();
								setOpen( false );
				};
				return (
								<Grid direction = { "column" } container width = { "100%" }>
												<Button variant = { "contained" } startIcon = { <IoPersonAdd /> } sx = { { color: color.LIGHT_TEXT } } onClick = { () => setOpen( true ) } color = "primary">
																{ appStrings.member.ADD }
												</Button>
												<Drawer anchor = "right" open = { open } onClose = { () => setOpen( false ) }>
																<div style = { { width: 400, padding: 20 } }>
																				<h2>{ appStrings.member.ADD }</h2>
																				<form onSubmit = { handleSubmit( onSubmit ) }>
																								<Controller
																												name = { "fullName" }
																												control = { control }
																												defaultValue = ""
																												render = { ( { field } ) => <TextField { ...field } label = { appStrings.member.FULLNAME } fullWidth margin = "normal" required /> }
																								/>
																								<Controller
																												name = "email"
																												control = { control }
																												defaultValue = ""
																												render = { ( { field } ) => <TextField { ...field } label = { appStrings.member.EMAIL } type = "email" fullWidth margin = "normal" required /> }
																								/>
																								<Controller
																												name = "identityCardNumber"
																												control = { control }
																												defaultValue = ""
																												render = { ( { field } ) => <TextField { ...field } label = { appStrings.member.IDENTITY_CARD_NUMBER } fullWidth margin = "normal" required /> }
																								/>
																								<Controller
																												name = "className"
																												control = { control }
																												defaultValue = ""
																												render = { ( { field } ) => <TextField { ...field } label = { appStrings.member.CLASSNAME } fullWidth margin = "normal" required /> }
																								/>
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
																								<Button type = "submit" variant = "contained" color = "primary" fullWidth>
																												{ appStrings.member.ADD }
																								</Button>
																				</form>
																</div>
												</Drawer>
								</Grid>
				);
}
export default memo( CreateMemberForm );

