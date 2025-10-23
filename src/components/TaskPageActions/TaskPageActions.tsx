import { SettingsButton } from "./SettingsButton";
import OrderButton from "./OrderButton";
import { Flex } from "@chakra-ui/react";
import "./style.scss";

export const TaskPageActions = () => {

  return (
    <Flex
      className="TaskPageActions"
      display={"inline-flex"}
      flexDirection={"row-reverse"}
    >
      <OrderButton />
      <SettingsButton />
    </Flex>
  );
};
