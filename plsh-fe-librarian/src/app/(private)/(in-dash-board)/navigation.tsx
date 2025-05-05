'use client'
import React, {memo} from 'react'
import {Box, Typography, useMediaQuery} from '@mui/material'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {color} from "@/helpers/resources";
import {TbHistory, TbLayoutDashboardFilled} from "react-icons/tb";
import appStrings from "@/helpers/appStrings";
import {FaBookBookmark, FaMoneyBillTransfer} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {ImBooks} from "react-icons/im";
import {IoLogOut, IoSettings} from "react-icons/io5";
import {motion} from 'framer-motion';
import {HiOutlineLibrary} from "react-icons/hi";
import Book from "@/components/Animation/lotties/Book";
import {useTheme} from "@mui/material/styles";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

const navItems = [
    // {label: appStrings.DASHBOARD, icon: <TbLayoutDashboardFilled size={24}/>, href: '/dashboard'},
    {label: appStrings.BORROW, icon: <FaBookBookmark size={24}/>, href: '/borrow'},
    {label: appStrings.MEMBERS, icon: <FaUsers size={24}/>, href: '/members'},
    {label: appStrings.BOOK, icon: <ImBooks size={24}/>, href: '/resources/books'},
    {
        label: appStrings.TRANSACTION,
        icon: <FaMoneyBillTransfer size={24}/>,
        href: `/transaction/fine`
    },{
        label: appStrings.transaction.HISTORY,
        icon: <TbHistory size={24}/>,
        href: `/transaction/history`
    },
    {
        href: "/resources/library-room",
        label: appStrings.LIBRARY_ROOM,
        icon: <HiOutlineLibrary size={24}/>,
    },
    // {label: appStrings.SETTING, icon: <IoSettings size={24}/>, href: '/setting'},
    {label: appStrings.LOGOUT, icon: <IoLogOut size={24}/>, href: '/logout'},
]

export const AppNavigation = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
    const pathname = usePathname();
    const expanded = isLargeScreen

    return (
        <Box
            sx={{
                height: '100%',
                width: expanded ? 240 : 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                p: 2,
                pt: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'width 0.3s ease',
                // borderTopRightRadius: 24,
                borderBottomRightRadius: 24,
            }}
        >
            {isLargeScreen && <Box sx={{
                bgcolor: color.PRIMARY,
                p: 1,
                pt: 0,
                borderRadius: 2,
                borderBottomRightRadius: 23,
                borderTopRightRadius: 23,
                width: "100%"
            }}>
                        <Book width={160} height={70}/>
            </Box>}


            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                if (item.href === "/logout") {
                    return (
                        <Box
                            key={item.label}

                            // href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.removeItem('token');
                                window.location.reload();
                            }}
                            sx={{textDecoration: 'none', cursor: "pointer"}}
                        >
                            <motion.div
                                initial={{y: 0}}
                                animate={{y: isActive ? 10 : 0}}
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
                                        boxShadow: isActive ? NEUMORPHIC_SHADOW.INNER_SHADOW() : "none",
                                        bgcolor: isActive ? theme.palette.background.default : 'transparent',
                                        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: isActive ? theme.palette.text.secondary : theme.palette.primary.main,
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
                        </Box>
                    )
                }
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        style={{textDecoration: 'none'}}
                    >
                        <motion.div
                            initial={{y: 0}}
                            animate={{y: isActive ? 10 : 0}}
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
                                    boxShadow: isActive? NEUMORPHIC_SHADOW.INNER_SHADOW():"none",
                                    bgcolor: isActive ? theme.palette.background.default : 'transparent',
                                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: isActive ? theme.palette.text.secondary : theme.palette.primary.main,
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
