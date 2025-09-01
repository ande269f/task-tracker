import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DetailsDialogState from "../states/detailsDialogState";

const initialState: DetailsDialogState = {
    taskObject: null,
    dialogboxOpened: false,
    dialogboxType: null
}

const detailsDialogSlice = createSlice({
    name: "detailsDialog",
    initialState,
    reducers: {
        setDetailsDialogState: (state, action: PayloadAction<DetailsDialogState>) => {
            state.taskObject = action.payload.taskObject;
            state.dialogboxOpened = action.payload.dialogboxOpened;
            state.dialogboxType = action.payload.dialogboxType;
        }
    }
})

export const { setDetailsDialogState } = detailsDialogSlice.actions;
export default detailsDialogSlice.reducer