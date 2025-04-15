"use client"
import React, {JSX, memo} from "react";
import animation from "@/json/lotties/library.json";
import Lottie from "react-lottie";

type LottieProps = {
    width?: number | string;
    height?: number | string;
}

function LibAnimation({width, height}: LottieProps): JSX.Element {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
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

export default memo(LibAnimation);

