import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTasksThunk, loadUserData } from "../taskSlice/thunks";
import {
  setTextInput,
  deleteTasks,
  taskObject,
  deleteTask,
} from "../taskSlice/taskSlice";

import { UUIDTypes } from "uuid";
import { setSortDirection } from "../sortTaskSlice/sortTaskSlice";

export interface interactiveTaskOrder {
  sortOrder: number;
  uuid: UUIDTypes;
}
const initialState: interactiveTaskOrder[] = [];
const sortTasks = createSlice({
  name: "sortTasks",
  initialState,
  reducers: {
    // setTaskOrder: (state, action: PayloadAction<interactiveTaskOrder[]>) => {
    //     // tøm state arrayet
    //   state.splice(0, state.length, ...action.payload);

    //   // Sortér arrayet in-place efter sortOrder
    //   state.sort((a, b) => a.sortOrder - b.sortOrder);

    //   // Sørg for at sortOrder matcher index + 1
    //   state.forEach((item, index) => {
    //     item.sortOrder = index + 1;
    //   });
    // },
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
        if (action.payload.sortDirection) {
          return [...state].sort((a, b) => a.sortOrder - b.sortOrder);
        } else return [...state].sort((a, b) => b.sortOrder - a.sortOrder);
      })
      .addCase(setTextInput, (state, action) => {
        // når der bliver sat et nyt element, sæt det ind 
        // i taskOrder med sortOrder: state.length + 1
        const newElement: interactiveTaskOrder = {
          uuid: action.payload.taskUuid,
          sortOrder: state.length + 1,
        };
        const firstElement = state[0].sortOrder;
        const lastElement = state[state.length - 1].sortOrder;
        
        //sørg for at nyt element altid placeres efter element 
        //med sortOrder: state.length + 1
        firstElement > lastElement
          ? state.unshift(newElement)
          : state.push(newElement);
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
      }) // til sync med taskSlice
      .addCase(loadUserData.fulfilled, (state, action) => {
        // organisere sortTasks, da det ikke er organiseret fra backend
        //samme type sort hver gang -> hack da sortdirection resetter ved hver rerender af browser
        return action.payload.sortTasks.sort(
          (a, b) => b.sortOrder - a.sortOrder
        );
      });
  },
});
export const { setSortOrderToDefault, updateSortOrder } = sortTasks.actions;
export default sortTasks.reducer;
