"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {FaPause, FaPlay} from "react-icons/fa6";
import {useAudioHighlighter} from "@/hooks/useTtsPlayer";
import {IoPlayBack, IoPlayForward} from "react-icons/io5";
import {MenuItem, Select, Slider} from "@mui/material";
import AppChip from "@/components/primary/display/AppChip";
import {BsFillVolumeMuteFill, BsVolumeDownFill} from "react-icons/bs";
import {Audio} from "@/stores/slices/book-states/audio.book.slice";

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

type PlayerProps = {
    audio: Audio,
    disabled?: boolean,
    chapter?: number
}

function Player({audio, disabled, chapter}: PlayerProps): JSX.Element {
    const {
        currentWordIndex,
        play,
        pause,
        stop,
        seek,
        changeVolume,
        volume, currentTime, duration, isMuted, toggleMute, isRead, changeSpeed,
    } = useAudioHighlighter({
        base64Audio: audio?.audioBase64,
        alignment: audio?.alignment,
        // onEnd: handleFinishRead,
    });

    return (
        <Grid container sx={{mx: 4, my: .5}} width={600}>
            <Grid size={8} container>
                <Slider
                    disabled={disabled}
                    value={currentTime}
                    min={0}
                    max={duration}
                    step={0.1}
                    onChange={(e, value) => seek(typeof value === 'number' ? value : value[0])}
                    sx={{color: "primary.main"}}
                />
                <Grid container spacing={1.2}>
                    <Grid size={3}>
                        <NeumorphicButton sx={{p: 1,}}
                                          disabled={disabled}
                                          onClick={() => seek(currentTime >= 5 ? currentTime - 5 : 0)}
                                          variant_2={"primary"}
                                          color={"primary"}><IoPlayBack/></NeumorphicButton>
                    </Grid>
                    <Grid size={3}>
                        <NeumorphicButton
                            disabled={disabled}
                            sx={{height: 30, width: 30, borderRadius: 15, p: 0}}
                            onClick={isRead ? pause : play}
                            variant_2={"primary"} color={"primary"}>{isRead ? <FaPause/> : <FaPlay/>}</NeumorphicButton>

                    </Grid>
                    <Grid size={3}>
                        <NeumorphicButton sx={{p: 1}}
                                          disabled={disabled}
                                          onClick={() => seek(currentTime + 5 >= duration ? duration : currentTime + 5)}
                                          variant_2={"primary"}
                                          color={"primary"}>
                            <IoPlayForward/>
                        </NeumorphicButton></Grid>
                    <Grid size={3}>
                        <AppChip variant={"outlined"} color={"success"}
                                 label={`${formatTime(currentTime)} / ${formatTime(duration)}`}/>
                    </Grid>
                </Grid>

            </Grid>
            <Grid size={4} container>
                <Slider
                    disabled={disabled}
                    value={volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(_, value) => changeVolume(typeof value === 'number' ? value : value[0])}
                    sx={{color: "primary"}}
                />
                <Grid container spacing={2}>
                    <NeumorphicButton
                        disabled={disabled}
                        onClick={() => toggleMute()}>
                        {isMuted ? <BsFillVolumeMuteFill size={20}/> : <BsVolumeDownFill size={20}/>}
                    </NeumorphicButton>
                    <Select
                        disabled={disabled}
                        labelId="speed-select-label"
                        sx={{p: 0}}
                        size={"small"}
                        defaultValue={1}
                        onChange={(e,) => {
                            changeSpeed(Number.parseInt(`${e.target.value}`))
                        }}
                        label="Playback Speed"
                    >
                        <MenuItem value={0.5}>0.5x</MenuItem>
                        <MenuItem value={1}>1x</MenuItem>
                        <MenuItem value={1.5}>1.5x</MenuItem>
                        <MenuItem value={2}>2x</MenuItem>
                    </Select>
                </Grid>

            </Grid>

        </Grid>
    );
}

export default memo(Player);

