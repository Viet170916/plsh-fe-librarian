"use client"
import React, {JSX, memo} from "react";
import botAnimation from "@/json/lotties/book.json"
import Lottie from "react-lottie";

type BotProps = {
    width?: number;
    height?: number;
}

function Book({width, height}: BotProps): JSX.Element {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: botAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <Lottie
            isClickToPauseDisabled
            options={defaultOptions}
            height={height ?? 40}
            width={width ?? 40}
        />
    );
}

export default memo(Book);

