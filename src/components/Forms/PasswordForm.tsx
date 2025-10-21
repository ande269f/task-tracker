import { Flex, Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const PasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ password: string }>();

  return (
    <Flex gap="4" align="flex-start" className="PasswordForm">
      <Field.Root required>
        <Input
          type="password"
          textIndent="0.5rem"
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