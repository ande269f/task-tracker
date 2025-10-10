import {
  Dialog,
  Button,
  Portal,
  Stack,
  Flex,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDialogBoxTypeClosed } from "../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { Prose } from "../ui/prose";
import { FaPlus } from "react-icons/fa6";
import Login from "../../API/Login";
import { toaster } from "../ui/toaster";
import PasswordForm from "../PasswordForm";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  setLoginState,
  setPassword,
  setUsername,
  setUsernamePassword,
} from "../../store/slices/loginSlice/loginSlice";
import { setUserPassword } from "../../store/slices/loginSlice/thunks";
import { createNewUser } from "../../store/slices/loginSlice/thunks";
import { GoSmiley } from "react-icons/go";
import EmptyDataState from "../EmptyDataState/EmptyDataState";
import "./NewUserDialog.scss";
import { Text } from "@chakra-ui/react";
import { TbConfetti } from "react-icons/tb";
import { IoMdArrowRoundForward } from "react-icons/io";

interface FormValue {
  password: string;
}

const DialogProse = () => {
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

const PasswordProse = () => {
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
          <Text>hvis du vil, kan du også sætte et kodeord.</Text>
        </Box>
      </Prose>
    </Stack>
  );
};

const CreateNewUserButton = ({
  handleCreateNewUser,
}: {
  handleCreateNewUser: Function;
}) => {
  return (
    <Button
      className="CreateNewUserButton"
      colorPalette={"green"}
      aria-label="create-new-user"
      onClick={(e) => {
        e.stopPropagation();
        handleCreateNewUser();
      }}
    >
      <FaPlus /> Opret bruger
    </Button>
  );
};

const NewUserDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const user = useSelector((state: RootState) => state.UserState);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<{ password: string }>();

  const handleCreateNewUser = async () => {
    if (user.username) dispatch(createNewUser({ username: user.username }));
  };

  useEffect(() => {
    //hvis brugeren har lavet en ny bruger og er logget ind, så vis password formen
    if (user.loginState == "SUCCESS") {
      setShowPasswordForm(true);
    }
  });

  const onSubmitPassword = async (data: FormValue) => {
    // skal rettes så password ikke er i url
    dispatch(
      setUserPassword({ username: user.username, password: data.password })
    );
  };

  return (
    <Dialog.Root
      key={"sm"}
      size={"sm"}
      open={detailsDialog.dialogboxOpened}
      onOpenChange={() => {
        dispatch(setDialogBoxTypeClosed());
        dispatch(setLoginState({ loginState: "NOT_LOGGED_IN" }));
      }}
    >
      <Dialog.Trigger asChild>
        <Button style={{ display: "none" }}></Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="DialogHeader">
              <Dialog.Title></Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="NewUserDialogBody DialogBody">
              {!showPasswordForm && <DialogProse />}
              {!showPasswordForm && (
                <Flex className="ButtonArea">
                  <Dialog.ActionTrigger asChild>
                    <Button variant="subtle" className="CancelDialogButton">
                      Fortryd
                    </Button>
                  </Dialog.ActionTrigger>
                  <CreateNewUserButton
                    handleCreateNewUser={handleCreateNewUser}
                  />
                </Flex>
              )}
              {showPasswordForm && (
                <FormProvider {...methods}>
                  <PasswordProse />

                  <form onSubmit={methods.handleSubmit(onSubmitPassword)}>
                    <PasswordForm />
                  </form>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="subtle" className="GoToTaskPageButton">
                      Fortsæt uden <IoMdArrowRoundForward />
                    </Button>
                  </Dialog.ActionTrigger>
                </FormProvider>
              )}
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NewUserDialog;
