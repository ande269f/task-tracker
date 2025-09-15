import { Stack, Field, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Login from "../API/Login";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setLoginState, setUsername } from "../store/slices/loginSlice";

interface FormValues {
  username: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();


  const onSubmit = (data: FormValues) => {
    dispatch(setUsername({username: data.username}))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username} required>
          <Input {...register("username")} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </form>
  );
};

export default LoginForm;
