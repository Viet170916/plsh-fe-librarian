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

const mock: BookData[] = [{
    category: "History",
    version: "1.0",
    imageUrl: "https://image.com/upload/v1/",
    title: "The title",
    author: {name: "My name", birthYear: "1890", deathYear: "1978"},
    rating: 3.5,
    id: 1,
    availabilities: [
        {isChecked: false, title: "E-book"},
        {isChecked: true, title: "Physical book"},
        {isChecked: true, title: "Audio book"}],
    bookStatus: {
        bookId: 0,
        position: "A R2-C4",
        bookName: "unknown",
        bookAvailabilityStatuses: [{status: "In-Shelf", count: 13}, {status: "Checked Out", count: 2}],
    }
},
    {
        category: "History",
        version: "1.0",
        imageUrl: "https://image.com/upload/v1/",
        title: "The title",
        author: {name: "My name", birthYear: "1890", deathYear: "1978"},
        rating: 3.5,
        id: 2,
        availabilities: [
            {isChecked: false, title: "E-book"},
            {isChecked: true, title: "Physical book"},
            {isChecked: true, title: "Audio book"}],
        bookStatus: {
            bookId: 0,
            position: "A R2-C4",
            bookName: "unknown",
            bookAvailabilityStatuses: [{status: "In-Shelf", count: 13}, {status: "Checked Out", count: 2}],
        }
    },
    {
        category: "History",
        version: "1.0",
        imageUrl: "https://image.com/upload/v1/",
        title: "The title",
        author: {name: "My name", birthYear: "1890", deathYear: "1978"},
        rating: 3.5,
        id: 3,
        availabilities: [
            {isChecked: false, title: "E-book"},
            {isChecked: true, title: "Physical book"},
            {isChecked: true, title: "Audio book"}],
        bookStatus: {
            bookId: 0,
            position: "A R2-C4",
            bookName: "unknown",
            bookAvailabilityStatuses: [{status: "In-Shelf", count: 13}, {status: "Checked Out", count: 2}],
        }
    }];


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