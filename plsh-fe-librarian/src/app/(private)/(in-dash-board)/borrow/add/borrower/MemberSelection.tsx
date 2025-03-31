"use client";
import VerifiedMemberTable from "@/app/(private)/(in-dash-board)/borrow/add/borrower/VerifiedMemberTable";
import { FilterParams } from "@/app/(private)/(in-dash-board)/members/ClientRender";
import { Member } from "@/helpers/appType";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useLazyGetMembersQuery } from "@/stores/slices/api/member.api.slice";
import { setPropToBorrow } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { LinearProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { debounce } from "@mui/material/utils";
import React, { JSX, memo, useCallback, useEffect, useMemo, useState } from "react";

type MemberSelectionProps = {
				children?: React.ReactNode;
}
function MemberSelection( { children }: MemberSelectionProps ): JSX.Element{
				const [ filter, setFilter ] = useState<FilterParams<Member>>( {
								page: 1, limit: 10,
				} );
				const dispatch = useAppDispatch();
				const [ getMembers, { data: membersData, error: membersError, isLoading } ] = useLazyGetMembersQuery();
				const onSelected = useCallback( ( member: Member ) => {
								dispatch( setPropToBorrow( {
												key: "borrower", value: member,
								} ) );
				}, [ dispatch ] );
				const debouncedSetKeyWord = useMemo(
								() => debounce( ( value: string ) =>
												setFilter( prev => ({ ...prev, keyword: value }) ), 300 ), [] );
				const onInputChange =
								useCallback( ( value?: string ) => {
												debouncedSetKeyWord( value ?? "" );
								}, [ debouncedSetKeyWord ] );
				useEffect( () => {
								getMembers( filter );
				}, [ filter, getMembers ] );
				useEffect( () => {
								getMembers( filter );
				}, [ filter, getMembers ] );
				return (
								<Grid>
												<TextField onChange = { ( e ) => onInputChange( e.target.value ) } />
												{ isLoading && <LinearProgress /> }
												<VerifiedMemberTable members = { membersData?.data ?? [] } onSelected = { onSelected } />
								</Grid>
				);
}
export default memo( MemberSelection );

