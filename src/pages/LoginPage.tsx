import UsernameForm from "../components/Forms/UsernameForm";
import PasswordForm from "../components/Forms/PasswordForm";
import { Box, Text, Button, ButtonProps } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { usePasswordFormVisibility } from "../hooks/passwordFormVisibility";
import { useLoginActions } from "../hooks/loginActions";
import "./LoginPage.scss";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export interface FormValues {
  username: string;
  password: string;
}

const loginButtonStyling: ButtonProps = {
  variant: "subtle",
  colorPalette: "green",
};

const LoginPage = () => {
  const methods = useForm<FormValues>();
  const showPasswordForm = usePasswordFormVisibility();
  const loginState = useSelector((state: RootState) => state.UserState.loginState);
  const { onSubmit } = useLoginActions();


  

  return (
    <div className="LoginBackground">
      <div className="LoginPage">
        <Box className="loginBox" bg="gray.200" rounded="2xl">
          <Text className="loginTitle" textStyle="1xl">
            Denne side er nede på nuværende tidspunkt. Mange tak for din interresse! 
          </Text>
          <br></br>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <UsernameForm />
              {showPasswordForm && <PasswordForm />}
              <Button
                loading={loginState === "PENDING"}
                type="submit"
                className="LoginButton"
                {...loginButtonStyling}
              >
                Log ind
              </Button>
            </form>
          </FormProvider>
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
