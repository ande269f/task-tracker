import { createAsyncThunk } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import { TaskEdits } from "../taskEditsSlice/taskEditsSlice";
import TaskDataHandler from "../../../API/TaskDataHandler";

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

export const fetchTaskEdits = createAsyncThunk<
  { taskEdits: TaskEdits[] }, // Return type
  // Return type
  UUIDTypes | undefined | null, // Argument type
  { rejectValue: string } // error handling
>("taskEdits/fetchTaskEdits", async (taskUuid, { rejectWithValue }) => {
  if (!taskUuid || taskUuid.length < 1 || taskUuid.length == undefined) {
    return rejectWithValue("No task UUID provided");
  }
  try {
    const taskEdits = await TaskDataHandler.loadtaskEdits(taskUuid);
    return { taskEdits };
  } catch (e) {
    console.error("fetchTaskEdits fejler: " + e);
    return rejectWithValue("Failed to fetch task edits");
  }
});
