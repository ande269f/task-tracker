import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import sortTaskState from "../states/sortTaskState";

const initialState: sortTaskState = {
    sortDirection: false,
    sortingState: "interactiveOrdering"
}

const sortTaskSlice = createSlice({
    name: "sortingState",
    initialState,
    reducers: {
        setSortTaskState: (state, action: PayloadAction<{sortDirection: boolean; sortingState: string}>) => {
            state.sortDirection = action.payload.sortDirection
            state.sortingState = action.payload.sortingState
        },
        setSortingState: (state, action: PayloadAction<{sortingState: string |null}>) => {
            if (action.payload.sortingState != null) {
                state.sortingState = action.payload.sortingState
            } else {
                console.log("sortingState er Null")
            }
        }
    }
})

export const { setSortTaskState, setSortingState } = sortTaskSlice.actions
export default sortTaskSlice.reducer