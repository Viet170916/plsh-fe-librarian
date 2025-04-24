"use client";
import {ImageWithBgCoverWithoutSkeleton} from "@/components/primary/ImageWithBgCover";
import {file_FilesToUrl} from "@/helpers/convert";
import {color} from "@/helpers/resources";
import {setResource} from "@/stores/slices/book-states/book.add-edit.slice";
import {RootState} from "@/stores/store";
import {truncateTextStyle} from "@/style/text.style";
import NotesIcon from "@mui/icons-material/NoteOutlined";
import ReviewsIcon from "@mui/icons-material/RateReviewOutlined";
import {Box, ButtonBase, Card, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import React, {ChangeEvent, memo, useCallback} from "react";
import {BiImageAdd} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import GetImageFromGg from "@/app/(private)/(in-dash-board)/resources/books/add/GetImageFromGg";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface BookImageProps {
    src: string;
}

const Add_EditBookImage = (props: BookImageProps) => {
    const dispatch = useDispatch();
    const addEditBookResource = useSelector((state: RootState) => state.addEditBookData.resource);
    const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        dispatch(setResource({
            ...addEditBookResource, coverImage: {
                localUrl: file_FilesToUrl(file as File) as string,
                type: "image",
                fileType: file?.type,
                name: file?.name,
                sizeByte: file?.size,
            },
        }));
    }, [addEditBookResource, dispatch]);
    return (
        <Card
            sx={{
                width: 273,
                height: 405,
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Box sx={{width: 209, height: 277, margin: "32px"}} position={"relative"}>
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
                    <ImageWithBgCoverWithoutSkeleton src={addEditBookResource?.coverImage?.localUrl}/>
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
                                textAlign: "center",
                            }}
                        >
                            {addEditBookResource?.coverImage?.name ??
                                <BiImageAdd size={20} color={color.PRIMARY} className="MuiImageMarked-root"/>
                            }
                        </Typography>
                    </Image>
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </ImageButton>
            </Box>
            <Box
                sx={{
                    width: 193,
                    height: 52,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                }}
            >
                <Box sx={{textAlign: "center"}}>
                    <ReviewsIcon sx={{fontSize: 32}}/>
                    <Typography variant="body2" fontWeight="bold" color="#333333">
                        Review
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <NotesIcon sx={{fontSize: 32}}/>
                    <Typography variant="body2" fontWeight="bold" color="#333333">
                        Notes
                    </Typography>
                </Box>
                <Box sx={{textAlign: "center"}}>

                    <GetImageFromGg/>
                </Box>
            </Box>
        </Card>
    );
};
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
    component: string;
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
    alt?: string | undefined;
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
const ImageMarked = styled('span')(({theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));
export default memo(Add_EditBookImage);
