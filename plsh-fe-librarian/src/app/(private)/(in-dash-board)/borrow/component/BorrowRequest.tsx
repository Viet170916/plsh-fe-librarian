"use client";
import { FilterParams } from "@/app/(private)/(in-dash-board)/members/ClientRender";
import BorrowTable from "@/components/borrow-page/BorrowTable";
import { appToaster } from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import { LoanDto, LoanStatus } from "@/helpers/dataTransfer";
import { useLazyGetLoansQuery } from "@/stores/slices/api/borrow.api.slice";
import { Box, Button, LinearProgress, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material";
import React, { JSX, memo, useEffect, useRef } from "react";

function BorrowRequest(): JSX.Element{
				const [ getLoans, { data, error, isLoading } ] = useLazyGetLoansQuery();
				const filterRef = useRef<FilterParams<LoanDto> & { approveStatus: LoanStatus }>( {
								keyword: "",
								approveStatus: "pending",
								limit: 10,
								page: 1,
				} );
				useEffect( () => {
								getLoans( filterRef.current ).then();
				}, [ getLoans ] );
				const handleFilterChange = ( field: keyof (FilterParams<LoanDto> & { approveStatus: LoanStatus }), value: string ) => {
								filterRef.current = { ...filterRef.current, [field]: value };
				};
				const applyFilter = async() => {
								filterRef.current = { ...filterRef.current, page: 1 };
								await getLoans( filterRef.current );
				};
				useEffect( () => {
								if( error ){
												appToaster.error( appStrings.error.REQUEST_ERROR );
								}
				}, [ error ] );
				return (
								<Stack sx = { { width: "100%", borderRadius: 2 } }>
												<Box sx = { { flexGrow: 1 } }>
																<Typography fontSize = { 35 }>{ appStrings.member.BORROW_REQUEST }</Typography>
												</Box>
												<Box sx = { { display: "flex", gap: 2, mb: 2 } }>
																<TextField
																				label = { appStrings.FILTER_KEYWORD }
																				variant = "outlined"
																				size = "small"
																				onChange = { ( e ) => handleFilterChange( "keyword", e.target.value ?? "" ) }
																/>
																<Select
																				size = { "small" }
																				displayEmpty
																				defaultValue = "pending"
																				onChange = { ( e ) => handleFilterChange( "approveStatus", e.target.value ) }
																>
																				<MenuItem value = "">{ appStrings.ALL }</MenuItem>
																				<MenuItem value = "pending">{ appStrings.borrow.STATUS_PENDING }</MenuItem>
																				<MenuItem value = "approved">{ appStrings.borrow.STATUS_APPROVED }</MenuItem>
																				<MenuItem value = "rejected">{ appStrings.borrow.STATUS_REJECTED }</MenuItem>
																</Select>
																<Button variant = "contained" onClick = { applyFilter }>{ appStrings.APPLY }</Button>
												</Box>
												<Box sx = { { flexGrow: 1 } }>
																{ isLoading && <LinearProgress /> }
																<BorrowTable items = { data?.data ?? [] } />
												</Box>
												<Pagination
																count = { data?.pageCount } shape = "rounded" size = { "small" } page = { data?.page ?? 1 } onChange = { async( _, newPage ) => {
																filterRef.current = { ...filterRef.current, page: newPage };
																await getLoans( filterRef.current );
												} }
												/>
								</Stack>
				);
}
export default memo( BorrowRequest );

