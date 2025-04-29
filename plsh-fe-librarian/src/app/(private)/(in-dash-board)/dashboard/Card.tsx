"use client"
import React, {memo} from "react";
import {Box, Button, Card, CardContent} from '@mui/material'
import {styled} from '@mui/system'
import {color} from "@/helpers/resources";

type PostCardProps = {
    left?: React.ReactNode;
    children: React.ReactNode;
    reverse?: boolean,
}
export const GradientButton = styled(Button)(({theme}) => ({
    background: 'linear-gradient(90deg, #f2994a, #f15a29)',
    borderRadius: 40,
    padding: '12px 24px',
    fontWeight: 700,
    color: 'white',
    textTransform: 'uppercase',
    boxShadow: '0 8px 24px rgba(241, 90, 41, 0.4)',
    '&:hover': {
        background: 'linear-gradient(90deg, #f2994a, #f15a29)',
        opacity: 0.9,
    },
}))

function PostCard({left, children, reverse = false}: PostCardProps) {
    return (
        <Box
            sx={{
                height: "100%",
                position: 'relative',
                maxWidth: 900,
                mx: 'auto',
                pl: reverse ? 0 : 6,
                pr: reverse ? 6 : 0,
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    height: "100%",
                    borderRadius: 5,
                    boxShadow: '0px 12px 36px rgba(0,0,0,0.1)',
                    pl: reverse ? 0 : 'calc(45% - 20px)',
                    pr: reverse ? 'calc(45% - 20px)' : 0,
                    overflow: 'visible',
                }}
            >
                <CardContent
                    sx={{
                        flex: 1,
                        px: 4,
                        py: 4,
                        borderTopRightRadius: reverse ? 0 : 32,
                        borderBottomRightRadius: reverse ? 0 : 32,
                        borderTopLeftRadius: reverse ? 32 : 0,
                        borderBottomLeftRadius: reverse ? 32 : 0,
                    }}
                >
                    {children}
                    {/*<Stack direction="row" spacing={2} alignItems="center">*/}
                    {/*    <GradientButton>Read More</GradientButton>*/}
                    {/*<Stack spacing={1} alignItems="center">*/}
                    {/*    <Box sx={{width: 10, height: 30, borderRadius: 5, bgcolor: '#f15a29'}}/>*/}
                    {/*    <Box sx={{width: 10, height: 10, borderRadius: '50%', bgcolor: '#dcdcdc'}}/>*/}
                    {/*    <Box sx={{width: 10, height: 10, borderRadius: '50%', bgcolor: '#dcdcdc'}}/>*/}
                    {/*</Stack>*/}
                    {/*</Stack>*/}
                </CardContent>
            </Card>
            <Box
                sx={{
                    position: 'absolute',
                    top: 30,
                    left: reverse ? 'auto' : 0,
                    right: reverse ? 0 : 'auto',
                    width: '45%',
                    height: 'calc(100% - 60px)',
                    borderRadius: 5,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top left, ${color.PRIMARY}, ${color.SIXTH})`,
                        zIndex: 1,
                    }}
                >
                    {left}
                </Box>
            </Box>
        </Box>
    )
}


export default memo(PostCard);

