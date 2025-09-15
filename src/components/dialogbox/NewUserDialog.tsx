import { Dialog, Button, Portal, CloseButton, Stack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice";
import { Prose } from "../ui/prose";
import { FaPlus } from "react-icons/fa6";
import Login from "../../API/Login";
import { toaster } from "../ui/toaster";
import PasswordForm from "../PasswordForm";
import { useState } from "react";


const DialogProse = () => {
    return (
    <Stack key={"DialogProse"}>
        <Prose size="md">
            <h1> Hej du</h1>

            <p>
                det virker ikke til at det brugernavn du har indtastet er i brug.
                Har du lyst til at oprette en ny bruger med dette brugernavn?
            </p>
        </Prose>
    </Stack>
    )
}

const PasswordProse = () => {
    return (
    <Stack key={"PasswordProse"}>
        <Prose size="md">
          <h1> Brug for ekstra sikkerhed? </h1>
            <p>
                hvis du vil, kan du også sætte et kodeord.
            </p>
        </Prose>
    </Stack>
    )
}

const CreateNewUserButtonmaker = ({handleCreateNewUser}: {handleCreateNewUser: Function}) => {
        return (
            <Button aria-label="create-new-user" onClick={(e) => {e.stopPropagation(); handleCreateNewUser();}}>
                <FaPlus /> Opret bruger
            </Button>
        )
}

const NewUserDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const user = useSelector((state: RootState) => state.UserState);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateNewUser = async () => {
    const login = new Login(user.username, dispatch);
    const response = await login.createNewUser();


    if (response?.data == "SUCCESS") {
      toaster.create({
        description: "Ny bruger oprettet",
        type: "success",
      })
      setShowPasswordForm(true);
    }

    

    
  }




  return (
    <Dialog.Root
      key={"sm"}
      size={"sm"}
      open={detailsDialog.dialogboxOpened}
      onOpenChange={() =>
        dispatch(
          setDetailsDialogState({
            taskObject: detailsDialog.taskObject,
            dialogboxOpened: false,
            dialogboxType: null,
          })
        )
      }
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
                {!showPasswordForm && <CreateNewUserButtonmaker handleCreateNewUser={handleCreateNewUser}/>}
                {showPasswordForm && <PasswordProse />}
                {showPasswordForm && <PasswordForm />}
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