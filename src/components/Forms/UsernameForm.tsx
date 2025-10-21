import { Stack, Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import "./formStyles.scss";

const UsernameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ username: string }>();

  return (
    <Stack gap="4">
      <Field.Root invalid={!!errors.username} required>
        <Input
          className="UsernameForm"
          {...register("username")}
          placeholder="Indtast et brugernavn for at fortsætte"
          colorPalette="black"
          variant="subtle"
        />
        <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
};

export default UsernameForm;
