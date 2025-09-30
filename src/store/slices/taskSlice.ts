import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import TaskDataHandler, { UserTaskDataDto } from "../../API/TaskDataHandler";
import { interactiveTaskOrder } from "./interactiveTaskOrderSlice";

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

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  refreshed: true,
};

export const loadUserData = createAsyncThunk<
  { tasks: taskObject[]; sortTasks: interactiveTaskOrder[] }, // return type
  void, // payload type (ingen payload her)
  { rejectValue: string }
>("tasks/loadUserData", async (_) => {
  try {
    const userData = (await TaskDataHandler.loadUserData()) as UserTaskDataDto;

    // Konverter date strings til Date objekter
    const tasks: taskObject[] = userData.tasks.map((task) => ({
      ...task,
      taskCreated: new Date(task.taskCreated),
      taskDeleted: task.taskDeleted ? new Date(task.taskDeleted) : null,
    }));

    return { tasks, sortTasks: userData.sortTasks };
  } catch (err) {
    console.error("loadUserData fejlede:", err);
    return { tasks: [], sortTasks: [] };
  }
});

const inputSlice = createSlice({
  name: "textInput",
  initialState,
  reducers: {
    setTextInput: (state, action: PayloadAction<taskObject>) => {
      state.tasks.push(action.payload);
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
      });
  },
});

export const {
  setTextInput,
  setTaskDeleted,
  setTaskCompleted,
  setTaskText,
  deleteTasks,
  deleteTask,
  setTasks,
} = inputSlice.actions;
export default inputSlice.reducer;
