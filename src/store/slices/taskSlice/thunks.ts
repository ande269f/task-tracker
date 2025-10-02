import { createAsyncThunk } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";


import store, { RootState } from "../..";
import TaskDataHandler, { UserTaskDataDto, taskDto } from "../../../API/TaskDataHandler";
import { interactiveTaskOrder } from "../taskOrderSlice/taskOrderSlice";
import { taskObject, setTextInput } from "./taskSlice";


export const deleteTaskThunk = createAsyncThunk<
  { uuid: UUIDTypes; }, // Return type
  taskObject, // Argument type
  { rejectValue: string; } // error handling
>("tasks/deleteTaskThunk", async (task, { rejectWithValue }) => {
  const response = await TaskDataHandler.deleteTasks([task]);
  if (response === "SUCCESS") {
    return { uuid: task.taskUuid };
  } else {
    return rejectWithValue("Delete failed");
  }
});


export const deleteTasksThunk = createAsyncThunk<
  { taskObjects: taskObject[]; }, // Return type
  void, // Argument type
  { rejectValue: string; } // error handling
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
  { task: taskObject; }, // Return type
  taskObject, // Argument type
  { rejectValue: string; } // error handling
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
  { tasks: taskObject[]; sortTasks: interactiveTaskOrder[]; }, // return type
  void, // payload type (ingen payload her)
  { rejectValue: string; }
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

export const pushTask = createAsyncThunk<
  { task: taskObject; }, // Return type (skal matche dit task-objekt)
  { task: taskDto; userId: number | null; }, // Argument type
  { rejectValue: string; } // Error handling
>(
  "tasks/pushTask",
  async ({ task, userId }, { rejectWithValue, dispatch }) => {
    const response = await TaskDataHandler.unloadTasks(task, userId);

    if (response === "SUCCESS") {
      dispatch(setTextInput(task));
      return { task };
    } else {
      return rejectWithValue("Failed to push task");
    }
  }
);

