import { Stack, Text } from "@chakra-ui/react";
import { GoSmiley } from "react-icons/go";
import EmptyDataState from "../../EmptyDataState/EmptyDataState";
import { Prose } from "../../ui/prose";
import "./NewUserDialog.scss";

export const DialogProse = () => {
  return (
    <Stack key={"DialogProse"}>
      <Prose size="md">
        <Text fontWeight="semibold" textStyle="2xl" className="UpperText">
          {" "}
          Hej med dig
        </Text>
        <EmptyDataState
          icon={<GoSmiley />}
          text={
            "det virker ikke til at det brugernavn du har indtastet er i brug. Har du lyst til at oprette en ny bruger med dette brugernavn?"
          }
        />
      </Prose>
    </Stack>
  );
};