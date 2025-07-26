import { configureStore } from "@reduxjs/toolkit";
import textInputReducer from "./slices/textInputSlice"

const store = configureStore({
    reducer: {
        form: textInputReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;