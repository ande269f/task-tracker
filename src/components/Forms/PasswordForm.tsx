import { Flex, Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import "./formStyles.scss";
const PasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ password: string }>();

  return (
    <Flex gap="4">
      <Field.Root required>
        <Input
          className="PasswordForm"
          type="password"
          variant="subtle"
          {...register("password")}
          placeholder="Indtast her"
        />
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
      </Field.Root>
    </Flex>
  );
};

export default PasswordForm;
