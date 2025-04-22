"use client"
import React, {JSX, memo} from "react";
import BarcodeScanner from "@/components/primary/Input/BarcodeScanner";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setStateToMemberState} from "@/stores/slices/member-states/member.slice";


function BorrowerBarcodeScanner(): JSX.Element {
    const dispatch = useAppDispatch();
    const onScanDone = (code?: string) => {
        dispatch(setStateToMemberState({key: "filter.keyword", value: code}))
    }
    return (
        <>
            <BarcodeScanner onScanDone={onScanDone}/>
        </>
    );
}

export default memo(BorrowerBarcodeScanner);

