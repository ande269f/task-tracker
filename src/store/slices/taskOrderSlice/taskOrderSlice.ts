import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUserData } from "../taskSlice/thunks";
import { setTextInput, deleteTasks, taskObject, deleteTask } from "../taskSlice/taskSlice";

import { UUIDTypes } from "uuid";

export interface interactiveTaskOrder {
  sortOrder: number;
  uuid: UUIDTypes;
}
const initialState: interactiveTaskOrder[] = [];
const sortTasks = createSlice({
  name: "sortTasks",
  initialState,
  reducers: {
    setTaskOrder: (state, action: PayloadAction<interactiveTaskOrder[]>) => {
        // Erstat hele state arrayet med det nye array
      state.splice(0, state.length, ...action.payload);

      // Sortér arrayet in-place efter sortOrder
      state.sort((a, b) => a.sortOrder - b.sortOrder);

      // Sørg for at sortOrder matcher index + 1
      state.forEach((item, index) => {
        item.sortOrder = index + 1;
      });
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
      const updated = state.map((item) => ({ ...item }));

      if (action.payload.sortDirection) {
        // hvis det er normal rækkefølge (sortDirection = true = asc)
        const [moved] = updated.splice(action.payload.from, 1);
        updated.splice(action.payload.to, 0, moved);

        //opdater sortOrder til ny værdi
        var sortOrderValue = updated.length;
        updated.forEach((update) => {
          update.sortOrder = sortOrderValue;
          sortOrderValue = sortOrderValue - 1;
        });
      } else {
        //hvis det ikke er normal rækkefølge, reverse og lav skift
        updated.reverse();
        const [moved] = updated.splice(action.payload.from, 1);
        updated.splice(action.payload.to, 0, moved);

        //opdater sortOrder til ny værdi
        var sortOrderValue = updated.length;
        updated.forEach((update) => {
          update.sortOrder = sortOrderValue;
          sortOrderValue = sortOrderValue - 1;
        });
        updated.reverse();
      }

      return updated;
    },
  },
  //extrareducers til at reagere på ændring i taskobject listen (tilføjelse - sletning af tasks)
  // reagere i ui selvom backenden ikke følger med - men skulle være sikker på at orders.length == tasks.len dat task api kaldet laver order
  extraReducers: (builder) => {
    builder
      .addCase(setTextInput, (state, action) => {
        const newElement: interactiveTaskOrder = {
          uuid: action.payload.taskUuid,
          sortOrder: state.length,
        };
        state.push(newElement);
      })
      .addCase(deleteTasks, (state, action) => {
        // laver et nyt array kun med payloadens tasks uuid'er
        const uuidsToDelete = action.payload.map(
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
      }) // til sync med taskSlice
      .addCase(loadUserData.fulfilled, (state, action) => {
        return action.payload.sortTasks;
      });
  },
});
export const { setTaskOrder, setSortOrderToDefault, updateSortOrder } = sortTasks.actions;
export default sortTasks.reducer;
