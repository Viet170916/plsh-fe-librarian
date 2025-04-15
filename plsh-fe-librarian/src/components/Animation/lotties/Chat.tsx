"use client"
import React, {JSX, memo} from "react";
import chatAnimation from "@/json/lotties/Chatting.json";
import Lottie from "react-lottie";

type ChatProps = {
    width?: number;
    height?: number;
}

function ChatAnimation({width, height}: ChatProps): JSX.Element {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: chatAnimation,
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

export default memo(ChatAnimation);

