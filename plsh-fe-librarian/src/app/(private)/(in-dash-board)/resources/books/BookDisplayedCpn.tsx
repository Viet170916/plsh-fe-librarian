"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import Container from "@/components/primary/Container";
import BookTable from "@/components/book-table";
import {useGetBooksQuery} from "@/stores/slices/api/book.api.slice";
import {Pagination} from "@mui/material";
import {BookData} from "@/helpers/appType";

interface IProps {
    children?: React.ReactNode;
}

const mock: BookData[] = [];


function
BookDisplayedCpn(props: IProps) {
    const [pageNumber, setPage] = useState<number>();
    const {data, error, isLoading, refetch} = useGetBooksQuery({page: pageNumber, limit: 10, orderBy: "createdAt"}, {});
    useEffect(() => {
        if (error) {

        }
    }, [error]);
    const onPageChange = useCallback((value: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }, []);
    const pagination = useMemo(() => {
        return <Pagination count={data?.pageCount ?? 2} variant="outlined" shape="rounded" onChange={onPageChange}/>

    }, [data?.pageCount, onPageChange])

    return (
        <Container maxWidth={"xl"} sx={{justifyContent: "center", alignItems: "center", padding: "0!important"}}>
            <BookTable books={data?.data ?? mock} isLoading={isLoading}/>
            {pagination}
        </Container>);
}

export default memo(BookDisplayedCpn);