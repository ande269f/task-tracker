import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const usePasswordFormVisibility = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const loginState = useSelector((state: RootState) => state.UserState);
  const dialogState = useSelector((state: RootState) => state.detailsOpener);

  useEffect(() => {
    if (!dialogState.dialogboxOpened && loginState.loginState === "PASSWORD_NEEDED") {
      setShowPasswordForm(true);
    }
  }, [loginState.loginState, dialogState.dialogboxOpened]);

  return showPasswordForm;
};
