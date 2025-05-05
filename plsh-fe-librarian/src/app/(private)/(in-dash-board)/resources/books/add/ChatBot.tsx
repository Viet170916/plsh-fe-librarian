"use client"
import React, {JSX, memo, useCallback, useEffect} from "react";
import ChatBox from "@/components/primary/ChatBox";
import {MessageDto} from "@/helpers/appType";
import {useSelector} from "@/hooks/useSelector";
import {useAppDispatch} from "@/hooks/useDispatch";
import {shallowEqual} from "react-redux";
import {useGetFieldGenerateMutation} from "@/stores/slices/api/book.api.slice";
import {addChatToCurrentRoom} from "@/stores/slices/chat-state/chat.slice";
import dayjs from "dayjs";
import {generateRandomNumber} from "@/helpers/generate";
import {AddEditBookData, setAddEditBookData} from "@/stores/slices/book-states/book.add-edit.slice";
import {mergeBookDataToAddEdit} from "@/helpers/dataTransfer";
import {useAppStore} from "@/stores/store";

function ChatBot(): JSX.Element {
    const dispatch = useAppDispatch();
    const store = useAppStore();
    const [getFields, {data, error, isLoading}] = useGetFieldGenerateMutation();
    const bookTitle = useSelector(state => state.addEditBookData.baseInfo.title, shallowEqual);
    const messages = useSelector(state => state.chatState.currentGptChat.chats, shallowEqual)
    const onSubmit = useCallback((value: MessageDto) => {
        if (value?.content && value.content !== "" && bookTitle) {
            dispatch(addChatToCurrentRoom(value));
            getFields({bookName: bookTitle, prompt: value.content});
        }
    }, [bookTitle, dispatch, getFields]);

    useEffect(() => {
        if (data) {
            dispatch(addChatToCurrentRoom({
                id: generateRandomNumber(),
                content: data.message,
                createdDate: dayjs().toISOString(),
            }));
            const old: AddEditBookData = store.getState().addEditBookData;
            const bookData = {};
            // data.data.forEach(({key, value}) => {
            //     set(bookData, key, value);
            // });
            if (data?.data) {
                const newAddEditedBook = mergeBookDataToAddEdit(data.data, old);
                dispatch(setAddEditBookData(newAddEditedBook));
            }

        }
    }, [dispatch, data, store]);


    return (
        <ChatBox messages={messages} error={error} onSubmit={onSubmit} isLoading={isLoading}/>
    );
}

export default memo(ChatBot);

