'use client';
import ModalPanel from "@/components/primary/ModalPanel";
import appStrings from "@/helpers/appStrings";
import {Resource} from "@/helpers/appType";
import {urlToFile} from "@/helpers/convert";
import {color} from "@/helpers/resources";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {Button} from '@mui/material';
import Grid from "@mui/material/Grid2";
import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import {TbPhotoUp} from "react-icons/tb";
import AppButton from "@/components/primary/Input/AppButton";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

const MAX_IMAGES = 5;

interface IProps {
    children?: React.ReactNode,
    maxImages: number,
    onImageChange?: (imageUrls: Resource[]) => void,
    value?: Resource[]
}

function UploadOrTakeImage({onImageChange, maxImages}: IProps) {
    // const [ images, setImages ] = useState<Resource[]>( [] );
    const [triggerClose, setTriggerClose] = useState(false);
    // useEffect( () => {
    // 				onImageChange?.( images );
    // }, [ images, onImageChange ] );
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);
        const newImages: Resource[] = files.map(file => ({
            file: file,
            localUrl: URL.createObjectURL(file),
            name: file.name,
            sizeByte: file.size,
            fileType: file.type,
            type: "image",
        }));
        onImageChange?.(newImages);
    };
    return (
        <Grid className="p-4 space-y-4" container width={"100%"} justifyContent="center" alignItems="center">
            <Grid size={6}>
                <NeumorphicButton
                    fullWidth
                    sx={{color: color.LIGHT_TEXT, width: "fit-content"}} component={"label"} variant={"contained"}
                    startIcon={<TbPhotoUp/>}
                >
                    {appStrings.UPLOAD_IMAGE}
                    <input
                        style={{width: 1, height: 1}}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                </NeumorphicButton>
            </Grid>
            <Grid size={3} sx={{margin: "0!important"}}>
                <ModalPanel close={triggerClose} buttonContent={<PhotoCameraIcon/>}
                            buttonStyle={{borderColor: color.PRIMARY}}>
                    <TakePicture
                        onImageChange={(preview) => {
                            if (preview) {
                                urlToFile(preview, `unknown_${new Date().getTime()}.png`, "image/jpeg").then((result) => {
                                    onImageChange?.([{
                                        file: result,
                                        localUrl: preview ?? undefined,
                                        type: "image",
                                        fileType: result.type,
                                        name: result.name,
                                        sizeByte: result.size,
                                    }]);
                                });
                            }
                            setTriggerClose(prev => !prev);
                        }}
                    />
                </ModalPanel>
            </Grid>
            <Grid size={12}>
            </Grid>
        </Grid>
    )
        ;
}

const TakePicture = memo(function TakePictureMemo(props: {
        onImageChange: (image: string | null) => void;
    }) {
        const [preview, setPreview] = useState<string | null>(null);
        const videoRef = useRef<HTMLVideoElement | null>(null);
        const streamRef = useRef<MediaStream | null>(null);
        const retakeImage = async () => {
            setPreview(null);
            await openCamera();
        };
        const openCamera = useCallback(async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {width: 1280, height: 720},
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play();
                    };
                }
            } catch (err) {
                console.error('Camera error:', err);
            }
        }, []);
        const closeCamera = useCallback(async () => {
            setPreview(null);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.srcObject = null;
                videoRef.current.load();
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    track.enabled = false;
                    track.stop();
                });
                streamRef.current = null;
            }
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter(device => device.kind === "videoinput");
            if (videoInputs.length > 0) {
                navigator.mediaDevices.getUserMedia({video: false}).catch(() => {
                });
            }
        }, []);
        useEffect(() => {
            openCamera().then();
            return () => {
                closeCamera().then(() => {
                });
                setPreview(null);
            };
        }, [openCamera, closeCamera]);
        const captureImage = useCallback(() => {
            if (!videoRef.current) return;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            setPreview(canvas.toDataURL('image/png'));
        }, []);
        const saveImage = () => {
            props.onImageChange(preview);
            closeCamera().then(() => {
            });
        };
        return (
            <Grid container spacing={2}>
                <Grid size={12}>
                    {preview ? (
                        <img src={preview} alt="Captured" className="w-full"/>
                    ) : (
                        <video ref={videoRef} className="w-full" autoPlay playsInline/>
                    )}
                </Grid>
                <Grid>
                    {!preview ? (
                        <NeumorphicButton onClick={captureImage} color="primary">Chụp</NeumorphicButton>
                    ) : (
                        <>
                            <NeumorphicButton onClick={retakeImage} color="warning">Chụp lại</NeumorphicButton>
                            <NeumorphicButton onClick={saveImage} color="primary">Lưu</NeumorphicButton>
                        </>
                    )}
                </Grid>
            </Grid>
        );
    },
);
export default memo(UploadOrTakeImage);
