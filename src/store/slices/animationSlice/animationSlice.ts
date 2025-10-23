import { createSlice } from "@reduxjs/toolkit";

interface AnimationState {
    animation: "none" | "confetti";
}

const initialState: AnimationState = {
    animation: "none",
};


const animationSlice = createSlice({
  name: "animationSlice",
  initialState,
  reducers: {
      setAnimation: (state, action) => {
          state.animation = action.payload;
      },
  },
});

export const { setAnimation } = animationSlice.actions;
export default animationSlice.reducer;