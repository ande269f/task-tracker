import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../..";
import TaskDataHandler from "../../../API/TaskDataHandler";
import { interactiveTaskOrder, updateSortOrder } from "./taskOrderSlice";

export const pushSortOrder = createAsyncThunk<
  void,
  { from: number; to: number; sortDirection: boolean; },
  { state: RootState; }
>(
  "sortTasks/updateSortOrderThunk",
  async ({ from, to, sortDirection }, { dispatch, getState }) => {

    // Dispatch updateSortOrder
    dispatch(updateSortOrder({ from, to, sortDirection }));

    // Hent updated sortTasks fra state
    const updatedSortTask = getState().sortTasks as interactiveTaskOrder[];

    // Kald API
    const response = await TaskDataHandler.updateTaskOrder(updatedSortTask);

    if (response !== "SUCCESS") {
      console.warn("rækkefølge er ikke opdateret");
    }
  }
);
