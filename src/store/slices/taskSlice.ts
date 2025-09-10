import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UUIDTypes } from "uuid";

export interface taskEditsLog {
        dateEdited: Date;
        taskText: string;
        taskCompleted: boolean;
        taskDeleted: Date | null;
        uuid: UUIDTypes;
    }

export interface taskObject {
    dateCreated: Date
    uuid: UUIDTypes;
    taskText: string;
    taskCompleted: boolean;
    taskDeleted: Date | null;
    taskEditsLog: taskEditsLog[];
}

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
        setTaskDeleted: (state, action: PayloadAction<{uuid: UUIDTypes; taskDeleted: Date | null}>) => {
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
        setTaskEditsLog: (state, action: PayloadAction<{uuid: UUIDTypes; taskEditsLog: {dateEdited: Date; taskText: string; taskCompleted: boolean; taskDeleted: Date | null, uuid: UUIDTypes}}>) => {
            const findTask = state.find(t => t.uuid === action.payload.uuid);
            if (findTask) {
                findTask.taskEditsLog.push(action.payload.taskEditsLog)
            }
        },
        deleteTask: (state, action: PayloadAction<{uuid: UUIDTypes}>) => {
            const updated = [...state]
            const taskIndex = state.findIndex(t => t.uuid === action.payload.uuid);
            //findindex returnere -1 hvis intet er fundet
            if (taskIndex !== -1) {
                updated.splice(taskIndex, 1)
            }
            return updated
        },

    },
})


export const { setTextInput, setTaskDeleted, setTaskCompleted, setTaskText, setTaskEditsLog, deleteTask } = inputSlice.actions;
export default inputSlice.reducer;