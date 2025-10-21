import { Dialog, CloseButton } from "@chakra-ui/react";

export const XButton = () => {
  return (
    <Dialog.CloseTrigger asChild>
      <CloseButton size="xl" />
    </Dialog.CloseTrigger>
  );
};
