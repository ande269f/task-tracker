import { useDispatch, useSelector } from "react-redux";
import Login from "../API/Login";
import UsernameForm from "../components/UsernameForm";
import PasswordForm from "../components/PasswordForm";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import loginResultDispatcher from "../utils/loginResultStateDispatcher";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { setLoginState, setUsernamePassword } from "../store/slices/loginSlice";

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
      if (loginState.loginState == "SUCCESS") {
      navigate("/tasks");
      }
      if (loginState.loginState == "LOGIN_FAILED") {
      setShowPasswordForm(true);
      }
      if (loginState.loginState == "USER_NOT_FOUND") {
        dispatch(
              setDetailsDialogState({
                taskObject: null,
                dialogboxType: "newUserDialog",
                dialogboxOpened: true,
              })
            );
      }
    }
  }, [dialogState.dialogboxOpened, loginState.loginState, navigate]);


  const onSubmit = async (data: FormValues) => {
    dispatch(setUsernamePassword({username: data.username, password: data.password}))
    dispatch(setLoginState({loginState: "USERNAME_PASSWORD_SET"}))
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
