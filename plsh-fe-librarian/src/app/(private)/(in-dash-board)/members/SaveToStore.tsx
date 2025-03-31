"use client";
import { setStateToMemberState } from "@/stores/slices/member-states/member.slice";
import { Member } from "@/helpers/appType";
import { useAppDispatch } from "@/hooks/useDispatch";
import React, { JSX, memo, useEffect } from "react";

type SaveToStoreProps = {
				members: Member[];
}
function SaveToStore( { members }: SaveToStoreProps ): JSX.Element{
				const dispatch = useAppDispatch();
				useEffect( () => {
								if( members ){
												dispatch( setStateToMemberState( { key: "members", value: members } ) );
								}
				}, [ dispatch, members ] );
				return (
								<></>
				);
}
export default memo( SaveToStore );

