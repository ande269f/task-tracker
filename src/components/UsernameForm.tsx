import { Stack, Field, Input, HTMLChakraProps, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";


const usernameFormStyling: InputProps = {
  colorPalette: "black",
  variant: "subtle",
  textIndent: "0.5rem"
};



const UsernameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ username: string }>();

  return (
    <Stack gap="4" align="flex-start" className="UsernameForm"  >
      <Field.Root invalid={!!errors.username} required  >
        <Input {...register("username")} placeholder="Intast dit brugernavn"  {...usernameFormStyling}  />
        <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
};

export default UsernameForm;
