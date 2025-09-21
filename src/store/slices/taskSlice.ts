import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";

export interface taskEdits {
  dateEdited: Date;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
  taskEditsUuid: UUIDTypes;
  taskUuid: UUIDTypes;
}

export interface taskObject {
  taskCreated: Date;
  taskUuid: UUIDTypes;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
}

const initialState: taskObject[] = [];

const inputSlice = createSlice({
  name: "textInput",
  initialState,
  reducers: {
    setTextInput: (state, action: PayloadAction<taskObject>) => {
      state.push(action.payload);
    },
    setTaskText: (
      state,
      action: PayloadAction<{ uuid: UUIDTypes; taskText: string }>
    ) => {
      const findTask = state.find((t) => t.taskUuid === action.payload.uuid);
      if (findTask) {
        findTask.taskText = action.payload.taskText;
      }
    },
    setTaskDeleted: (
      state,
      action: PayloadAction<{ uuid: UUIDTypes; taskDeleted: Date | null }>
    ) => {
      const findTask = state.find((t) => t.taskUuid === action.payload.uuid);
      if (findTask) {
        findTask.taskDeleted = action.payload.taskDeleted;
      }
    },
    setTaskCompleted: (
      state,
      action: PayloadAction<{ taskUuid: UUIDTypes; taskCompleted: boolean }>
    ) => {
      const findTask = state.find(
        (t) => t.taskUuid === action.payload.taskUuid
      );
      if (findTask) {
        findTask.taskCompleted = action.payload.taskCompleted;
      }
    },
    setTaskEditsLog: (
      state,
      action: PayloadAction<{
        taskUuid: UUIDTypes;
        taskEditsLog: {
          dateEdited: Date;
          taskText: string;
          taskCompleted: boolean;
          taskDeleted: Date | null;
          taskEditsUuid: UUIDTypes;
          taskUuid: UUIDTypes;
        };
      }>
    ) => {
      const findTask = state.find(
        (t) => t.taskUuid === action.payload.taskUuid
      );
      if (findTask) {
        findTask.taskEditsLog.push(action.payload.taskEditsLog);
      }
    },
    deleteTask: (state, action: PayloadAction<{ uuid: UUIDTypes }>) => {
      const updated = [...state];
      const taskIndex = state.findIndex(
        (t) => t.taskUuid === action.payload.uuid
      );
      //findindex returnere -1 hvis intet er fundet
      if (taskIndex !== -1) {
        updated.splice(taskIndex, 1);
      }
      return updated;
    },
    emptyTaskEditsLog: () => {
      return initialState;
    },
  },
});

export const {
  emptyTaskEditsLog,
  setTextInput,
  setTaskDeleted,
  setTaskCompleted,
  setTaskText,
  setTaskEditsLog,
  deleteTask,
} = inputSlice.actions;
export default inputSlice.reducer;
