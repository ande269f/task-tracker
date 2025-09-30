import { Dialog, Button, Portal, CloseButton, Stack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setDialogBoxTypeClosed,
} from "../../store/slices/detailsDialogSlice";
import { Prose } from "../ui/prose";
import { FaPlus } from "react-icons/fa6";
import Login from "../../API/Login";
import { toaster } from "../ui/toaster";
import PasswordForm from "../PasswordForm";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createNewUser, setLoginState, setPassword, setUsername, setUsernamePassword } from "../../store/slices/loginSlice";

interface FormValue {
  password: string;
}

const DialogProse = () => {
  return (
    <Stack key={"DialogProse"}>
      <Prose size="md">
        <h1> Hej du</h1>

        <p>
          det virker ikke til at det brugernavn du har indtastet er i brug. Har
          du lyst til at oprette en ny bruger med dette brugernavn?
        </p>
      </Prose>
    </Stack>
  );
};

const PasswordProse = () => {
  return (
    <Stack key={"PasswordProse"}>
      <Prose size="md">
        <h1> Brug for ekstra sikkerhed? </h1>
        <p>hvis du vil, kan du også sætte et kodeord.</p>
      </Prose>
    </Stack>
  );
};

const CreateNewUserButtonmaker = ({
  handleCreateNewUser,
}: {
  handleCreateNewUser: Function;
}) => {
  return (
    <Button
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
    if (user.username)
    dispatch(createNewUser({username: user.username}))
  };

  useEffect(() => {
    if (user.loginState == "SUCCESS") {
      setShowPasswordForm(true);
    }
  })

  const onSubmitPassword = async (data: FormValue) => {
    const login = new Login("")
    const response = await login.setUserPassword(user.username, data.password)

    console.assert(response == "SUCCESS",
      "fejl ved set af password"
    )


    dispatch(setDialogBoxTypeClosed());
  };

  return (
    <Dialog.Root
      key={"sm"}
      size={"sm"}
      open={detailsDialog.dialogboxOpened}
      onOpenChange={() => {
        dispatch(setDialogBoxTypeClosed());
        // user er logged in efter "opret ny bruger". 
        // hvis de ikke trykker på den knap det skal loginstate sættes tilbage til NOT_LOGGED_IN
        if (user.loginState == "USER_NOT_FOUND") {
          dispatch(setLoginState({ loginState: "NOT_LOGGED_IN" }));
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button style={{ display: "none" }}></Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title></Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {!showPasswordForm && <DialogProse />}
              {!showPasswordForm && (
                <CreateNewUserButtonmaker
                  handleCreateNewUser={handleCreateNewUser}
                />
              )}
              {showPasswordForm && (
                <FormProvider {...methods}>
                  <PasswordProse />
                  <form onSubmit={methods.handleSubmit(onSubmitPassword)}>
                    <PasswordForm />
                  </form>
                </FormProvider>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NewUserDialog;
