"use client";
import {color} from "@/helpers/resources";
import {Skeleton} from "@mui/material";
import Image, {StaticImageData} from "next/image";
import React, {useEffect, useMemo} from "react";
import {memo, useState} from "react";

type IProps =
    {
        children?: React.ReactNode,
        src: string | StaticImageData | null,
        width?: number,
        height?: number,
        fill?: boolean,
        alt?: string
    }

function ImageWithSkltWhileLoading(props: IProps) {
    const [src, setSrc] = useState<string | StaticImageData | undefined>(props.src);
    useEffect(() => {
        setSrc(props.src);
    }, [props.src]);
    const [isLoaded, setLoading] = useState<boolean>(true);
    return (<>
            {
                isLoaded && <Skeleton
                    sx={{bgcolor: color.WHITE}}
                    variant="rectangular"
                    width={props.width}
                    height={props.height}
                />
            }
            <Image
                hidden={isLoaded}
                src={src ?? "https://via.placeholder.com/no-image"}
                style={{backgroundColor: color.WHITE}}
                priority={true}
                // sizes="100vh"
                alt={props.alt ?? ""}
                fill={props.fill}
                width={props.fill ? undefined : props.width}
                height={props.fill ? undefined : props.height}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setSrc("/images/fallback.svg");
                }}
            />
        </>
    );
}

export default memo(ImageWithSkltWhileLoading);

