import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setTextInput, deleteTask } from "./taskSlice";

import { UUIDTypes } from "uuid";

interface interactiveTaskOrder {
    sortOrder: number
    uuid: UUIDTypes
}



const initialState: interactiveTaskOrder[] = [];

const sortTasks = createSlice({
  name: "sortTasks",
  initialState,
  reducers: {
    updateSortOrder: (
      state,
      action: PayloadAction<{
        from: number;
        to: number;
        sortDirection: boolean;
      }>
    ) => {
      //flyt elementet
      var updated = [...state];

      if (action.payload.sortDirection) {
        // hvis det er normal rækkefølge (sortDirection = true = asc)
        const [moved] = updated.splice(action.payload.from, 1);
        updated.splice(action.payload.to, 0, moved);
      } else {
        //hvis det ikke er normal rækkefølge, reverse og lav skift
        updated.reverse();
        const [moved] = updated.splice(action.payload.from, 1);
        updated.splice(action.payload.to, 0, moved);
        updated.reverse();
      }

      return updated;
    },
  },
  //extrareducers til at reagere på ændring i taskobject listen (tilføjelse - sletning af tasks)
  extraReducers: (builder) => {
    builder
    .addCase(setTextInput, (state, action) => {
      const newElement: interactiveTaskOrder = {
        uuid: action.payload.uuid,
        sortOrder: state.length,
      };
      state.push(newElement);
    })
    .addCase(deleteTask, (state, action) => {
      const updated = [...state]
      const taskIndex = state.findIndex(t => t.uuid === action.payload.uuid);
      //findindex returnere -1 hvis intet er fundet
      if (taskIndex !== -1) {
          updated.splice(taskIndex, 1)
      }
      return updated
    })
  },
});
export const { updateSortOrder } = sortTasks.actions;
export default sortTasks.reducer;
