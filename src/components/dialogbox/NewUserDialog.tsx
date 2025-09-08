import { Dialog, Button, Portal, CloseButton, Stack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice";
import { Prose } from "../ui/prose";
import { FaPlus } from "react-icons/fa6";
import Login from "../../API/Login";


const DialogProse = () => {
    return (
    <Stack key={"loginText"}>
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

const CreateNewUserButtonmaker = ({handleCreateNewUser}: {handleCreateNewUser: Function}) => {
        return (
            <Button aria-label="Search database" onClick={(e) => {e.stopPropagation(); handleCreateNewUser();}}>
                <FaPlus /> Opret bruger
            </Button>
        )
}

const NewUserDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const user = useSelector((state: RootState) => state.UserState);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateNewUser = () => {
    const login = new Login(user.username, dispatch);
    login.createNewUser();
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
                <DialogProse />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <CreateNewUserButtonmaker handleCreateNewUser={handleCreateNewUser}/>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NewUserDialog;