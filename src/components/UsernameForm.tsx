import { Stack, Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const UsernameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ username: string }>();

  return (
    <Stack gap="4" align="flex-start" maxW="sm">
      <Field.Root invalid={!!errors.username} required>
        <Input {...register("username")} placeholder="Username" />
        <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
};

export default UsernameForm;
