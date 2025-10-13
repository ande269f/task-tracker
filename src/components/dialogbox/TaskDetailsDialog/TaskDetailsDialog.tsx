import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Card,
  Box,
  Flex,
} from "@chakra-ui/react";
import TaskCheckbox from "../../TaskCard/TaskCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setDetailsDialogState } from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { TaskEdits } from "../../../store/slices/taskEditsSlice/taskEditsSlice";
import { useEffect, useState } from "react";
import { fetchTaskEdits } from "../../../store/slices/taskEditsSlice/thunks";
import { TaskDetailsTable } from "./TaskDetailsTable";
import { dateTaskEditsSort } from "../../../utils/sortingUtils";
import EmptyDataState from "../../EmptyDataState/EmptyDataState";
import { TbTimeDurationOff } from "react-icons/tb";

const TaskChange = ({ taskEdit }: { taskEdit: TaskEdits }) => {
  return (
    <div>
      <Dialog.Description>
        {taskEdit.dateEdited?.toLocaleString("en-UK")}
      </Dialog.Description>
      <Card.Root>
        <Card.Header />
        <Card.Body>
          <Card.Description className="TaskCardPlainText">
            {taskEdit.taskText}
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <TaskCheckbox taskCompleted={taskEdit.taskCompleted} />
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

export const DisplayTaskChanges = ({
  taskEdits,
}: {
  taskEdits: TaskEdits[];
}) => {
  const sortedTaskEdits = dateTaskEditsSort(taskEdits);
  return (
    //printer alle inputs
    sortedTaskEdits.map((taskEdit) => (
      <div key={taskEdit.taskEditsUuid.toString()}>
        {<TaskChange taskEdit={taskEdit} />}
      </div>
    ))
  );
};
export const TaskDetailsDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const [showPlaceholderBox, setShowPlaceholderBox] = useState<boolean>(false);
  const taskEdits = useSelector((state: RootState) => state.taskEdits);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (detailsDialog.taskObject)
      dispatch(fetchTaskEdits(detailsDialog.taskObject.taskUuid)).then(() => {
        setShowPlaceholderBox(taskEdits.length === 0);
      });
  }, [detailsDialog.taskObject]);

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
            dialogboxType: "taskDetailsDialog",
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
            <Dialog.Header className="DialogHeader">
              <Dialog.Title>Detaljer</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="DialogBody">
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
                  <DisplayTaskChanges taskEdits={taskEdits} />
                )}
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle" className="CancelDialogButton">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xl" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default TaskDetailsDialog;
