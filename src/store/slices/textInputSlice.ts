import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface inputState {
    textInput: string;
}

const initialState: inputState = {
    textInput: "",
};

const inputSlice = createSlice({
    name: "textInput",
    initialState,
    reducers: {
        setTextInput: (state, action: PayloadAction<string>) => {
            state.textInput = action.payload;
        },
    },
})

export const { setTextInput } = inputSlice.actions;
export default inputSlice.reducer;