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

    // 1. Dispatch updateSortOrder
    dispatch(updateSortOrder({ from, to, sortDirection }));

    // 2. Get updated sortTasks from state
    const updatedSortTask = getState().sortTasks as interactiveTaskOrder[];

    // 3. Call API
    const response = await TaskDataHandler.updateTaskOrder(updatedSortTask);

    // 4. Handle response
    if (response !== "SUCCESS") {
      console.warn("rækkefølge er ikke opdateret");
    }
  }
);
