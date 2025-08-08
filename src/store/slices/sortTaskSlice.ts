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
        }
    }
})

export const { setSortTaskState } = sortTaskSlice.actions
export default sortTaskSlice.reducer