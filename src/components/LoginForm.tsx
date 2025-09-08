import { Stack, Field, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Login from "../API/Login";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

interface FormValues {
  username: string;
  password: string | null;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();


  const onSubmit = async (data: FormValues) => {
    const login = new Login(data.username, dispatch)
    login.submit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username} required>
          <Field.Label>Brugernavn</Field.Label>
          <Input {...register("username")} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Log in</Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
