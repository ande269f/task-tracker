import { createAsyncThunk } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";

import { RootState } from "../..";
import TaskDataHandler, { UserTaskDataDto } from "../../../API/TaskDataHandler";
import { taskDto } from "./taskSlice";
import { interactiveTaskOrder } from "../taskOrderSlice/taskOrderSlice";
import { taskObject, setTextInput } from "./taskSlice";
import { createToasterOnErrorResponse } from "../../../utils/thunkErrorUtils";
import { toaster } from "../../../components/ui/toaster";
import { detectDuplicates } from "../../../utils/arrayUtils";

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
  taskObject, // Argument type
  { rejectValue: string } // error handling
>("tasks/updateTask/thunk", async (task, { rejectWithValue }) => {
  try {
    const taskDeleted =
      task.taskDeleted === null ? null : task.taskDeleted?.toDateString();

    const taskDto: taskDto = {
      taskUuid: task.taskUuid,
      taskText: task.taskText,
      taskCompleted: task.taskCompleted,
      taskCreated: task.taskCreated.toString(),
      taskDeleted: taskDeleted,
    };

    const response = await TaskDataHandler.updateTask(taskDto);

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
    console.error("updateTask fejler: " + e);
    return rejectWithValue("Update failed");
  }
});

export const loadUserData = createAsyncThunk<
  { tasks: taskObject[]; sortTasks: interactiveTaskOrder[] }, // return type
  void, // payload type (ingen payload her)
  { rejectValue: string }
>("tasks/loadUserData/thunk", async (_) => {
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

    return { tasks, sortTasks: userData.sortTasks };
  } catch (err) {
    console.error("loadUserData fejlede:", err);
    return { tasks: [], sortTasks: [] };
  }
});

export const pushTask = createAsyncThunk<
  void, // Return type 
  { task: taskDto; userId: number | null }, // Argument type
  { rejectValue: string } // Error handling
>("tasks/pushTask", async ({ task, userId }, { rejectWithValue, dispatch, getState }) => {
  
  const existingTasks = (getState() as RootState).form.tasks;
  const newTaskText = task.taskText;

  if (newTaskText.trim() === "") {
    return;
  }

  const duplicateDetected = detectDuplicates(existingTasks.map(task => task.taskText), newTaskText);

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
    dispatch(setTextInput(taskObject));
  } else {
    return rejectWithValue("Failed to push task");
  }
});
