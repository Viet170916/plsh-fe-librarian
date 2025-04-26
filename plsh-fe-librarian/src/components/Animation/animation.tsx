"use client";
import {motion, MotionStyle} from "framer-motion";
import React, {memo, ReactNode} from "react";
import {Box} from "@mui/material";


interface AnimationProps {
    ref?: unknown;
    children: ReactNode;
    index: number,
    style?: MotionStyle,

}

export const ZoomInAnimation = memo(({children, style}: AnimationProps) => {
    return (
        <motion.div
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.3}}
            style={{width: "100%", ...style}}
        >
            {children}
        </motion.div>
    );
})

export const SlideInFromRight = memo(({
        children,
        index,
    }: AnimationProps) => {
        return (
            <motion.div
                initial={{opacity: 0, x: 100}}
                animate={{opacity: 1, x: 0}}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    bounce: 0.9,
                    delay: index * 0.09,
                }}
                style={{width: "100%"}}
                exit={{
                    x: 300, opacity: 0, transition: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 20,
                        bounce: 0.9,
                    }
                }}
            >
                {children}
            </motion.div>
        );
    }
)

export const SlideInFromLeft = memo(({
    children,
    index,
}: AnimationProps) => {
    return (
        <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{opacity: 1, x: 0}}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                bounce: 3,
                delay: index * 0.09,
            }}
            style={{width: "100%"}}
            exit={{
                x: -300,
                opacity: 0,
                transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    bounce: 0.9,
                }
            }}
        >
            {children}
        </motion.div>
    );
});

export const Zoom = memo(({
    children,
    index,
    style,
}: AnimationProps) => {
    return (
        <motion.div
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.03,
            }}
            style={{width: "100%", ...style}}
        >
            {children}
        </motion.div>
    );
})

export const ScrollAnimation = motion(Box);
export const scrollProps = {
    initial: {y: 10},
    animate: {y: [10, -5, 0]},
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.6,
    }
}
