import {
  Dialog,
  Button,
  Portal,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  setDialogBoxTypeClosed,
} from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { useEffect, useState } from "react";
import { fetchTaskEdits } from "../../../store/slices/taskEditsSlice/thunks";
import { TaskDetailsTable } from "./TaskDetailsTable";
import EmptyDataState from "../../EmptyDataState/EmptyDataState";
import { TbTimeDurationOff } from "react-icons/tb";
import TaskChanges from "./Taskchanges";
import { FooterButton } from "../dialogButtons/FooterButton";
import { XButton } from "../dialogButtons/XButton";

export const TaskDetailsDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const [showPlaceholderBox, setShowPlaceholderBox] = useState<boolean>(false);
  const taskEdits = useSelector((state: RootState) => state.taskEdits);
  const dispatch = useDispatch<AppDispatch>();

  // henter data
  useEffect(() => {
    if (detailsDialog.taskObject)
      dispatch(fetchTaskEdits(detailsDialog.taskObject.taskUuid));
  }, [detailsDialog.taskObject]);


  // viser placeholder hvis der ikke er data
  useEffect(() => {
    if (taskEdits.length === 0) {
      setShowPlaceholderBox(true);
    } else {
      setShowPlaceholderBox(false);
    }
  }, [taskEdits]);

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
      <Dialog.Trigger asChild>
        <Button style={{ display: "none" }}></Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="DialogHeader">
              <Dialog.Title>Detaljer</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="DialogBody TaskDetailsDialogBody">
              <Flex gap="4" direction="column">
                <Box>
                  <TaskDetailsTable />
                </Box>
                <Dialog.Title>Historik</Dialog.Title>
                {showPlaceholderBox ? (
                  <EmptyDataState
                    icon={<TbTimeDurationOff />}
                    text={"Denne to-do har ikke noget historik endnu"}
                  />
                ) : (
                  <TaskChanges taskEdits={taskEdits} />
                )}
              </Flex>
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
export default TaskDetailsDialog;
