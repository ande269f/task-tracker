import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import { pushTaskEdit, fetchTaskEdits } from "./thunks";
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
    setTaskEditsToDefault: () => initialState,
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

    builder.addCase(fetchTaskEdits.fulfilled, (state, action) => {
      return action.payload.taskEdits;
    });
  },
});

export const { setTaskEdits, setTaskEditsToDefault, addTaskEdits, clearTaskEdits } = taskEditsSlice.actions;
export default taskEditsSlice.reducer;

