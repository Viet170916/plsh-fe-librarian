import React, {ChangeEvent, memo, useCallback, useEffect, useState} from "react";
import {ButtonBase, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {file_FilesToUrl} from "@/helpers/convert";
import {Resource} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {truncateTextStyle} from "@/style/text.style";
import {BiImageAdd} from "react-icons/bi";

interface IProps {
    children?: React.ReactNode;
    onImageChange?: (resource: Resource, file?: { localUrl: string, file?: File }) => void;
}

function UploadImageButton(props: IProps) {
    const [resource, setResource] = useState<Resource>();

    const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const render: Resource = {
            localUrl: file_FilesToUrl(file as File) as string,
            type: "image",
            fileType: file?.type,
            name: file?.name,
            file: file,
            sizeByte: file?.size,
        }
        setResource(render);
        props.onImageChange?.(render, {localUrl: file_FilesToUrl(file as File) as string, file});
    }, [resource]);
    return (
        <ImageButton
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                backgroundColor: color.LIGHTER_SHADOW,
            }}
            component="label"
            tabIndex={-1}
        >
            <ImageSrc
                style={{backgroundImage: `url(${resource?.localUrl ?? ""})`}}/>
            <ImageBackdrop className="MuiImageBackdrop-root"/>
            <Image alt={""}>
                <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        ...truncateTextStyle,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        width: '100%',
                        bottom: 0,
                        height: 40,
                        background: color.SHADOW,
                        color: color.WHITE,
                        textAlign: "center",
                    }}
                >
                    {resource?.name ??
                        <BiImageAdd size={20} color={color.WHITE} className="MuiImageMarked-root"/>
                    }
                </Typography>
            </Image>
            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </ImageButton>);
}

const VisuallyHiddenInput = styled('input')({
    height: 1,
    overflow: 'hidden',
    position: 'relative',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface ImageButtonProps {
    component: string
}

const ImageButton
    = styled(ButtonBase)<ImageButtonProps>
(({theme, component}) => ({
    component: "label",

    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },

    '& .MuiImageBackdrop-root': {
        opacity: 0,
    },


    '&:hover, &.Mui-focusVisible': {
        // zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0.15,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

interface ImageProps {
    alt?: string | undefined
}


const Image = styled('span')<ImageProps>(({theme, alt}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));


export default memo(UploadImageButton);