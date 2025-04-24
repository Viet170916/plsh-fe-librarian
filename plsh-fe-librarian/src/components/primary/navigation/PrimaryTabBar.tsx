"use client"
import React, {memo, ReactNode, Ref, useEffect, useRef} from "react";
import {useTheme} from "@mui/material/styles";
import {usePathname} from "next/navigation";
import Grid from "@mui/material/Grid2";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {Box, Typography} from "@mui/material";
import Link from "next/link";
import {color} from "@/helpers/resources";

type PrimaryTabBarProps = {
    left?: ReactNode;
    right?: ReactNode;
    tabs?: { label: string, href: string, index: number }[],
    bgcolor?: string;
}


export const PrimaryTabBar = memo(({tabs, left, right}: PrimaryTabBarProps) => {
        const theme = useTheme();
        const indicatorRef = useRef<HTMLDivElement>(null);
        const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
        const path = usePathname();

        useEffect(() => {
            if (tabs) {
                const activeTab = tabRefs.current[tabs.find(t => path === t.href)?.index ?? 0]
                const indicator = indicatorRef.current;
                if (activeTab && indicator) {
                    const {offsetLeft, offsetTop, clientWidth, clientHeight} = activeTab;
                    indicator.style.left = `${offsetLeft - 12}px`;
                    indicator.style.top = `${offsetTop}px`;
                    indicator.style.width = `${clientWidth + 24}px`;
                }
            }
        }, [tabs, path, left]);

        return (
            <Grid container width={"100%"} alignItems={"center"}
                  justifyContent={!left || !right ? "center" : "start"}
                  sx={{
                      bgcolor: theme.palette.grey[400], pt: 1,
                      borderRadius: 12,
                      alignItems: "stretch"
                  }}>
                {left &&
                    <Grid justifySelf={"start"}
                          boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()}
                          sx={{
                              px: 1,
                              py: .5,
                              mb: 1,
                              bgcolor: theme.palette.background.default,
                              borderRadius: 12,
                              overflow: "hidden"
                          }}>{left}
                    </Grid>}
                {tabs &&
                    <Grid
                        sx={{
                            bgcolor: theme.palette.grey[400],
                            ml: 3,
                            px: 3,
                            mb: 1,
                            position: "relative",
                            width: "fit-content",
                        }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center", position: "relative", height: "100%"
                                    }}>

                                            <Grid
                                                ref={indicatorRef}
                                                boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()}
                                                sx={{
                                                    borderRadius: 2,
                                                    position: "absolute",
                                                    py: 1,
                                                    bgcolor: theme.palette.background.default,
                                                    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                                                    zIndex: 1,
                                                    height: "100%"
                                                }}
                                                container
                                            >

                                                {/*<Box width={20} height={"100%"}*/}
                                                {/*     sx={{*/}
                                                {/*         bgcolor: theme.palette.primary.main,*/}
                                                {/*         borderBottomRightRadius: 12*/}
                                                {/*     }}/>*/}
                                                {/*<Box height={20} width={"100%"}*/}
                                                {/*     sx={{*/}
                                                {/*         bgcolor: theme.palette.primary.main,*/}
                                                {/*         position: "absolute"*/}
                                                {/*     }}/>*/}
                                                {/*<Grid size={"grow"}*/}
                                                {/*      sx={{*/}
                                                {/*          bgcolor: theme.palette.background.default,*/}
                                                {/*          borderTopRightRadius: 12,*/}
                                                {/*          borderTopLeftRadius: 12,*/}
                                                {/*          zIndex: 3*/}
                                                {/*      }}/>*/}
                                                {/*<Box width={20} height={"100%"}*/}
                                                {/*     sx={{*/}
                                                {/*         bgcolor: theme.palette.primary.main,*/}
                                                {/*         borderBottomLeftRadius: 12*/}
                                                {/*     }}/>*/}
                                            </Grid>
                                            <Box sx={{display: "flex", gap: 3, position: "relative", zIndex: 2}}>
                                                {tabs.map((tab, index) => {
                                                    const isActive = tabs.find(t => path === t.href)?.index === index;

                                                    return (
                                                        <Link key={tab.href} href={tab.href}>
                                                            <Box
                                                                key={index}
                                                                ref={((el: unknown) => (tabRefs.current[index] = el as (HTMLDivElement | null)) as unknown) as Ref<unknown>}
                                                                sx={{
                                                                    height: "100%",
                                                                    justifyContent: "center",
                                                                    cursor: "pointer",
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    alignItems: "center",
                                                                    px: 2,
                                                                    color: isActive ? theme.palette.primary.main : color.LIGHT_TEXT,
                                                                }}
                                                            >
                                                                <Typography variant="body2" sx={{
                                                                    // mt: 0.5
                                                                    py: 1,
                                                                }}>
                                                                    {tab.label}
                                                                </Typography>
                                                            </Box>
                                                        </Link>
                                                    );
                                                })}
                                            </Box>
                                </Box>
                    </Grid>
                }
                {right &&
                    <Grid justifySelf={"end"}
                          container
                          alignItems={"center"}
                          sx={{
                              px: .5,
                              mb: 1,
                              mr: 5,
                              ml: 2,
                              bgcolor: theme.palette.background.default,
                              borderRadius: 12,
                              overflow: "hidden"
                          }}>{right}
                    </Grid>}
            </Grid>
        );
    }
)


