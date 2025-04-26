"use client";
import BorrowedBookContainer from "@/components/borrow-page/BorrowedBookContainer";
import {useSelector} from "@/hooks/useSelector";
import React, {JSX, memo} from "react";

function LoanInfo(): JSX.Element {
    const loanBooks = useSelector(state => state.loanState.currentLoan?.bookBorrowings);
    const approvalStatus = useSelector(state => state.loanState.currentLoan?.aprovalStatus);

    console.log(loanBooks)
    return (
        <BorrowedBookContainer approvalState={approvalStatus ?? ""} borrowedBook={loanBooks ?? []}/>
    );
}

export default memo(LoanInfo);

