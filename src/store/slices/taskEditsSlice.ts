import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";

export interface TaskEdits {
  dateEdited: Date;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
  taskEditsUuid: UUIDTypes;
  taskUuid: UUIDTypes;
}

const initialState: TaskEdits[] = [];

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
});

export const { setTaskEdits, addTaskEdits, clearTaskEdits } = taskEditsSlice.actions;
export default taskEditsSlice.reducer;
