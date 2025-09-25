import { useDispatch, useSelector } from "react-redux";
import UsernameForm from "../components/UsernameForm";
import PasswordForm from "../components/PasswordForm";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { setLoginState, setUsernamePassword } from "../store/slices/loginSlice";
import { toaster } from "../components/ui/toaster";

export interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const methods = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);
  const loginState = useSelector((state: RootState) => state.UserState);
  const dialogState = useSelector((state: RootState) => state.detailsOpener);

  useEffect(() => {
    // skal gøre intet så længe dialog boxen en åben
    if (!dialogState.dialogboxOpened) {
      if (loginState.loginState === "PASSWORD_NEEDED") {
        setShowPasswordForm(true);
      }
    }
  }, [loginState.loginState]);


  const onSubmit = async (data: FormValues) => {
    dispatch(
      setUsernamePassword({ username: data.username, password: data.password })
    );
    dispatch(setLoginState({ loginState: "USERNAME_PASSWORD_SET" }));
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
