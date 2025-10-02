
import UsernameForm from "../components/UsernameForm";
import PasswordForm from "../components/PasswordForm";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { usePasswordFormVisibility } from "../hooks/passwordFormVisibility";
import { useLoginActions } from "../hooks/loginActions";

export interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const methods = useForm<FormValues>();
  const showPasswordForm = usePasswordFormVisibility();
  const { onSubmit } = useLoginActions()

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
