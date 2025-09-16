import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskObject } from "../slices/taskSlice";

interface DetailsDialogState {
  taskObject: taskObject | null;
  dialogboxOpened: boolean;
  dialogboxType: string | null;
}

const initialState: DetailsDialogState = {
  taskObject: null,
  dialogboxOpened: false,
  dialogboxType: null,
};

const detailsDialogSlice = createSlice({
  name: "detailsDialog",
  initialState,
  reducers: {
    setDetailsDialogState: (
      state,
      action: PayloadAction<DetailsDialogState>
    ) => {
      state.taskObject = action.payload.taskObject;
      state.dialogboxOpened = action.payload.dialogboxOpened;
      state.dialogboxType = action.payload.dialogboxType;
    },
    setDialogBoxTypeClosed: () => {
        return initialState;
    }
  },
});

export const { setDetailsDialogState, setDialogBoxTypeClosed } =
  detailsDialogSlice.actions;
export default detailsDialogSlice.reducer;
