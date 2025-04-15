import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, PathValue, set} from "react-hook-form";
import {MessageDto} from "@/helpers/appType";
import {createSelector} from "reselect";
import {RootState} from "@/stores/store";
import {generateRandomNumber} from "@/helpers/generate";
// type
export type ChatRoom = {
    id: number;
    chats: MessageDto[];
    message: string;
}
export type Chat = {
    id: number,
}
export type ChatState = {
    currentGptChat: ChatRoom;
    chatRooms: ChatRoom[];
}
type ChatStateSlice = Slice<ChatState, {
    setPropToChatState: <K extends Path<ChatState>>(state: WritableDraft<ChatState>, action: PayloadAction<{
        key: K,
        value: PathValue<ChatState, K>
    }>) => void;
    setPropToChatRoom: <K extends Path<ChatRoom>>(state: WritableDraft<ChatState>, action: PayloadAction<{
        key: K,
        value: PathValue<ChatRoom, K>,
        roomId: number,
    }>) => void;
    addChatToRoom: (state: WritableDraft<ChatState>, action: PayloadAction<{
        value: MessageDto,
        roomId: number,
    }>) => void;
    addChatToCurrentRoom: (state: WritableDraft<ChatState>, action: PayloadAction<MessageDto>) => void;
    clearPropInChatState: <K extends Path<ChatState>>(state: WritableDraft<ChatState>, action: PayloadAction<K>) => void;
    clearData: (state: WritableDraft<ChatState>) => void;
},
    "chatState", "chatState", SliceSelectors<ChatState>>
//data
export const initChatState: ChatState = {
    currentGptChat: {id: generateRandomNumber(), message: "", chats: []},
    chatRooms: [],
};
//slice
const chatStateSlice: ChatStateSlice = createSlice({
        name: "chatState",
        initialState: initChatState,
        reducers: {
            setPropToChatState(state, {payload: {key, value}}) {
                set(state, key, value);
            },
            setPropToChatRoom(state, {payload: {key, value, roomId}}) {
                const room = state.chatRooms.find(r => r.id === roomId);
                if (room) {
                    set(room, key, value);
                }
            },
            addChatToRoom(state, {payload: {value, roomId}}) {
                const room = state.chatRooms.find(r => r.id === roomId);
                if (room) {
                    room.chats.push(value);
                }
            },
            addChatToCurrentRoom(state, {payload}) {
                if (payload) {
                    state.currentGptChat.chats.push(payload);
                }
            },
            clearPropInChatState(state, {payload: key}) {
                set(state, key, get(initChatState, key));
            },
            clearData(state) {
                state.currentGptChat = initChatState.currentGptChat;
                state.chatRooms = initChatState.chatRooms;
            },
        },
    })
;
//export
export const getChatRoom = createSelector((state: RootState) => state.chatState.chatRooms,
    (_, id?: number) => id,
    (rooms: ChatRoom[], id?: number) => rooms.find(r => r.id === id)
)
export const {
    setPropToChatState,
    clearPropInChatState,
    addChatToRoom,
    addChatToCurrentRoom,
    setPropToChatRoom,
    clearData,
} = chatStateSlice.actions;
const chatStateReducer = chatStateSlice.reducer;
export default chatStateReducer;
//...............

