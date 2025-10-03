import { Dialog, Button, Portal, CloseButton, Card } from "@chakra-ui/react";
import TaskCheckbox from "../TaskCard/TaskCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { setTaskEditsToDefault, TaskEdits } from "../../store/slices/taskEditsSlice/taskEditsSlice";
import { useEffect } from "react";
import { fetchTaskEdits } from "../../store/slices/taskEditsSlice/thunks";

const TaskChange = ({ taskEdit }: { taskEdit: TaskEdits }) => {
  return (
    <div>
      <Dialog.Description> {taskEdit.dateEdited?.toLocaleString('en-UK')} </Dialog.Description>
      <Card.Root>
        <Card.Header />
        <Card.Body >
          <Card.Description>
            <input value={taskEdit.taskText} readOnly={true} />
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <TaskCheckbox taskCompleted={taskEdit.taskCompleted} />
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

const DisplayTaskChanges = ({ taskEdits }: { taskEdits: TaskEdits[]}) => {

    return (
      //printer alle inputs
      taskEdits.map((taskEdit) => (
        <div key={taskEdit.taskEditsUuid.toString()}>
          {<TaskChange taskEdit={taskEdit} />}
        </div>
      ))
    );
};

const TaskDetailsDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const taskEdits = useSelector((state: RootState) => state.taskEdits);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (detailsDialog.taskObject) 
    dispatch(fetchTaskEdits(detailsDialog.taskObject.taskUuid))
  }, [detailsDialog.taskObject])

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
            <Dialog.Header>
              <Dialog.Title>To-do historik</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <DisplayTaskChanges taskEdits={taskEdits} />
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

export default TaskDetailsDialog;