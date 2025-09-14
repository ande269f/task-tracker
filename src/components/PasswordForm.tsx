import { Stack, Field, Input, Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Login from "../API/Login";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "./ui/toaster";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";

interface FormValues {
  password: string;
}

const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserState);

  const onSubmit = async (data: FormValues) => {
    const login = new Login(user.username, dispatch)
    const response = await login.setUserPassword(user.username, data.password);

    if (response?.data == "SUCCESS") {
        toaster.create({
        description: "nyt kodeord sat",
        type: "success",
        })

        dispatch(setDetailsDialogState({taskObject: null, dialogboxOpened: false, dialogboxType: null}))
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.password} required>
          <Input {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Gem</Button>
      </Flex>
    </form>
  );
};

export default PasswordForm;
