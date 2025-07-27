import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface inputState {
    date: Date
    id: number;
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