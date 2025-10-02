import { TaskEdits } from "./slices/taskEditsSlice/taskEditsSlice";
import UserState from './slices//loginSlice/loginSlice';
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import textInputReducer from "./slices/taskSlice/taskSlice"
import dialogOpener from "./slices/detailsDialogSlice/detailsDialogSlice"
import sortTasks from "./slices/taskOrderSlice/taskOrderSlice"
import sortState from "./slices/sortTaskSlice/sortTaskSlice";
import taskEdits from "./slices/taskEditsSlice/taskEditsSlice"
const store = configureStore({
    reducer: {
        form: textInputReducer,
        detailsOpener: dialogOpener,
        sortTasks: sortTasks,
        sortState: sortState,
        UserState: UserState,
        taskEdits: taskEdits
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, unknown, Action>;