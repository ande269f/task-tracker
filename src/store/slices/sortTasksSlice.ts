import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import taskOrder from "../states/taskOrderState";

const initialState: taskOrder[] = [];


const sortTasks = createSlice({
    name: "sortTasks",
    initialState,
    reducers: {
        setSortOrder: (state, action: PayloadAction<{uuid: UUIDTypes}>) => {
            const newElement: taskOrder = {
                uuid: action.payload.uuid,
                sortOrder: state.length
            }
            state.push(newElement)
        },
        updateSortOrder: (state, action: PayloadAction<{from: number; to: number}>) => {
            //flyt elementet
          const updated = [...state]
          console.log(state)
          const [moved] = updated.splice(action.payload.to, 1)
          console.log(moved)
          updated.splice(action.payload.from, 0, moved)  
            // opdater manuelSortOrder
          var newManuelSortOrderValue = 0
          
          updated.map(task => {
            task.sortOrder = newManuelSortOrderValue
            newManuelSortOrderValue++
          });
        }
    }
})
export const {updateSortOrder, setSortOrder} = sortTasks.actions
export default sortTasks.reducer