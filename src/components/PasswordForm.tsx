import { Flex, Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const PasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ password: string }>();

  return (
    <Flex gap="4" align="flex-start" maxW="sm">
      <Field.Root required>
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
      </Field.Root>
    </Flex>
  );
};

export default PasswordForm;