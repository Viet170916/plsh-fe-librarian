"use client"
import React, {memo, useEffect, useMemo} from "react";
import {Box, Paper, Stack, TextField, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {MessageDto} from "@/helpers/appType";
import {Controller, useForm} from "react-hook-form";
import {generateUniqueId} from "@/app/(private)/(in-dash-board)/resources/library-room/utils";
import {generateRandomNumber} from "@/helpers/generate";
import {useSelector} from "@/hooks/useSelector";
import ChatAnimation from "@/components/Animation/lotties/Chat";
import AppButton from "@/components/primary/Input/AppButton";
import {color} from "@/helpers/resources";

type ChatBoxProps = {
    messages: MessageDto[],
    onSubmit: (value: MessageDto) => void,
    isLoading?: boolean,
    error?: unknown,
}

function ChatBox({messages, onSubmit, isLoading = false, error}: ChatBoxProps) {
    const myId = useSelector(state => state.global.me.id);
    const {control, reset, handleSubmit, setValue} = useForm<MessageDto>({
        defaultValues: {
            id: generateUniqueId(new Set(messages.map(m => m.id ?? generateRandomNumber()))),
            content: "",
            senderId: myId,
        }
    })
    useEffect(() => {
        if (myId) {
            reset({
                id: generateUniqueId(new Set(messages.map(m => m.id ?? generateRandomNumber()))),
                content: "",
                senderId: myId,
            })
        }
    }, [myId, reset, messages]);
    const submit = (value: MessageDto) => {
        onSubmit(value)
        if (!error) {
            reset({
                id: generateUniqueId(new Set(messages.map(m => m.id ?? generateRandomNumber()))),
                content: "",
                senderId: myId,
            })
        }
        setValue("id", generateRandomNumber());
    }
    const messageBoxes = useMemo(() => {
        if (myId && messages) {
            return messages.map((msg) => (
                <Message
                    key={msg.id}
                    msg={msg} myId={myId}/>
            ));
        }
        return []

    }, [messages, myId]);
    return (
        <Stack
            direction={"row"}
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
            spacing={2}
            useFlexGap
        >
            <Stack
                sx={{
                    width: "100%",
                    position: "relative",
                    flexGrow: 1,
                    p: 2,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                {messageBoxes}
                {isLoading && <ChatAnimation/>}
            </Stack>
            <Box sx={{display: "flex", gap: 1, width: "100%"}}>
                <form onSubmit={handleSubmit(submit)} style={{width: "100%"}}>
                    <Box sx={{display: "flex", gap: 1, width: "100%"}}>
                        <Controller
                            render={({field}) => (
                                <TextField
                                    size={"small"}
                                    // multiline
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Nhập tin nhắn..."
                                    {...field}
                                />)}
                            control={control}
                            name={"content"}
                        />
                        <AppButton type={"submit"} variant="outlined" size={"small"}>
                            Gửi
                        </AppButton>
                    </Box>
                </form>

            </Box>
        </Stack>
    );
}

const Message = memo(({msg, myId}: { msg: MessageDto, myId: number }) => (
    <motion.div
        initial={{
            x: msg.senderId === myId ? 200 : -200,
            opacity: 0,
        }}
        animate={{x: 0, opacity: 1}}
        transition={{type: "spring", stiffness: 300, damping: 20}}
        style={{
            display: "flex",
            justifyContent:
                msg.senderId === myId ? "flex-end" : "flex-start",
        }}
    >
        <Paper
            sx={{
                px: 2,
                py: 1,
                backgroundColor:
                    msg.senderId === myId ? "#1976d2" : "#e0e0e0",
                color: msg.senderId === myId ? "#fff" : "#000",
                borderRadius: 2,
                maxWidth: "70%",
            }}
        >
            <Typography variant="body1">{msg.content}</Typography>
        </Paper>
    </motion.div>
))
export default memo(ChatBox);

