import { Stack, Field, Input, Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Login from "../API/Login";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "./ui/toaster";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { setPassword, setUsername } from "../store/slices/loginSlice";

interface FormValues {
  password: string;
}


const PasswordForm = () => {
    const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    dispatch(setPassword({password: data.password}))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.password} required>
          <Input {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
      </Flex>
    </form>
  );
};

export default PasswordForm;
