"use client";

import {Box, Typography} from "@mui/material";
import React, {memo, ReactNode, Ref, useEffect, useRef} from "react";
import Grid from "@mui/material/Grid2";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {color} from "@/helpers/resources";
import {motion} from "framer-motion";
import {useTheme} from "@mui/material/styles";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";


export const TabBar = memo(({tabs, left, bgcolor, right}: {
        left?: ReactNode;
        right?: ReactNode;
        tabs?: { label: string, href: string, index: number }[],
        bgcolor?: string;
    }) => {
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
                    // if (!left) {
                    //     indicator.style.height = `${clientHeight + 12}px`;
                    // }
                }
            }
        }, [tabs, path, left]);

        return (
            <Grid container width={"100%"} alignItems={"center"}
                  sx={{
                      bgcolor: theme.palette.primary.main, pt: 1,
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
                            bgcolor: theme.palette.primary.main,
                            ml: 3,
                            px: 3,
                            // pb: left ? 0 : 1.5,
                            // pb: 1.5,
                            // maxWidth: 500,
                            // overflowX: "auto",
                            mb: 1,
                            textAlign: "center",
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
                          boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()}
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
                {bgcolor ? <motion.div
                        animate={{
                            backgroundColor: bgcolor ?? theme.palette.background.default,
                        }}
                        transition={{duration: 0.4}}
                        style={{
                            borderRadius: "50px 50px 0 0",
                            zIndex: 2,
                            height: 20,
                            width: "100%",
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                        }}
                    />
                    : <Grid
                        size={12}
                        sx={{
                            // borderRadius: "50px 0 0 0",
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW_TOP_LEFT,
                            bgcolor: theme.palette.background.default,
                            zIndex: 2,
                            height: 20,
                            width: "100%",
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                        }}
                    />}

            </Grid>
        );
    }
)
