import { TaskEdits } from './slices/taskEditsSlice';
import UserState from './slices/loginSlice';
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import textInputReducer from "./slices/taskSlice"
import dialogOpener from "./slices/detailsDialogSlice"
import sortTasks from "./slices/interactiveTaskOrderSlice"
import sortState from "./slices/sortTaskSlice";
import taskEdits from "./slices/taskEditsSlice"
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