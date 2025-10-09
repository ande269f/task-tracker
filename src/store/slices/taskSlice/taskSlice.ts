import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import { loadUserData, deleteTaskThunk, deleteTasksThunk } from "./thunks";
import { setSortDirection } from "../sortTaskSlice/sortTaskSlice";

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
  refreshed: boolean;
};
export interface taskDto {
  taskUuid: UUIDTypes;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: string | null;
  taskCreated: string;
}
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  refreshed: true,
};
const inputSlice = createSlice({
  name: "textInput",
  initialState,
  reducers: {
    setTextInput: (state, action: PayloadAction<taskObject>) => {
      state.tasks.push(action.payload);
      console.log(state.tasks);
    },
    setTasks: (state, action: PayloadAction<taskObject[]>) => {
      state.tasks = action.payload;
    },
    setTaskText: (
      state,
      action: PayloadAction<{ uuid: UUIDTypes; taskText: string }>
    ) => {
      const findTask = state.tasks.find(
        (t) => t.taskUuid === action.payload.uuid
      );
      if (findTask) {
        findTask.taskText = action.payload.taskText;
      }
    },
    setTasksToDefault: () => initialState,
    //setTaskDeleted opdatere state -> det fanger taskChangesLogger og
    // opdatere backend som så opdatere frontend
    setTaskDeleted: (
      state,
      action: PayloadAction<{ uuid: UUIDTypes; taskDeleted: Date | null }>
    ) => {
      const findTask = state.tasks.find(
        (t) => t.taskUuid === action.payload.uuid
      );
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
      state.tasks = state.tasks.filter(
        (t) => t.taskUuid !== action.payload.uuid
      );
    },

    deleteTasks: (state, action: PayloadAction<taskObject[]>) => {
      state.tasks = state.tasks.filter((t) => t.taskDeleted === null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.refreshed = false;
        // Hvis du har en separat state til sortTasks, sæt den her
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        // Brug din eksisterende reducer til at fjerne tasken
        // Dette skyldes at taskOrder er sat op på reduceren
        inputSlice.caseReducers.deleteTask(state, {
          type: "tasks/deleteTask",
          payload: { uuid: action.payload.uuid },
        });
      })
      .addCase(deleteTasksThunk.fulfilled, (state, action) => {
        // Brug din eksisterende reducer til at fjerne tasken
        // Dette skyldes at taskOrder er sat op på reduceren
        inputSlice.caseReducers.deleteTasks(state, {
          type: "tasks/deleteTasks",
          payload: action.payload.taskObjects,
        });
      });
  },
});

export const {
  setTasksToDefault,
  setTextInput,
  setTaskDeleted,
  setTaskCompleted,
  setTaskText,
  deleteTasks,
  deleteTask,
  setTasks,
} = inputSlice.actions;
export default inputSlice.reducer;
