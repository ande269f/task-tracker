import { useDispatch, useSelector } from "react-redux";
import UsernameForm from "../components/UsernameForm";
import PasswordForm from "../components/PasswordForm";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  login,
  setLoginState,
  setUsername,
  setUsernamePassword,
} from "../store/slices/loginSlice";
import { toaster } from "../components/ui/toaster";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { loadUserData } from "../store/slices/taskSlice";

export interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const methods = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const loginState = useSelector((state: RootState) => state.UserState);
  const dialogState = useSelector((state: RootState) => state.detailsOpener);

  useEffect(() => {
    // skal gøre intet så længe dialog boxen en åben
    if (!dialogState.dialogboxOpened) {
      if (loginState.loginState === "PASSWORD_NEEDED") {
        setShowPasswordForm(true);
      }
      if (loginState.loginState === "USER_NOT_FOUND") {
        dispatch(
          setDetailsDialogState({
            taskObject: null,
            dialogboxType: "newUserDialog",
            dialogboxOpened: true,
          })
        );
      }
      if (loginState.loginState == "LOGIN_FAILED") {
        queueMicrotask(() => {
          toaster.create({
            description: "Forkert adgangskode",
            type: "error",
          });
        });
      }
      if (loginState.loginState == "SUCCESS") {
        navigate("/tasks");
      }
    }
  }, [loginState.loginState, dialogState.dialogboxOpened]);

  const onSubmit = async (data: FormValues) => {
    dispatch(setUsername({ username: data.username })); // <-- det er til når der skal laves en ny bruger
    dispatch(login({ username: data.username, password: data.password }));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <UsernameForm />
        {showPasswordForm && <PasswordForm />}
        <Button type="submit">Log ind</Button>
      </form>
    </FormProvider>
  );
};

export default LoginPage;
