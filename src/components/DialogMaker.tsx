import { Dialog, Button, Portal, CloseButton, Card } from "@chakra-ui/react";
import CheckboxMaker from "./CheckboxMaker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { taskObject, taskEditsLog } from "../store/states/taskObjectState";

const TaskChange = ({taskEditsLog}: {taskEditsLog: taskEditsLog}) => {
                return (
            <div >
                <Card.Root>
                    <Card.Header />
                        <Card.Body> 
                            <Card.Description>
                                <input 
                                    value={taskEditsLog.taskText} 
                                    readOnly={true} 
                                />
                            </Card.Description>
                        </Card.Body>
                    <Card.Footer>
                        <CheckboxMaker taskCompleted={taskEditsLog.taskCompleted}/>
                    </Card.Footer>
                </Card.Root>
            </div>
        )
}

const DisplayTaskChanges = ({task}: {task: taskObject | null}) => {
    if (task)
      return (
        //printer alle inputs
        task.taskEditsLog.map((taskChanges) => 
        <div key={taskChanges.uuid.toString()}> {
            <TaskChange taskEditsLog={taskChanges}/>
        } 
        </div>
        ))
}


const DialogMaker = () => {
    const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
    const dispatch = useDispatch<AppDispatch>();

    

    return (
 <Dialog.Root  key={"sm"} size={"sm"} open={detailsDialog.dialogboxOpened} onOpenChange={() => dispatch(setDetailsDialogState({taskObject: detailsDialog.taskObject, dialogboxOpened: false}))}>
            <Dialog.Trigger asChild>
                <Button style={{ display: "none" }}>
                </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <DisplayTaskChanges task={detailsDialog.taskObject}/>
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
    )
}

export default DialogMaker;