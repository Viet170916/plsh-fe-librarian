"use client";
import { useGetMemberQuery } from "@/app/(private)/(in-dash-board)/members/store/member.api.slice";
import { setStateToMemberState } from "@/app/(private)/(in-dash-board)/members/store/member.slice";
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

