import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUIDTypes } from "uuid";
import {interactiveTaskOrder} from "../states/interactiveTaskOrderState";

const initialState: interactiveTaskOrder[] = [];


const sortTasks = createSlice({
    name: "sortTasks",
    initialState,
    reducers: {
        setSortOrder: (state, action: PayloadAction<{uuid: UUIDTypes}>) => {
            const newElement: interactiveTaskOrder = {
                uuid: action.payload.uuid,
                sortOrder: state.length
            }
            state.push(newElement)
        },
        updateSortOrder: (state, action: PayloadAction<{from: number; to: number; sortDirection: boolean}>) => {
            //flyt elementet
          var updated = [...state];

          if (action.payload.sortDirection) {
            // hvis det er normal rækkefølge (sortDirection = true = asc)
            console.log(state)
            const [moved] = updated.splice(action.payload.from, 1)
            console.log(moved)
            updated.splice(action.payload.to, 0, moved)  
          } else {
            //hvis det ikke er normal rækkefølge, reverse og lav skift
            updated.reverse()
            console.log(state)
            const [moved] = updated.splice(action.payload.from, 1)
            console.log(moved)
            updated.splice(action.payload.to, 0, moved)  
            updated.reverse()
          }


          return updated
        }
    }
})
export const {updateSortOrder, setSortOrder} = sortTasks.actions
export default sortTasks.reducer