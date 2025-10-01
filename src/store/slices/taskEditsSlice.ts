import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import TaskDataHandler from "../../API/TaskDataHandler";

export interface TaskEdits {
  dateEdited: Date;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
  taskEditsUuid: UUIDTypes;
  taskUuid: UUIDTypes;
}

const initialState: TaskEdits[] = [];



export const pushTaskEdit = createAsyncThunk<
  { taskEdit: TaskEdits }, // Return type
  TaskEdits, // Argument type
  { rejectValue: string } // error handling
>("taskEdits/pushTaskEdit", async (taskEdit, { rejectWithValue }) => {
  try {
    const taskEditResponse = await TaskDataHandler.unloadtaskEdit(taskEdit);
    if (taskEditResponse === "SUCCESS") {
      return { taskEdit };
    } else {
      return rejectWithValue("Failed to push task edit");
    }
  } catch (e) {
    console.error("pushTaskEdit fejler: " + e);
    return rejectWithValue("Failed to push task edit");
  }
});


const taskEditsSlice = createSlice({
  name: "taskEdits",
  initialState,
  reducers: {
    setTaskEdits: (state, action: PayloadAction<TaskEdits[]>) => {
      // overskriv hele edits-listen
      return action.payload;
    },
    addTaskEdits: (state, action: PayloadAction<TaskEdits>) => {
      state.push(action.payload);
    },
    clearTaskEdits: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pushTaskEdit.fulfilled, (state, action) => {
      state.push(action.payload.taskEdit);
    });
  }
});

export const { setTaskEdits, addTaskEdits, clearTaskEdits } = taskEditsSlice.actions;
export default taskEditsSlice.reducer;
