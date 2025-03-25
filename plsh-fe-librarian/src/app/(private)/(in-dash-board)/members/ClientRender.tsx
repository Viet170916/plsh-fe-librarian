"use client";
import MemberTable from "@/app/(private)/(in-dash-board)/members/components/Table";
import SaveToStore from "@/app/(private)/(in-dash-board)/members/SaveToStore";
import { useGetMembersQuery } from "@/app/(private)/(in-dash-board)/members/store/member.api.slice";
import { Member } from "@/helpers/appType";
import { useSelector } from "@/hooks/useSelector";
import { LinearProgress, TablePagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import React, { JSX, memo, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import { toast } from "sonner";

type ClientRenderProps = {
				members?: Member[]
}
export type BaseResponse<DataType, StatusType = string> = {
				message: string; data: DataType; status?: StatusType; count?: number, page?: number, limit?: number, currenPage?: number;
}
function ClientRender( {}: ClientRenderProps ): JSX.Element{
				const currentPageRef = useRef<number>( 1 );
				const { data: memberResponse, error, isLoading } = useGetMembersQuery( { page: currentPageRef.current, limit: 10 } );
				function handleChangePage( pageChanged: number ){
								currentPageRef.current = (pageChanged);
				}
				useEffect( () => {
								if( error ){
												toast.error( ((error as FetchBaseQueryError).data as BaseResponse<Member>)?.message );
								}
				}, [ error ] );
				console.log( "re" );
				return (
								<>
												<SaveToStore members = { memberResponse?.data ?? [] } />
												<Grid width = { "100%" } container>
																{ isLoading ? <LinearProgress /> : <></> }
																<Grid size = { 12 }>
																				<MemberDisplay />
																</Grid>
																<Grid size = { 12 }>
																				<TablePagination
																								rowsPerPageOptions = { [ 5, 10, 25 ] }
																								component = "div"
																								count = { memberResponse?.count ?? 1 }
																								// count = { 1 }
																								rowsPerPage = { 10 }
																								page = { currentPageRef.current }
																								onPageChange = { ( _, page ) => handleChangePage( page ) }
																				/>
																</Grid>
												</Grid>
								</>
				);
}
const MemberDisplay = memo( () => {
				const membersData = useSelector( state => state.memberState.members, shallowEqual );
				return (
								<MemberTable members = { membersData } />
				);
} );
export default memo( ClientRender );

