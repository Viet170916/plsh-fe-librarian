"use client"
import React, {JSX, memo, useEffect} from "react";
import {useLazyGetEpubResourceQuery} from "@/stores/slices/api/resource.static.slice";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {useSelector} from "@/hooks/useSelector";
import {shallowEqual} from "react-redux";
import {useParams} from "next/navigation";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToEBookState} from "@/stores/slices/book-states/e-book.book.slice";
import {Button, Chip, LinearProgress, Pagination, Stack, Tooltip, Typography} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {shadowContainerStyle, shadowStyle} from "@/style/container.style";
import AppPagination from "@/components/primary/Input/AppPagination";

function Navigation(): JSX.Element {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const currentChapter = useSelector(state => state.eBookState.currentChapter, shallowEqual);
    const [getEBook, {data, isFetching, error}] = useLazyGetEpubResourceQuery();
    useEffect(() => {
        if (currentChapter && id) {
            getEBook({bookId: Number.parseInt(id as string), chapterIndex: currentChapter});
        }
    }, [currentChapter, id, getEBook]);
    useEffect(() => {
        if (data?.data) {
            dispatch(setPropToEBookState({key: "currentEBook", value: data.data}));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message)
        }
    }, [error]);
    return (
        <>
            {isFetching && <LinearProgress/>}
            <ChapterChanger
                currentPage={data?.page ?? (data?.currentPage ?? 1)}
                totalPages={data?.pageCount ?? 1}
                onPageChange={(value) => dispatch(setPropToEBookState({key: "currentChapter", value}))}
            />
        </>

    );
}

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ChapterChanger = memo(({
    currentPage,
    totalPages,
    onPageChange,
}: CustomPaginationProps) => {
    return (
        <Stack sx={{
            position: "absolute",
            bottom: 0, width: "100%"
        }}>
            <Stack sx={{
                ...shadowContainerStyle,
                bgcolor: color.LIGHTER_SHADOW,
                backdropFilter: "blur(2px)",
                borderRadius: 50,
                mb: 1,

            }}
                   direction="row" spacing={2} alignItems="center" justifyContent="center" mx={"auto"} py={1} px={3}>

                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {appStrings.PREV}
                </Button>
                <AppPagination
                    page={currentPage}
                    count={totalPages}
                    onChange={(_, value) => onPageChange(value)}
                    siblingCount={1}
                    boundaryCount={2}/>

                <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon/>}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {appStrings.NEXT}
                </Button>
            </Stack>
        </Stack>)
})

export default memo(Navigation);

