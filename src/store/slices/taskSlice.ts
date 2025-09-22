import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";


export interface taskObject {
  taskCreated: Date;
  taskUuid: UUIDTypes;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
}

type TaskState = {
  tasks: taskObject[];
  loading: boolean;
  error: string | null;
};


const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};



const inputSlice = createSlice({
  name: "textInput",
  initialState,
  reducers: {
    setTextInput: (state, action: PayloadAction<taskObject>) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action: PayloadAction<taskObject[]>) => {
      state.tasks =  action.payload;
    },
    setTaskText: (
      state,
      action: PayloadAction<{ uuid: UUIDTypes; taskText: string }>
    ) => {
      const findTask = state.tasks.find((t) => t.taskUuid === action.payload.uuid);
      if (findTask) {
        findTask.taskText = action.payload.taskText;
      }
    },
    setTaskDeleted: (
      state,
      action: PayloadAction<{ uuid: UUIDTypes; taskDeleted: Date | null }>
    ) => {
      const findTask = state.tasks.find((t) => t.taskUuid === action.payload.uuid);
      if (findTask) {
        findTask.taskDeleted = action.payload.taskDeleted;
      }
    },
    setTaskCompleted: (
      state,
      action: PayloadAction<{ taskUuid: UUIDTypes; taskCompleted: boolean }>
    ) => {
      const findTask = state.tasks.find(
        (t) => t.taskUuid === action.payload.taskUuid
      );
      if (findTask) {
        findTask.taskCompleted = action.payload.taskCompleted;
      }
    },

    deleteTask: (state, action: PayloadAction<{ uuid: UUIDTypes }>) => {
      state.tasks = state.tasks.filter((t) => t.taskUuid !== action.payload.uuid);
    },
  },
});

export const {
  setTextInput,
  setTaskDeleted,
  setTaskCompleted,
  setTaskText,
  deleteTask,
  setTasks
} = inputSlice.actions;
export default inputSlice.reducer;
