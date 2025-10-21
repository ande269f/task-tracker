import { EmptyState, VStack } from "@chakra-ui/react";
import "./style.scss";
import { ReactNode } from "react";

const EmptyDataState = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <EmptyState.Root
      colorPalette="white"
      //backgroundColor="gray.100"
      className="EmptyState"
      borderRadius="md"
      rounded="xl"
    >
      <EmptyState.Content>
        <EmptyState.Indicator>{icon}</EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Description>{text}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default EmptyDataState;
