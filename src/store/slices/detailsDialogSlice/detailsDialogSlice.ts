import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskObject } from "../taskSlice/taskSlice";
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
    setDetailsDialogStateToDefault: () => initialState,

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

export const { setDetailsDialogStateToDefault, setDetailsDialogState, setDialogBoxTypeClosed } = detailsDialogSlice.actions;
export default detailsDialogSlice.reducer;
