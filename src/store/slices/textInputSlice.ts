import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UUIDTypes } from "uuid";
import { taskObject } from "../states/taskObjectState";



const initialState: taskObject[] = [];

const inputSlice = createSlice({
    name: "textInput",
    initialState,
    reducers: {
        setTextInput: (state, action: PayloadAction<taskObject>) => {
            state.push(action.payload);
        },
        setTaskText: (state, action: PayloadAction<{uuid: UUIDTypes; taskText: string}>) => {
            const findTask = state.find(t => t.uuid === action.payload.uuid);
                if (findTask) {
                    findTask.taskText = action.payload.taskText
                }
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
        setTaskEditsLog: (state, action: PayloadAction<{uuid: UUIDTypes; taskEditsLog: {dateEdited: Date; taskText: string; taskCompleted: boolean; taskDeleted: boolean, uuid: UUIDTypes}}>) => {
            const findTask = state.find(t => t.uuid === action.payload.uuid);
            if (findTask) {
                findTask.taskEditsLog.push(action.payload.taskEditsLog)
            }
        },

    },
})


export const { setTextInput, setTaskDeleted, setTaskCompleted, setTaskText, setTaskEditsLog } = inputSlice.actions;
export default inputSlice.reducer;