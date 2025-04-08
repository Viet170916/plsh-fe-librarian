"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo} from "react";
import {LoanStatus} from "@/helpers/dataTransfer";
import {Button, Chip} from "@mui/material";
import {useAppDispatch} from "@/hooks/useDispatch";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {useUpdateLoanStatusMutation} from "@/stores/slices/api/borrow.api.slice";
import {setPropToLoanState} from "@/stores/slices/borrow-state/loan.slice";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";

export function renderLoanStatusChip(status: LoanStatus) {
    switch (status) {
        case "pending":
            return <Chip label="Chờ duyệt" variant={"outlined"}
                         sx={{borderColor: color.WARNING, color: color.WARNING, bgcolor: color.WARNING_10}}
                         size="small"/>;
        case "approved":
            return <Chip label="Đã duyệt" variant={"outlined"}
                         sx={{borderColor: color.COMFORT, color: color.COMFORT, bgcolor: color.COMFORT_10}}
                         size="small"/>;
        case "rejected":
            return <Chip label="Từ chối" variant={"outlined"}
                         sx={{borderColor: color.SERIOUS, color: color.SERIOUS, bgcolor: color.SERIOUS_10}}
                         size="small"/>;
        case "taken":
            return <Chip label="Đang mượn" variant={"outlined"}
                         sx={{borderColor: color.PRIMARY, color: color.PRIMARY, bgcolor: color.PRIMARY_O10}}
                         size="small"/>;
        case "cancel":
            return <Chip label="Đã hủy" variant={"outlined"}
                         sx={{borderColor: color.FOUR, color: color.FOUR, bgcolor: color.FOUR_20}} size="small"/>;
        case "return-all":
            return <Chip label="Đã trả" variant={"outlined"}
                         sx={{borderColor: color.COMFORT, color: color.COMFORT, bgcolor: color.COMFORT_10}}
                         size="small"/>;
    }
}

function ChangeStatusButton(): JSX.Element {
    const dispatch = useAppDispatch();
    const loan = useSelector((state: RootState) => state.loanState.currentLoan, shallowEqual);
    const [updateLoanStatus, {error, data, isLoading}] = useUpdateLoanStatusMutation();
    useEffect(() => {
        if (data) {
            dispatch(setPropToLoanState({key: "currentLoan", value: undefined}));
            appToaster.success(data.message);
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            appToaster.success(appStrings.error.APPROVE_FAIL);
        }
    }, [error]);
    useEffect(() => {
        if (data) {
            dispatch(setPropToLoanState({key: "currentLoan", value: undefined}));
            appToaster.success(data.message);
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            appToaster.success(appStrings.error.APPROVE_FAIL);
        }
    }, [error]);
    const handleUpdateStatus = useCallback(async (status: LoanStatus) => {
        if (loan?.id) {
            await updateLoanStatus({loanId: loan?.id, status});
        }
    }, [updateLoanStatus, loan?.id,]);
    const actionButton = useMemo(() => {
        switch (loan?.aprovalStatus) {
            case "pending":
                return (<>
                    <Button
                        loading={isLoading}
                        variant="contained"
                        sx={{bgcolor: color.PRIMARY, color: color.LIGHT_TEXT}}
                        onClick={() => handleUpdateStatus("approved")}
                    >
                        Duyệt
                    </Button>
                    <Button
                        loading={isLoading}

                        variant="contained"
                        sx={{bgcolor: color.SERIOUS, color: color.LIGHT_TEXT}}
                        onClick={() => handleUpdateStatus("rejected")}
                    >
                        Từ chối
                    </Button>
                    <Button
                        loading={isLoading}

                        variant="contained"
                        sx={{bgcolor: color.WARNING, color: color.LIGHT_TEXT}}
                        onClick={() => handleUpdateStatus("cancel")}
                    >
                        Huỷ
                    </Button>
                </>);
            case "taken":
                return (
                    <Button
                        loading={isLoading}
                        variant="contained"
                        sx={{bgcolor: color.COMFORT, color: color.LIGHT_TEXT}}
                        onClick={() => handleUpdateStatus("return-all")}
                    >
                        Xác nhận trả sách
                    </Button>);
            case "approved":
                return (
                    <>
                        <Button
                            loading={isLoading}
                            variant="contained"
                            sx={{bgcolor: color.COMFORT, color: color.LIGHT_TEXT}}
                            onClick={() => handleUpdateStatus("taken")}
                        >
                            Xác nhận lấy sách
                        </Button>
                        <Button
                            loading={isLoading}
                            variant="contained"
                            sx={{bgcolor: color.WARNING, color: color.LIGHT_TEXT}}
                            onClick={() => handleUpdateStatus("cancel")}
                        >
                            Huỷ
                        </Button>
                    </>

                );
            case "rejected":
                return (
                    <Button
                        loading={isLoading}
                        variant="contained"
                        sx={{bgcolor: color.COMFORT, color: color.LIGHT_TEXT}}
                        onClick={() => handleUpdateStatus("approved")}
                    >
                        Phê duyệt lại
                    </Button>
                );
            default:
                break;

        }
    }, [loan?.aprovalStatus, handleUpdateStatus, isLoading])

    return (
        <>
            {loan?.aprovalStatus && <Grid>{renderLoanStatusChip(loan.aprovalStatus)}</Grid>}
            {

                actionButton
            }

        </>
    );
}

export default memo(ChangeStatusButton);

