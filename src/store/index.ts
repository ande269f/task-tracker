import UserState from "./slices//loginSlice/loginSlice";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import textInputReducer from "./slices/taskSlice/taskSlice";
import dialogOpener from "./slices/detailsDialogSlice/detailsDialogSlice";
import sortTasks from "./slices/taskOrderSlice/taskOrderSlice";
import sortState from "./slices/sortTaskSlice/sortTaskSlice";
import taskEdits from "./slices/taskEditsSlice/taskEditsSlice";
import { checkLoginExpiration } from "./middleware/checkLoginExpiration";
import animationState from "./slices/animationSlice/animationSlice";

const rootReducer = combineReducers({
  form: textInputReducer,
  detailsOpener: dialogOpener,
  sortTasks: sortTasks,
  sortState: sortState,
  UserState: UserState,
  taskEdits: taskEdits,
  animationState: animationState,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // tjekker jwt er expired ved hvert thunk dispatch
    }).concat(checkLoginExpiration),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>
export type Thunk = ThunkAction<void, RootState, unknown, Action>;
