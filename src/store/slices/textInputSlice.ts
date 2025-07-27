import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UUIDTypes } from "uuid";

interface inputState {
    date: Date
    uuid: UUIDTypes;
    taskText: string;
    taskCompleted: boolean;
    taskDeleted: boolean;
}

const initialState: inputState[] = [];

const inputSlice = createSlice({
    name: "textInput",
    initialState,
    reducers: {
        setTextInput: (state, action: PayloadAction<inputState>) => {
            state.push(action.payload);
        },
        setTaskDeleted: (state, action: PayloadAction<{uuid: UUIDTypes; taskDeleted: boolean}>) => {
            const findTask = state.find(t => t.uuid === action.payload.uuid);
                if (findTask) {
                    findTask.taskDeleted = action.payload.taskDeleted
                }
        },
    },
})


export const { setTextInput, setTaskDeleted } = inputSlice.actions;
export default inputSlice.reducer;