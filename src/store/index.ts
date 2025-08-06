import { configureStore } from "@reduxjs/toolkit";
import textInputReducer from "./slices/textInputSlice"
import dialogOpener from "./slices/detailsDialogSlice"
import sortTasks from "./slices/sortTasksSlice"
const store = configureStore({
    reducer: {
        form: textInputReducer,
        detailsOpener: dialogOpener,
        sortTasks: sortTasks
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;