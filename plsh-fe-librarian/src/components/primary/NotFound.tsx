"use client";
import appStrings from "@/helpers/appStrings";
import {useRouter} from "next/navigation";
import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import "@/style/not-found.css";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

interface NotFoundProps {
    reset?: () => void;
    message?: string;
}

function NotFound({reset, message}: NotFoundProps) {
    const theme = useTheme();
    const [pageX, setPageX] = useState(0);
    const [pageY, setPageY] = useState(0);
    const [xAxis, setXAxis] = useState(0);
    const [yAxis, setYAxis] = useState(0);
    const router = useRouter();

    const animationFrameRef = useRef<number | null>(null);
    const latestMouseEvent = useRef<MouseEvent | null>(null);
    const lastUpdateTime = useRef<number>(0); // Store last update time to debounce

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageX(window.innerWidth);
            setPageY(window.innerHeight);
        }
    }, []);

    // Handle mouse movement and update state with debounce
    const handleMouseMove = useCallback((event: MouseEvent) => {
        latestMouseEvent.current = event;
        const now = Date.now();

        // Only update the state if sufficient time has passed (debounce)
        if (now - lastUpdateTime.current > 10) {
            lastUpdateTime.current = now;

            if (animationFrameRef.current === null) {
                animationFrameRef.current = requestAnimationFrame(() => {
                    if (latestMouseEvent.current) {
                        const {pageX: mouseX, pageY: mouseY} = latestMouseEvent.current;
                        setXAxis(-(mouseX / -pageX) * 100 - 100);
                        setYAxis((pageY / 2 - mouseY) / pageY * 300);
                    }
                    animationFrameRef.current = null;
                });
            }
        }
    }, [pageX, pageY]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [pageX, pageY, handleMouseMove]);

    return (
        <Grid
            sx={{
                width: "100%",
                height: "100%!important",
                maxHeight: "100%",
                borderRadius: "0!important",
                background: theme.palette.background.default,
            }}
            className="box"
        >
            <div className="box__ghost">
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="box__ghost-container">
                    <div className="box__ghost-eyes" style={{transform: `translate(${xAxis}%, -${yAxis}%)`}}>
                        <div className="box__eye-left"></div>
                        <div className="box__eye-right"></div>
                    </div>
                    <div className="box__ghost-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="box__ghost-shadow"></div>
            </div>
            <div className="box__description">
                <div className="box__description-container">
                    <div className="box__description-title">Whoops!</div>
                    <div className="box__description-text">
                        {message ?? "Có vẻ như chúng tôi không thể tìm thấy trang bạn đang tìm kiếm."}
                    </div>
                </div>
                <NeumorphicButton
                    fullWidth
                    variant_2="primary"
                    color="primary"
                    onClick={() => router.back()}
                >
                    {appStrings.GO_BACK}
                </NeumorphicButton>
            </div>
        </Grid>
    );
}

export default memo(NotFound);
