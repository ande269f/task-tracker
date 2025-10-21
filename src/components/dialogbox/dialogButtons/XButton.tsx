import { Dialog, CloseButton } from "@chakra-ui/react";
import "./dialogButtonsStyle.scss";

export const XButton = () => {
  return (
    <Dialog.CloseTrigger asChild>
      <CloseButton size="xl" />
    </Dialog.CloseTrigger>
  );
};
