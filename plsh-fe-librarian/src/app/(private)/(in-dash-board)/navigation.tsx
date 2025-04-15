'use client'
import React, {memo} from 'react'
import {Box, Typography, useMediaQuery} from '@mui/material'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {color, theme} from "@/helpers/resources";
import {TbLayoutDashboardFilled} from "react-icons/tb";
import appStrings from "@/helpers/appStrings";
import {FaBookBookmark} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {ImBooks} from "react-icons/im";
import {IoLogOut, IoSettings} from "react-icons/io5";
import {motion} from 'framer-motion';
import {ImageWithBgCoverWithoutSkeleton} from "@/components/primary/ImageWithBgCover";
import {HiOutlineLibrary} from "react-icons/hi";

const navItems = [
    {label: appStrings.DASHBOARD, icon: <TbLayoutDashboardFilled size={24}/>, href: '/dashboard'},
    {label: appStrings.BORROW, icon: <FaBookBookmark size={24}/>, href: '/borrow'},
    {label: appStrings.MEMBERS, icon: <FaUsers size={24}/>, href: '/members'},
    {label: appStrings.BOOK, icon: <ImBooks size={24}/>, href: '/resources/books'},
    {
        href: "/resources/library-room",
        label: appStrings.LIBRARY_ROOM,
        icon: <HiOutlineLibrary color={color.PRIMARY} size={24}/>,
    },
    {label: appStrings.SETTING, icon: <IoSettings size={24}/>, href: '/setting'},
    {label: appStrings.LOGOUT, icon: <IoLogOut size={24}/>, href: '/logout'},
]

export const AppNavigation = () => {
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
    const pathname = usePathname()
    const expanded = isLargeScreen

    return (
        <Box
            sx={{
                height: '100vh',
                width: expanded ? 240 : 80,
                bgcolor: color.PRIMARY,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'width 0.3s ease',
                borderTopRightRadius: 24,
                borderBottomRightRadius: 24,
            }}
        >
            {isLargeScreen && <Box sx={{
                bgcolor: color.WHITE,
                p: 1,
                borderRadius: 2,
                borderBottomRightRadius: 23,
                borderTopRightRadius: 23,
                width: "100%"
            }}>
                        <Box sx={{width: 70, height: 60,}}>
                                    <ImageWithBgCoverWithoutSkeleton src={`/images/logo.svg`}/>
                        </Box>
            </Box>}


            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        style={{textDecoration: 'none'}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: isActive ? 10 : 0}} // Dùng giá trị y để di chuyển lên/xuống
                            transition={{type: 'spring', stiffness: 300}}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: '999px',
                                    bgcolor: isActive ? color.LIGHT_TEXT : 'transparent',
                                    color: isActive ? color.PRIMARY : color.LIGHT_TEXT,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: isActive ? color.LIGHT_TEXT : color.PRIMARY,
                                    },
                                }}
                            >
                                {item.icon}
                                {expanded && (
                                    <Typography fontSize={16} fontWeight="medium">
                                        {item.label}
                                    </Typography>
                                )}
                            </Box>
                        </motion.div>
                    </Link>
                )
            })}
        </Box>
    )
}

export default memo(AppNavigation);
