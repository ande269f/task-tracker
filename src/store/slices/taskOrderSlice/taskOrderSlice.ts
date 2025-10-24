import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTasksThunk } from "../taskSlice/thunks";
import {

  taskObject,
  deleteTask,
} from "../taskSlice/taskSlice";

import { UUIDTypes } from "uuid";
import { setSortDirection } from "../sortTaskSlice/sortTaskSlice";
import { determineInteractiveOrderDirection } from "./functions";


export interface interactiveTaskOrder {
  sortOrder: number;
  uuid: UUIDTypes;
}
const initialState: interactiveTaskOrder[] = [];
const sortTasks = createSlice({
  name: "sortTasks",
  initialState,
  reducers: {
    setSortOrder: (state, action: PayloadAction<interactiveTaskOrder[]>) => {
      const hej = state; hej //bruges ikke
      return action.payload;
    },
    addSortOrder: (
      state,
      action: PayloadAction<{ newTaskUuid: UUIDTypes; sortDirection: boolean }>
    ) => {
      const newElement: interactiveTaskOrder = {
        uuid: action.payload.newTaskUuid,
        sortOrder: state.length + 1,
      };
      if (!state[0]) {
        //hvis arrayet er tomt
        state.push(newElement);
        return;
      } 
      // afhængig af sortDirection, tilføj element i starten af arrayet eller i slutningen
      action.payload.sortDirection
        ? state.unshift(newElement)
        : state.push(newElement);
    },
    setSortOrderToDefault: () => initialState,
    updateSortOrder: (
      state,
      action: PayloadAction<{
        from: number;
        to: number;
        sortDirection: boolean;
      }>
    ) => {
      // klon elementerne ([...state] mutere kun et array klon, da den ikke laver en deep klon)
      //sørg for at rækkefølgen er korrekt, så den afspejler ui
      const updated = state.map((item) => ({ ...item }));

      //foretag flytning af element
      const [moved] = updated.splice(action.payload.from, 1);
      updated.splice(action.payload.to, 0, moved);

      //opdater sortOrder til ny værdi i alle elementer
      var sortOrderValue = updated.length;
      updated.forEach((update) => {
        update.sortOrder = sortOrderValue;
        sortOrderValue = sortOrderValue - 1;
      });

      state.length = 0;
      state.push(...updated);
    },
  },
  //extrareducers til at reagere på ændring i taskobject listen (tilføjelse - sletning af tasks)
  // reagere i ui selvom backenden ikke følger med - men skulle være sikker på at orders.length == tasks.len dat task api kaldet laver order
  extraReducers: (builder) => {
    builder
      .addCase(setSortDirection, (state, action) => {
        //synker sortstate med sortDirection
        return determineInteractiveOrderDirection(
          action.payload.sortDirection,
          [...state]
        );
      })
      .addCase(deleteTasksThunk.fulfilled, (state, action) => {
        // laver et nyt array kun med payloadens tasks uuid'er
        const uuidsToDelete = action.payload.taskObjects.map(
          (task: taskObject) => task.taskUuid
        );
        //filtrere state så de uuid'er fra uuidsToDelete ikke er der
        return state.filter((t) => !uuidsToDelete.includes(t.uuid));
      })
      .addCase(deleteTask, (state, action) => {
        const updated = [...state];
        const taskIndex = state.findIndex(
          (t) => t.uuid === action.payload.uuid
        );
        //findindex returnere -1 hvis intet er fundet
        if (taskIndex !== -1) {
          updated.splice(taskIndex, 1);
        }
        return updated;
      }); // til sync med taskSlice
  },
});
export const { setSortOrderToDefault, updateSortOrder, setSortOrder, addSortOrder } =
  sortTasks.actions;
export default sortTasks.reducer;
