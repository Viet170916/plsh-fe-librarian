"use client";
import MemberTable from "@/app/(private)/(in-dash-board)/members/components/Table";
import SaveToStore from "@/app/(private)/(in-dash-board)/members/SaveToStore";
import appStrings from "@/helpers/appStrings";
import { Member } from "@/helpers/appType";
import { parsErrorToBaseResponse } from "@/helpers/error";
import { color } from "@/helpers/resources";
import { useSelector } from "@/hooks/useSelector";
import { useGetMembersQuery } from "@/stores/slices/api/member.api.slice";
import { Box, Button, Drawer, LinearProgress, MenuItem, Select, SxProps, TablePagination, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import React, { JSX, memo, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { toast } from "sonner";

const labelStyle: SxProps = {
				background: color.WHITE,
				paddingRight: 1,
				paddingLeft: 1,
};
type ClientRenderProps = {
				members?: Member[];
};
export type FilterParams<OrderByKeys> = {
				keyword?: string;
				role?: string;
				accountStatus?: string;
				approveStatus?: string;
				orderBy?: keyof OrderByKeys;
				page: number | 1,
				pageCount?: number,
				limit: number | 10;
};
function ClientRender( {}: ClientRenderProps ): JSX.Element{
				const filterParams = useRef<FilterParams<Member>>( { page: 1, limit: 10 } );
				const { data: memberResponse, error, isLoading, refetch } = useGetMembersQuery( filterParams.current );
				useEffect( () => {
								if( error ){
												toast.error( parsErrorToBaseResponse( (error as FetchBaseQueryError).data )?.message );
								}
				}, [ error ] );
				const onFilterApply = useCallback( ( value: FilterParams<Member> ) => {
								filterParams.current = value;
								refetch();
				}, [ refetch ] );
				return (
								<>
												<SaveToStore members = { memberResponse?.data ?? [] } />
												<Grid width = { "100%" } container minHeight = { "100%" } direction = { "column" } spacing = { 2 }>
																<FilterForm onApply = { onFilterApply } />
																{ isLoading && <LinearProgress /> }
																<Grid>
																				<MemberDisplay />
																</Grid>
																<Grid>
																				<TablePagination
																								rowsPerPageOptions = { [ 10 ] }
																								component = "div"
																								count = { Math.ceil( (memberResponse?.count ?? 1) / (memberResponse?.limit ?? 10) ) }
																								rowsPerPage = { memberResponse?.limit ?? 10 }
																								page = { memberResponse?.page ?? 1 }
																								onPageChange = { ( _, page ) => {
																												filterParams.current = { ...filterParams.current, page };
																												refetch();
																								} }
																				/>
																</Grid>
												</Grid>
								</>
				);
}
const MemberDisplay = memo( () => {
				const membersData = useSelector( ( state ) => state.memberState.members, shallowEqual );
				return <MemberTable members = { membersData } />;
} );
type FilterFormProps = {
				onApply: ( filters: FilterParams<Member> ) => void;
};
const FilterForm = memo( ( { onApply }: FilterFormProps ) => {
				const [ open, setOpen ] = useState<boolean>( false );
				const { register, handleSubmit, reset } = useForm<FilterParams<Member>>( {
								defaultValues: {
												keyword: "",
												role: "",
												accountStatus: "",
												approveStatus: "",
												orderBy: "fullName",
								},
				} );
				const onSubmit = ( data: FilterParams<Member> ) => {
								onApply( data );
								onClose();
				};
				function onOpen(){
								setOpen( true );
				}
				function onClose(){
								setOpen( false );
				}
				return (
								<Grid>
												<Button onClick = { onOpen }>{ appStrings.FILTER }</Button>
												<Drawer anchor = "right" open = { open } onClose = { onClose }>
																<Box p = { 3 } width = { 300 }>
																				<form onSubmit = { handleSubmit( onSubmit ) }>
																								<TextField
																												fullWidth
																												label = "Tìm kiếm"
																												{ ...register( "keyword" ) }
																												margin = "normal"
																								/>
																								<Select fullWidth { ...register( "role" ) } displayEmpty margin = "none">
																												<MenuItem disabled>{ appStrings.member.ROLE }</MenuItem>
																												<MenuItem value = "student">{ appStrings.member.STUDENT }</MenuItem>
																												<MenuItem value = "teacher">{ appStrings.member.TEACHER }</MenuItem>
																								</Select>
																								<Select fullWidth { ...register( "accountStatus" ) } displayEmpty margin = "none">
																												<MenuItem disabled>{ appStrings.member.ACCOUNT_STATUS }</MenuItem>
																												<MenuItem value = { "isVerify" }>{ appStrings.member.VERIFIED }</MenuItem>
																												<MenuItem value = { "notVerify" }>{ appStrings.member.NOT_VERIFIED }</MenuItem>
																								</Select>
																								<Select fullWidth { ...register( "approveStatus" ) } displayEmpty margin = "none">
																												<MenuItem disabled>{ appStrings.member.APPROVAL_STATUS }</MenuItem>
																												<MenuItem value = "pending">{ appStrings.member.PENDING }</MenuItem>
																												<MenuItem value = "approved">{ appStrings.member.APPROVED }</MenuItem>
																												<MenuItem value = "forbidden">{ appStrings.member.FORBIDDEN }</MenuItem>
																								</Select>
																								<Select fullWidth { ...register( "orderBy" ) } displayEmpty margin = "none">
																												<MenuItem disabled>{ appStrings.SORT_BY }</MenuItem>
																												<MenuItem value = "fullName">{ appStrings.member.FULLNAME }</MenuItem>
																												<MenuItem value = "createdAt">{ appStrings.member.CREATED_DATE }</MenuItem>
																								</Select>
																								<Box display = "flex" justifyContent = "space-between" mt = { 2 }>
																												<Button type = "submit" variant = "contained" color = "primary">
																																{ appStrings.APPLY }
																												</Button>
																												<Button
																																type = "button"
																																variant = "outlined"
																																onClick = { () => reset() }
																												>
																																{ appStrings.RESET }
																												</Button>
																								</Box>
																				</form>
																</Box>
												</Drawer>
								</Grid>
				);
} );
export default memo( ClientRender );
