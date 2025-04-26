"use client"
import React, {memo} from "react";


import {Box, Breadcrumbs, Link, Typography} from '@mui/material';
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {useTheme} from "@mui/material/styles";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

type AppBreadcrumbsProps = {
    links: BreadcrumbItem[];
}

const AppBreadcrumbs = ({links}: AppBreadcrumbsProps) => {
    const theme = useTheme();
    if (!links || links.length === 0) return null;
    return (
        <Box sx={{boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(), width: "fit-content", px: 2, py: .2, borderRadius: 1}}>
            <Breadcrumbs aria-label="breadcrumb" color={"textPrimary"}>
                {links.map((item, index) => {
                    const isLast = index === links.length - 1;
                    return isLast ? (
                        <Typography key={index} sx={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: 'primary',
                            textShadow: NEUMORPHIC_SHADOW.SHADOW()
                        }}>
                            {item.label}
                        </Typography>
                    ) : (
                        <Link

                            key={index}
                            underline="hover"
                            color={theme.palette.text.primary}
                            fontSize={16}
                            sx={{textShadow: NEUMORPHIC_SHADOW.TEXT_SHADOW()}}
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>

    );
};

export default memo(AppBreadcrumbs);

