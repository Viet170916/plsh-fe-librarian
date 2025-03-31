"use client";
import { useGetMemberQuery } from "@/stores/slices/api/member.api.slice";
import { clearPropToMemberState, setStateToMemberState } from "@/stores/slices/member-states/member.slice";
import { useAppDispatch } from "@/hooks/useDispatch";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { JSX, memo, useEffect } from "react";

type SaveToStoreProps = {
				memberId: number;
}
function SaveToStore( { memberId }: SaveToStoreProps ): JSX.Element{
				const dispatch = useAppDispatch();
				const { data, error } = useGetMemberQuery( memberId ? { id: memberId } : skipToken );
				useEffect( () => {
								if( data?.data ){
												dispatch( setStateToMemberState( { key: "currentMember", value: data.data } ) );
								}
								return () => { dispatch( clearPropToMemberState( "currentMember" ) );};
				}, [ data, dispatch ] );
				useEffect( () => {
								if( error ){
												throw new Error();
								}
				}, [ error ] );
				return (
								<>
								</>
				);
}
export default memo( SaveToStore );

