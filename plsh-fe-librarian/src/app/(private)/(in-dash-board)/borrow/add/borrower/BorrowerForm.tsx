"use client";
import { AfterLoad_Member } from "@/app/(private)/(in-dash-board)/members/[id]/info/EditForm";
import { Member } from "@/helpers/appType";
import { useSelector } from "@/hooks/useSelector";
import Grid from "@mui/material/Grid2";
import React, { JSX, memo } from "react";
import { shallowEqual } from "react-redux";

function BorrowerForm(): JSX.Element{
				const borrower = useSelector( state => state.addEditBorrowData.borrower, shallowEqual );
				console.log( borrower );
				return (
								<Grid size = { 12 } width = { "100%" }>
												<AfterLoad_Member member = { borrower as Member } />
								</Grid>
				);
}
export default memo( BorrowerForm );


