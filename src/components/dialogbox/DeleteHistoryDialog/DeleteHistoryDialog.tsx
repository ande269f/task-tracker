import {
  Dialog,
  Portal,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsTrash2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setDialogBoxTypeClosed } from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";

import EmptyDataState from "../../EmptyDataState/EmptyDataState";

import { DeleteAllTasksPermanentlyButton } from "./Buttons/DeleteAllTasksPermanentlyButton";
import { FooterButton } from "../dialogButtons/FooterButton";
import { XButton } from "../dialogButtons/XButton";
import { DeletedTasks } from "./DeletedTasks";



const DeleteHistoryDialog = () => {
  const [showPlaceholderBox, setShowPlaceholderBox] = useState<boolean>(false);
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const tasks = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // find alle tasks der er slettet
    const deletedTasks = tasks.tasks.filter((task) => task.taskDeleted != null);
    //hvis der ikke er nogen, vis PlaceholderBox
    setShowPlaceholderBox(deletedTasks.length == 0);
  }, [tasks.tasks]);



  return (
    <Dialog.Root
      key={"sm"}
      size={"sm"}
      open={detailsDialog.dialogboxOpened}
      onOpenChange={() =>
        dispatch(
          setDialogBoxTypeClosed()
        )
      }
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="DeleteHistoryDialogHeader DialogHeader">
              <Dialog.Title>To-do papirkurv</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="DeleteHistoryDialogBody DialogBody">
              <Box className="UpperCardArea">
                <DeleteAllTasksPermanentlyButton />
              </Box>
              <Box className="LowerCardArea">
                {showPlaceholderBox ? (
                  <EmptyDataState
                    icon={<BsTrash2 />}
                    text={"Papirkurven er tom"}
                  />
                ) : (
                  <DeletedTasks tasks={tasks.tasks} />
                )}
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
                <FooterButton />
            </Dialog.Footer>
            <XButton />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteHistoryDialog;
