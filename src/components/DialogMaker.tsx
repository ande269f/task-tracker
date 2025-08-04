import { Dialog, Button, Portal, CloseButton, Card } from "@chakra-ui/react";
import { taskEditsLog, taskObject } from "../store/slices/textInputSlice";
import CheckboxMaker from "./CheckboxMaker";

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

const DisplayTaskChanges = ({task}: {task: taskObject}) => {
      return (
        //printer alle inputs
        task.taskEditsLog.map((taskChanges) => 
        <div key={taskChanges.uuid.toString()}> {
            <TaskChange taskEditsLog={taskChanges}/>
        } 
        </div>
        ))
}


const DialogMaker = ({task, displayDialog, setDisplayDialog}: {task: taskObject, displayDialog: boolean, setDisplayDialog: (val: boolean) => void;
}) => {

    return (
 <Dialog.Root  key={"sm"} size={"sm"} open={displayDialog} onOpenChange={() => setDisplayDialog(!displayDialog)}>
            <Dialog.Trigger asChild>
                <Button style={{ display: "none" }}>
                </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content onClick={(e) => { e.stopPropagation();}}>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <DisplayTaskChanges task={task}/>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button onClick={(e) => { e.stopPropagation(); setDisplayDialog(!displayDialog)}} variant="outline">Cancel</Button>
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