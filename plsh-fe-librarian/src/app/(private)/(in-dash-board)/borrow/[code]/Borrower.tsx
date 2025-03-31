"use client";
import Profile from "@/components/member/Profile";
import { useSelector } from "@/hooks/useSelector";
import React, { JSX, memo } from "react";
import { shallowEqual } from "react-redux";

function Borrower(): JSX.Element{
				const borrower = useSelector( state => state.loanState.currentLoan?.borrower, shallowEqual );
				return (
								<Profile profile = { borrower } />
				);
}
export default memo( Borrower );

