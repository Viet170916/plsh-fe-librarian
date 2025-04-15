import {BookData, Payload} from "@/helpers/appType";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {Path, set} from "react-hook-form";
import {createSelector} from "reselect";
import {RootState} from "@/stores/store";
// type

export type Chapter = {
    chapter: number;
    paragraphs: Paragraph[];
}
export type Paragraph = {
    text: string;
    p: number;
    audio?: Audio
}
export type Audio = {
    audioBase64: string;
    alignment: Alignment[];
}
export type Alignment = { word: string; start: number; end: number }
export type AudioBookState = {
    chapters: Chapter[];
    currentAudioBook?: BookData
    currentChapter: number,
}
type AudioBookStateSlice = Slice<AudioBookState, {
    setPropToAudioBookState: <K extends Path<AudioBookState>>(state: WritableDraft<AudioBookState>, action: PayloadAction<Payload<AudioBookState, K>>) => void,
    setPropToChapter: <K extends Path<Chapter>>(state: WritableDraft<AudioBookState>, action: PayloadAction<Payload<Chapter, K> & {
        chapter: number
    }>) => void,
    addChapter: (state: WritableDraft<AudioBookState>, action: PayloadAction<Chapter>) => void,
},
    "audioBookState", "audioBookState", SliceSelectors<AudioBookState>>
//data
export const initAudioBookState: AudioBookState = {
        currentAudioBook: undefined,
        chapters: [],
        currentChapter: 1,
    }
;
//slice
const audioBookStateSlice: AudioBookStateSlice = createSlice({
    name: "audioBookState",
    initialState: initAudioBookState,
    reducers: {
        setPropToAudioBookState(state, {payload: {key, value}}) {
            set(state, key, value);
        },
        addChapter(state, {payload}) {
            if (!state.chapters.find(c => c.chapter === payload.chapter)) {
                state.chapters.push(payload);
            }
        },
        setPropToChapter(state, {payload: {key, value, chapter}}) {
            const chapterInstance = state.chapters.find(c => c.chapter === chapter);
            if (chapterInstance) {
                set(chapterInstance, key, value);
            }
        }
    },
});
//export
export const selectCurrentChapter = createSelector(
    (state: RootState) => (state.audioBookState.chapters ?? []),
    (state: RootState) => (state.audioBookState.currentChapter),
    (chapters: Chapter[], chapter: number) => chapters?.find(ch => ch.chapter === chapter)
);
export const {
    setPropToAudioBookState,
    addChapter,
    setPropToChapter,
} = audioBookStateSlice.actions;
const audioBookStateReducer = audioBookStateSlice.reducer;
export default audioBookStateReducer;
//...............

