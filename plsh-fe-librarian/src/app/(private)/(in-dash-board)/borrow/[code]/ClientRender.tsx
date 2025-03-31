"use client";
import { appToaster } from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useLazyGetLoanByIdQuery } from "@/stores/slices/api/borrow.api.slice";
import { setPropToLoanState } from "@/stores/slices/borrow-state/loan.slice";
import { LinearProgress } from "@mui/material";
import React, { JSX, memo, useEffect } from "react";

type ClientRenderProps = {
				code: number
}
function ClientRender( { code }: ClientRenderProps ): JSX.Element{
				const [ getLoan, { data, isLoading, error } ] = useLazyGetLoanByIdQuery();
				const dispatch = useAppDispatch();
				useEffect( () => {
								getLoan( code );
				}, [ code, getLoan ] );
				useEffect( () => {
								if( data ){
												dispatch( setPropToLoanState( { key: "currentLoan", value: data.data } ) );
								}
				}, [ data, dispatch ] );
				useEffect( () => {
								if( error ){
												appToaster.error( appStrings.error.REQUEST_ERROR );
												throw new Error( appStrings.error.LOAN_NOT_FOUND );
								}
				}, [ error ] );
				return (isLoading ? <LinearProgress /> : <></>);
}
export default memo( ClientRender );

