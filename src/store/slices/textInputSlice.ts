import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UUIDTypes } from "uuid";

interface inputState {
    date: Date
    uuid: UUIDTypes;
    taskText: string;
    taskState: boolean;
}

const initialState: inputState[] = [];

const inputSlice = createSlice({
    name: "textInput",
    initialState,
    reducers: {
        setTextInput: (state, action: PayloadAction<inputState>) => {
            state.push(action.payload);
        },
    },
})

export const { setTextInput } = inputSlice.actions;
export default inputSlice.reducer;