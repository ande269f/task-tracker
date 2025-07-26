import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface inputState {
    taskText: string;
    taskState: boolean;
}

const initialState: inputState = {
    taskText: "",
    taskState: false,
};

const inputSlice = createSlice({
    name: "textInput",
    initialState,
    reducers: {
        setTextInput: (state, action: PayloadAction<string>) => {
            state.taskText = action.payload;
        },
    },
})

export const { setTextInput } = inputSlice.actions;
export default inputSlice.reducer;