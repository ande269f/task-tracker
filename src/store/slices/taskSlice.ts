import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import TaskDataHandler, { UserTaskDataDto } from "../../API/TaskDataHandler";
import { interactiveTaskOrder } from "./interactiveTaskOrderSlice";
import store, { RootState } from "..";

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

export const deleteTaskThunk = createAsyncThunk<
  { uuid: UUIDTypes }, // Return type
  taskObject, // Argument type
  { rejectValue: string } // error handling
>("tasks/deleteTaskThunk", async (task, { rejectWithValue }) => {
  const response = await TaskDataHandler.deleteTasks([task]);
  if (response === "SUCCESS") {
    return { uuid: task.taskUuid };
  } else {
    return rejectWithValue("Delete failed");
  }
});


export const deleteTasksThunk = createAsyncThunk<
  { taskObjects: taskObject[] }, // Return type
  void, // Argument type
  { rejectValue: string } // error handling
>("tasks/deleteTasksThunk", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const deletedTasks = state.form.tasks.filter(
      (task) => task.taskDeleted != null
    );
    const response = await TaskDataHandler.deleteTasks(deletedTasks);
    if (response === "SUCCESS") {
      return { taskObjects: deletedTasks };
    } else {
      return rejectWithValue("Delete failed");
    }
  } catch (e) {
    console.error("deleteTasksThunk fejler: " + e);
    return { taskObjects: [] };
  }
});

export const updateTask = createAsyncThunk<
  { task: taskObject }, // Return type
  taskObject, // Argument type
  { rejectValue: string } // error handling
>("tasks/updateTask", async (task, { rejectWithValue }) => {
  try {
    const response = await TaskDataHandler.updateTask(task);
    if (response === "SUCCESS") {
      return { task };
    } else {
      return rejectWithValue("Update failed");
    }
  } catch (e) {
    console.error("updateTask fejler: " + e);
    return rejectWithValue("Update failed");
  }
});

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
  setTextInput,
  setTaskDeleted,
  setTaskCompleted,
  setTaskText,
  deleteTasks,
  deleteTask,
  setTasks,
} = inputSlice.actions;
export default inputSlice.reducer;

