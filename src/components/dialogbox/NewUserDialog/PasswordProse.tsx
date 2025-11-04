import { Stack, HStack, Icon, Box ,Text } from "@chakra-ui/react";
import { TbConfetti } from "react-icons/tb";
import { Prose } from "../../ui/prose";
import "./NewUserDialog.scss";
export const PasswordProse = () => {
  return (
    <Stack key={"PasswordProse"}>
      <Prose size="md">
        <HStack className="UpperText">
          <Text fontWeight="semibold" textStyle="3xl">
            Velkommen til
          </Text>
          {/* bug med icon løses med as={TbConfetti}  */}
          <Icon as={TbConfetti} size="2xl" color="orange.500">
            <TbConfetti />
          </Icon>
        </HStack>

        <Text>
          Du kan nu begynde at indsætte to-do's og gemme dine tanker på ét sted,
          hvor som helst og når som helst.
        </Text>
        <Box className="PasswordText">
          <Text fontWeight="semibold" textStyle="xl">
            Brug for ekstra sikkerhed?
          </Text>
          <Text>hvis du vil, kan du også sætte et kodeord. </Text>
          <Text>Tryk Enter for at gemme dit kodeord.</Text>
        </Box>
      </Prose>
    </Stack>
  );
};