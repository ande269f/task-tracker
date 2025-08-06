import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskObject } from "../objects/taskObject";

const initialState: taskObject[] = [];

const sortTasks = createSlice({
    name: "sortTasks",
    initialState,
    reducers: {
        updateOrder: (state, action: PayloadAction<{from: number; to: number}>) => {
            //flyt elementet
          const updated = [...state]
          const [moved] = updated.splice(action.payload.from, 1)
          updated.splice(action.payload.to, 0, moved)  
            // opdater manuelSortOrder
          var newManuelSortOrderValue = 1
          updated.forEach(task => {
            task.manuelSortOrder = newManuelSortOrderValue
            newManuelSortOrderValue++
          });
          return updated
        }
    }
})
export const {updateOrder} = sortTasks.actions
export default sortTasks.reducer