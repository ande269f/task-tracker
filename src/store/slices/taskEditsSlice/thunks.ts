import { createAsyncThunk } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import { TaskEdits } from "../taskEditsSlice/taskEditsSlice";
import TaskDataHandler from "../../../API/TaskDataHandler";
import { toaster } from "../../../components/ui/toaster";
import { createToasterOnErrorResponse } from "../../../utils/thunkErrorUtils";

export const pushTaskEdit = createAsyncThunk<
  { taskEdit: TaskEdits }, // Return type
  TaskEdits, // Argument type
  { rejectValue: string } // error handling
>("taskEdits/pushTaskEdit/thunk", async (taskEdit, { rejectWithValue }) => {
  try {
    const taskEditResponse = await TaskDataHandler.unloadtaskEdit(taskEdit);

    createToasterOnErrorResponse(
      taskEditResponse,
      "Fejl ved oprettelse af todo-ændringshistorik"
    );
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
>(
  "taskEdits/fetchTaskEdits/thunk",
  async (taskUuid, { rejectWithValue, dispatch }) => {
    if (!taskUuid || taskUuid.length < 1 || taskUuid.length == undefined) {
      return rejectWithValue("No task UUID provided");
    }
    try {
      const rawTaskEdits = await TaskDataHandler.loadtaskEdits(taskUuid);
      
      createToasterOnErrorResponse(
        rawTaskEdits,
        "Fejl ved indlæsning af historik"
      );

      // omforme date fra string til date objekter
      const taskEdits: TaskEdits[] = rawTaskEdits.map((edit: any) => ({
        ...edit,
        dateEdited: new Date(edit.dateEdited),
        taskDeleted: edit.taskDeleted ? new Date(edit.taskDeleted) : null,
      }));

      return { taskEdits };
    } catch (e) {
      console.error("fetchTaskEdits fejler: " + e);
      return rejectWithValue("Failed to fetch task edits");
    }
  }
);
