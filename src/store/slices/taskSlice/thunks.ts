import { createAsyncThunk } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";

import { RootState } from "../..";
import TaskDataHandler, { UserTaskDataDto } from "../../../API/TaskDataHandler";
import { taskDto } from "./taskSlice";
import { addSortOrder, setSortOrder } from "../taskOrderSlice/taskOrderSlice";
import { taskObject, setTextInput } from "./taskSlice";
import {
  createToasterOnErrorResponse,
  createToasterPending,
  updateToasterOnError,
  updateToasterOnSuccess,
} from "../../../utils/toasterUtils";
import { toaster } from "../../../components/ui/toaster";
import { detectDuplicates } from "../../../utils/arrayUtils";
import { determineInteractiveOrderDirection } from "../taskOrderSlice/functions";

export const deleteTaskThunk = createAsyncThunk<
  { uuid: UUIDTypes }, // Return type
  taskObject, // Argument type
  { rejectValue: string } // error handling
>("tasks/deleteTask/thunk", async (task, { rejectWithValue }) => {
  const response = await TaskDataHandler.deleteTasks([task]);

  createToasterOnErrorResponse(response, "Fejl ved sletning af to-do's");

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
>("tasks/deleteTasks/thunk", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const deletedTasks = state.form.tasks.filter(
      (task) => task.taskDeleted != null
    );
    const response = await TaskDataHandler.deleteTasks(deletedTasks);

    createToasterOnErrorResponse(response, "Fejl ved sletning af to-do's");

    if (response === "SUCCESS") {
      toaster.create({
        description: "Papirkurven er ryddet",
        type: "success",
      });

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
  { task: taskObject; updateType: "DELETE" | "UPDATE" | "COMPLETE" | "RESTORE" }, // Argument type
  { rejectValue: string } // error handling
>(
  "tasks/updateTask/thunk",
  async ({ task, updateType }, { rejectWithValue }) => {
    var toastId = "none";
    if (updateType === "UPDATE" || updateType === "RESTORE") {
      toastId = createToasterPending("Opdaterer to-do...");
    }

    try {
      const taskDto: taskDto = {
        taskUuid: task.taskUuid,
        taskText: task.taskText,
        taskCompleted: task.taskCompleted,
        taskCreated: task.taskCreated.toString(),
        taskDeleted: task.taskDeleted === null ? null : task.taskDeleted?.toString(),
      };

      const response = await TaskDataHandler.updateTask(taskDto);

      (updateType === "UPDATE" || updateType === "RESTORE") &&
        updateToasterOnError(
          response,
          toastId,
          "error",
          "Fejl ved opdatering af to-do"
        );
      (updateType === "UPDATE" || updateType === "RESTORE") &&
        updateToasterOnSuccess(response, toastId, "success", "To-do opdateret");

      createToasterOnErrorResponse(
        response,
        "Der er sket en fejl. Det betyder at din to'do er ikke opdateret"
      );

      if (response === "SUCCESS") {
        return { task };
      } else {
        return rejectWithValue("Update failed");
      }
    } catch (e) {
      createToasterOnErrorResponse(
        "ERROR",
        "Der er sket en fejl. Det betyder at din to'do er ikke opdateret"
      );

      console.error("updateTask fejler: " + e);
      return rejectWithValue("Update failed");
    }
  }
);

export const loadUserData = createAsyncThunk<
  { tasks: taskObject[] }, // return type
  void, // payload type (ingen payload her)
  { rejectValue: string }
>("tasks/loadUserData/thunk", async (_, { dispatch, getState }) => {
  try {
    const userData = (await TaskDataHandler.loadUserData()) as UserTaskDataDto;

    createToasterOnErrorResponse(
      userData,
      "Der er sket en fejl ved indlæsning af dine to-do's"
    );

    // Konverter date strings til Date objekter
    const tasks: taskObject[] = userData.tasks.map((task) => ({
      ...task,
      taskCreated: new Date(task.taskCreated),
      taskDeleted: task.taskDeleted ? new Date(task.taskDeleted) : null,
    }));

    const state = getState() as RootState;

    const sortedTasks = determineInteractiveOrderDirection(
      state.sortState.sortDirection,
      userData.sortTasks
    );

    dispatch(setSortOrder(sortedTasks));

    return { tasks };
  } catch (err) {
    console.error("loadUserData fejlede:", err);
    return { tasks: [], sortTasks: [] };
  }
});

export const pushTask = createAsyncThunk<
  void, // Return type
  { task: taskDto; userId: number | null }, // Argument type
  { rejectValue: string } // Error handling
>(
  "tasks/pushTask",
  async ({ task, userId }, { rejectWithValue, dispatch, getState }) => {
    const existingTasks = (getState() as RootState).form.tasks;
    const newTaskText = task.taskText;

    if (newTaskText.trim() === "") {
      return;
    }

    const duplicateDetected = detectDuplicates(
      existingTasks
        // så vi kun tjekker imod ikke-slettede tasks
        .filter((task) => task.taskDeleted === null)
        .map((task) => task.taskText),
      newTaskText
    );

    if (duplicateDetected) {
      toaster.create({
        description: "Den indtastede task findes allerede",
        type: "warning",
      });
      return;
    }

    const response = await TaskDataHandler.unloadTasks(task, userId);

    createToasterOnErrorResponse(
      response,
      "Der er sket en fejl ved oprettelse af din to-do"
    );

    if (response === "SUCCESS") {
      const taskObject: taskObject = {
        taskUuid: task.taskUuid,
        taskText: task.taskText,
        taskCompleted: task.taskCompleted,
        taskCreated: new Date(task.taskCreated),
        taskDeleted: null,
      };

      const sortDirection = (getState() as RootState).sortState.sortDirection;
      dispatch(setTextInput(taskObject));
      dispatch(
        addSortOrder({
          newTaskUuid: task.taskUuid,
          sortDirection: sortDirection,
        })
      );
    } else {
      return rejectWithValue("Failed to push task");
    }
  }
);
