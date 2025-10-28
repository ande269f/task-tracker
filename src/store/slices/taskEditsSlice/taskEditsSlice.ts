import { createSlice } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import { pushTaskEdit, fetchTaskEdits } from "./thunks";
export interface TaskEdit {
  dateEdited: Date;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
  taskEditsUuid: UUIDTypes;
  taskUuid: UUIDTypes;
}

type TaskEdits = {
  taskEdits: TaskEdit[];
  loading: boolean;
  error: string | null;
  refreshed: boolean;
};

const initialState: TaskEdits = {
  taskEdits: [],
  loading: false,
  error: null,
  refreshed: true,
};
const taskEditsSlice = createSlice({
  name: "taskEdits",
  initialState,
  reducers: {
    setTaskEditsToDefault: () => initialState,
  },
  //taskEdits kører alene med thunks, der returnere en hel array eller et enkelt objekt
  extraReducers: (builder) => {
    builder.addCase(pushTaskEdit.fulfilled, (state, action) => {
      state.taskEdits.push(action.payload.taskEdit);
    });

    builder.addCase(fetchTaskEdits.fulfilled, (state, action) => {
      const hej = state; hej //bruges ikke
      
      state.taskEdits = action.payload.taskEdits;
      state.loading = false;
    });
    builder.addCase(fetchTaskEdits.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setTaskEditsToDefault } = taskEditsSlice.actions;
export default taskEditsSlice.reducer;

