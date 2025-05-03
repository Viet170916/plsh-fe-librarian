"use client"
import React, {JSX, memo, useEffect} from "react";
import {useGetAccountAnalyticsQuery} from "@/stores/slices/api/analysis.api.slice";
import {Box, Card, CardContent, CircularProgress, Tooltip, Typography} from '@mui/material';
import {
    Block as DeactivatedIcon,
    CalendarMonth as NewIcon,
    LocalLibrary as LibrarianIcon,
    People as PeopleIcon,
    Person as TeacherIcon,
    School as StudentIcon,
    Verified as VerifiedIcon,
    Warning as UnverifiedIcon
} from '@mui/icons-material';
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import AppChip from "@/components/primary/display/AppChip";


export interface MemberAnalytic {
    totalMembers: number;
    totalStudents: number;
    totalTeachers: number;
    totalLibrarians: number;
    verifiedAccounts: number;
    unverifiedAccounts: number;
    newThisMonth: number;
    deactivatedAccounts: number;
}

interface MemberAnalyticsCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color?: string;
}

const MemberAnalyticsCard: React.FC<MemberAnalyticsCardProps> = ({
    title,
    value,
    icon,
    color
}) => {
    const theme = useTheme();

    return (
        <Card sx={{height: '100%'}}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Typography color="textSecondary" gutterBottom variant="overline">
                            {title}
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                            {value}
                        </Typography>
                    </Grid>
                    <Grid size={4}>
                        <Box
                            sx={{
                                color: color || theme.palette.primary.main,
                                height: 56,
                                width: 56,
                                float: 'right'
                            }}
                        >
                            {icon}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const MemberAnalyticsDashboard: React.FC<{ data: MemberAnalytic }> = ({data}) => {
    const theme = useTheme();
    return (
        <Box width={"100%"} sx={{overflowX: "auto"}}>
            <Grid container spacing={4}>
                <Tooltip title="Tổng số thành viên">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <PeopleIcon fontSize="small"/>
                                {data.totalMembers}
                            </Grid>
                        }
                    />
                </Tooltip>

                <Tooltip title="Số lượng sinh viên">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <StudentIcon fontSize="small"/>
                                {data.totalStudents}
                            </Grid>
                        }
                    />
                </Tooltip>
                <Tooltip title="Số lượng giáo viên">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <TeacherIcon fontSize="small"/>
                                {data.totalTeachers}
                            </Grid>
                        }
                    />
                </Tooltip>
                <Tooltip title="Số lượng thủ thư">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <LibrarianIcon fontSize="small"/>
                                {data.totalLibrarians}
                            </Grid>
                        }
                    />
                </Tooltip>
                <Tooltip title="Tài khoản đã xác thực">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <VerifiedIcon fontSize="small"/>
                                {data.verifiedAccounts}
                            </Grid>
                        }
                    />
                </Tooltip>
                <Tooltip title="Tài khoản chưa xác thực">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <UnverifiedIcon fontSize="small"/>
                                {data.unverifiedAccounts}
                            </Grid>
                        }
                    />
                </Tooltip>
                <Tooltip title="Thành viên mới trong tháng">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <NewIcon fontSize="small"/>
                                {data.newThisMonth}
                            </Grid>
                        }
                    />
                </Tooltip>
                <Tooltip title="Tài khoản bị khóa / không hoạt động">
                    <AppChip
                        variant="outlined"
                        color="primary"
                        sx={{py: 1}}
                        label={
                            <Grid container spacing={1} alignItems="center">
                                <DeactivatedIcon fontSize="small"/>
                                {data.deactivatedAccounts}
                            </Grid>
                        }
                    />
                </Tooltip>
            </Grid>
        </Box>

    );
};


function MemberAnalytic(): JSX.Element {
    const {data, error, isFetching} = useGetAccountAnalyticsQuery();
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    return (
        <Grid>
            {isFetching && <CircularProgress/>}
            {data && <MemberAnalyticsDashboard data={data?.data}/>}

        </Grid>
    );
}

export default memo(MemberAnalytic);

