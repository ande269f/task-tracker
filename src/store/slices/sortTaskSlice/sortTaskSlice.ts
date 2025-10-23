import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface sortTaskState {
    sortDirection: boolean;
    sortingState: string;
}
const initialState: sortTaskState = {
    sortDirection: true,
    sortingState: "interactiveOrdering"
};
const sortTaskSlice = createSlice({
    name: "sortingState",
    initialState,
    reducers: {
        setSortDirection: (state, action: PayloadAction<{ sortDirection: boolean; }>) => {
            state.sortDirection = action.payload.sortDirection;
        },
        setSortingState: (state, action: PayloadAction<{ sortingState: string | null; }>) => {
            if (action.payload.sortingState != null) {
                state.sortingState = action.payload.sortingState;
            } else {
                console.log("sortingState er Null");
            }
        },
        setSortStateToDefault: () => initialState
    }
});

export const { setSortDirection, setSortingState, setSortStateToDefault } = sortTaskSlice.actions;
export default sortTaskSlice.reducer;
