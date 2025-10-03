import { Middleware } from "@reduxjs/toolkit";
import { setUserLoggedOut } from "../slices/loginSlice/loginSlice";

// safequarding type af action ->
// hvis action er alt andet end string, returnere false
function isActionWithType(action: unknown): action is { type: string } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as any).type === "string"
  );
}

export const checkLoginExpiration: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      isActionWithType(action) &&
      (action.type.endsWith("/thunk/fulfilled") ||
        action.type.endsWith("/thunk/pending") ||
        action.type.endsWith("/thunk/rejected") ||
        action.type.endsWith("/thunk"))
    ) {
      const expirationDate = store.getState().UserState.exp

      if (expirationDate != null) {
        const dateToday = Math.floor(Date.now() / 1000) as number;
        if (dateToday > expirationDate) {
          localStorage.removeItem("jwt");
          store.dispatch(setUserLoggedOut());
          console.log("jwt er udløbet, bruger er logget ud");
        } 
      }

      return result;
    }
  };
