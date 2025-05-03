"use client";
import MemberTable from "@/app/(private)/(in-dash-board)/members/components/Table";
import appStrings from "@/helpers/appStrings";
import {Member} from "@/helpers/appType";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {useSelector} from "@/hooks/useSelector";
import {useLazyGetMembersQuery} from "@/stores/slices/api/member.api.slice";
import {Box, Drawer, LinearProgress, MenuItem, Select} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import React, {JSX, memo, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {shallowEqual} from "react-redux";
import {toast} from "sonner";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setStateToMemberState} from "@/stores/slices/member-states/member.slice";
import AppPagination from "@/components/primary/Input/AppPagination";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import MemberAnalytic from "@/app/(private)/(in-dash-board)/members/(page)/MemberAnalytic";


type ClientRenderProps = {
    members?: Member[];
};
export type FilterParams<OrderByKeys> = {
    keyword?: string;
    role?: string;
    accountStatus?: string;
    approveStatus?: string;
    orderBy?: keyof OrderByKeys;
    page: number | 1,
    pageCount?: number,
    limit: number | 10;
};

function ClientRender({}: ClientRenderProps): JSX.Element {
    const dispatch = useAppDispatch();
    const membersFilter = useSelector((state) => state.memberState.filter);
    const [getMembers, {data: memberResponse, error, isFetching,}] = useLazyGetMembersQuery();
    useEffect(() => {
        if (error) {
            toast.error(parsErrorToBaseResponse((error as FetchBaseQueryError).data)?.message);
        }
    }, [error]);
    useEffect(() => {
        // if (membersFilter) {
        getMembers(membersFilter ?? {page: 1, limit: 10})
        // }
    }, [membersFilter, getMembers]);
    useEffect(() => {
        if (memberResponse?.data) {
            dispatch(setStateToMemberState({key: "members", value: memberResponse.data}));
        }
    }, [memberResponse, dispatch]);

    return (
        <>
            <Grid width={"100%"} container minHeight={"100%"} direction={"column"} spacing={2}>
                {isFetching && <LinearProgress/>}
                <Grid size={12}>
                    <MemberAnalytic/>
                </Grid>
                <Grid size={12}>
                    <MemberDisplay/>
                </Grid>
                <Grid size={12}>
                    <AppPagination
                        page={memberResponse?.page ?? memberResponse?.currentPage ?? 1}
                        count={Math.ceil((memberResponse?.pageCount ?? 1))}
                        onChange={(_, page) => {
                            dispatch(setStateToMemberState({key: "filter.page", value: page}))
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

const MemberDisplay = memo(() => {
    const membersData = useSelector((state) => state.memberState.members, shallowEqual);
    return <MemberTable members={membersData}/>;
});
export const FilterForm = memo(() => {
    const membersFilter = useSelector((state) => state.memberState.filter, shallowEqual);

    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {handleSubmit, reset, control} = useForm<FilterParams<Member>>({
        defaultValues: {
            keyword: "",
            role: "",
            accountStatus: "",
            approveStatus: "",
            orderBy: "fullName",
        },
    });
    useEffect(() => {
        if (membersFilter) {
            reset(membersFilter);
        }
    }, [membersFilter, reset]);
    const onSubmit = (data: FilterParams<Member>) => {
        dispatch(setStateToMemberState({key: "filter", value: data}))
        onClose();
    };

    function onOpen() {
        setOpen(true);
    }

    function onClose() {
        setOpen(false);
    }

    return (
        <Grid>
            <NeumorphicButton variant={"outlined"} sx={{borderRadius: 12}}
                              onClick={onOpen}>{appStrings.FILTER}</NeumorphicButton>
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box p={3} width={300}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container width={"100%"} spacing={2}>
                            <Controller
                                name="keyword"
                                control={control}
                                render={({field}) => (
                                    <NeumorphicTextField
                                        fullWidth
                                        label="Tìm kiếm"
                                        margin="normal"
                                        {...field}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />

                            <Controller
                                name="role"
                                control={control}
                                render={({field}) => (
                                    <Select fullWidth displayEmpty margin="none" {...field} value={field.value ?? ""}>
                                        <MenuItem disabled value="">{appStrings.member.ROLE}</MenuItem>
                                        <MenuItem value="student">{appStrings.member.STUDENT}</MenuItem>
                                        <MenuItem value="teacher">{appStrings.member.TEACHER}</MenuItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="accountStatus"
                                control={control}
                                render={({field}) => (
                                    <Select fullWidth displayEmpty margin="none" {...field} value={field.value ?? ""}>
                                        <MenuItem disabled value="">{appStrings.member.ACCOUNT_STATUS}</MenuItem>
                                        <MenuItem value="isVerify">{appStrings.member.VERIFIED}</MenuItem>
                                        <MenuItem value="notVerify">{appStrings.member.NOT_VERIFIED}</MenuItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="approveStatus"
                                control={control}
                                render={({field}) => (
                                    <Select fullWidth displayEmpty margin="none" {...field} value={field.value ?? ""}>
                                        <MenuItem disabled value="">{appStrings.member.APPROVAL_STATUS}</MenuItem>
                                        <MenuItem value="pending">{appStrings.member.PENDING}</MenuItem>
                                        <MenuItem value="approved">{appStrings.member.APPROVED}</MenuItem>
                                        <MenuItem value="forbidden">{appStrings.member.FORBIDDEN}</MenuItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="orderBy"
                                control={control}
                                render={({field}) => (
                                    <Select fullWidth displayEmpty margin="none" {...field} value={field.value ?? ""}>
                                        <MenuItem disabled value="">{appStrings.SORT_BY}</MenuItem>
                                        <MenuItem value="fullName">{appStrings.member.FULLNAME}</MenuItem>
                                        <MenuItem value="createdAt">{appStrings.member.CREATED_DATE}</MenuItem>
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <NeumorphicButton type="submit" variant_2="primary" color="primary"
                                              onClick={handleSubmit(onSubmit)}>
                                {appStrings.APPLY}
                            </NeumorphicButton>
                            <NeumorphicButton onClick={() => reset({
                                ...membersFilter,
                                keyword: "",
                                role: "",
                                accountStatus: "",
                                approveStatus: "",
                                orderBy: "fullName",
                            })}>
                                {appStrings.RESET}
                            </NeumorphicButton>
                        </Box>
                    </form>
                </Box>
            </Drawer>
        </Grid>
    );
});
export default memo(ClientRender);
