"use client"
import React, {JSX, memo} from "react";
import botAnimation from "@/json/lotties/BookHiveBot.json"
import Lottie from "react-lottie";

type BotProps = {
    width?: number;
    height?: number;
}

function Bot({width, height}: BotProps): JSX.Element {
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
            height={width ?? 40}
            width={height ?? 40}
        />
    );
}

export default memo(Bot);

