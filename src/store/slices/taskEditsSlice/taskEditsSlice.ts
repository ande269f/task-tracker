import { createSlice } from "@reduxjs/toolkit";
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
  },
  //taskEdits kører alene med thunks, der returnere en hel array eller et enkelt objekt
  extraReducers: (builder) => {
    builder.addCase(pushTaskEdit.fulfilled, (state, action) => {
      state.push(action.payload.taskEdit);
    });

    builder.addCase(fetchTaskEdits.fulfilled, (state, action) => {
      const hej = state; hej //bruges ikke
      return action.payload.taskEdits;
    });
  },
});

export const { setTaskEditsToDefault } = taskEditsSlice.actions;
export default taskEditsSlice.reducer;

