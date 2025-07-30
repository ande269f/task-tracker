import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UUIDTypes } from "uuid";

export interface inputState {
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
        setTaskCompleted: (state, action: PayloadAction<{uuid: UUIDTypes; taskCompleted: boolean}>) => {
            const findTask = state.find(t => t.uuid === action.payload.uuid);
                if (findTask) {
                    findTask.taskCompleted = action.payload.taskCompleted
                }
        },
    },
})


export const { setTextInput, setTaskDeleted, setTaskCompleted } = inputSlice.actions;
export default inputSlice.reducer;