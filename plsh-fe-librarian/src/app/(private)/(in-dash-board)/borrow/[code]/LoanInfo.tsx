"use client";
import BorrowedBookContainer from "@/components/borrow-page/BorrowedBookContainer";
import { useSelector } from "@/hooks/useSelector";
import React, { JSX, memo } from "react";
import { shallowEqual } from "react-redux";

function LoanInfo(): JSX.Element{
				const loanBooks = useSelector( state => state.loanState.currentLoan?.bookBorrowings, shallowEqual );
				return (
								<BorrowedBookContainer borrowedBook = { loanBooks ?? [] } />
				);
}
export default memo( LoanInfo );

