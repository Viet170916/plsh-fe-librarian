"use client";
import VerifiedMemberTable from "@/app/(private)/(in-dash-board)/borrow/add/borrower/VerifiedMemberTable";
import {Member} from "@/helpers/appType";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useLazyGetMembersQuery} from "@/stores/slices/api/member.api.slice";
import {setPropToBorrow} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {LinearProgress} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback, useEffect} from "react";
import {useSelector} from "@/hooks/useSelector";
import {shallowEqual} from "react-redux";
import {toast} from "sonner";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {setStateToMemberState} from "@/stores/slices/member-states/member.slice";


function MemberSelection(): JSX.Element {

    return (
        <Grid>
            <Fetch/>
            <Members/>
        </Grid>
    );
}

const Members = memo(() => {
    const membersData = useSelector((state) => state.memberState.members, shallowEqual);
    const dispatch = useAppDispatch();
    const onSelected = useCallback((member: Member) => {
        dispatch(setPropToBorrow({
            key: "borrower", value: member,
        }));
    }, [dispatch]);
    return (
        <>
            <VerifiedMemberTable members={membersData ?? []} onSelected={onSelected}/>
        </>
    )
})

const Fetch = memo(() => {
    const dispatch = useAppDispatch();
    const membersFilter = useSelector((state) => state.memberState.filter, shallowEqual);
    const [getMembers, {data: memberResponse, error, isFetching,}] = useLazyGetMembersQuery();
    useEffect(() => {
        if (error) {
            toast.error(parsErrorToBaseResponse((error as FetchBaseQueryError).data)?.message);
        }
    }, [error]);
    useEffect(() => {
        // if (membersFilter) {
        getMembers(membersFilter ?? {page: 1, limit: 10});
        // }
    }, [membersFilter, getMembers]);
    useEffect(() => {
        if (memberResponse?.data) {
            dispatch(setStateToMemberState({key: "members", value: memberResponse.data}));
        }
    }, [memberResponse, dispatch]);
    return (
        <>
            {isFetching && <LinearProgress/>}
        </>
    );
})

export default memo(MemberSelection);

