import React, {memo} from "react";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}

const books = [
    {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        year: 2000,
        image: "https://via.placeholder.com/120x180",
    },
    {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        year: 1988,
        image: "https://via.placeholder.com/120x180",
    },
    {
        title: "Sprint: How to Solve...",
        author: "Jake Knapp",
        year: 2000,
        image: "https://via.placeholder.com/120x180",
    },
];
function SelectedBook(props: IProps) {
    return (
        <Box sx={{display: "flex", gap: 2}}>
            {books.map((book, index) => (
                <Card key={index} sx={{width: 160, boxShadow: 2, borderRadius: 2}}>
                    <CardMedia component="img" height="180" image={book.image} alt={book.title}/>
                    <CardContent>
                        <Typography variant="body1" fontWeight="bold">{book.title}</Typography>
                        <Typography variant="body2">{book.author}, {book.year}</Typography>
                        <Typography variant="caption">14k Readers</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>);
}

export default memo(SelectedBook);