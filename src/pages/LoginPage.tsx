import UsernameForm from "../components/Forms/UsernameForm";
import PasswordForm from "../components/Forms/PasswordForm";
import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { usePasswordFormVisibility } from "../hooks/passwordFormVisibility";
import { useLoginActions } from "../hooks/loginActions";
import "./LoginPage.scss";

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
  const { onSubmit } = useLoginActions();


  

  return (
    <div className="LoginBackground">
      <div className="LoginPage">
        <Box className="loginBox" bg="gray.200" rounded="2xl">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <UsernameForm />
              {showPasswordForm && <PasswordForm />}
              <Button
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
