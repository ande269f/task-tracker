import { Dialog, Button, Portal, CloseButton, Card } from "@chakra-ui/react";
import { taskObject } from "../store/slices/textInputSlice";
import CheckboxMaker from "./CheckboxMaker";

const DisplayTaskChanges = ({edits}: {edits: taskObject["taskEditsLog"][0]}) => {
                return (
            <div >
                <Card.Root>
                    <Card.Header />
                        <Card.Body> 
                            <Card.Description>
                                <input 
                                    value={edits.taskText} 
                                    readOnly={true} 
                                />
                            </Card.Description>
                        </Card.Body>
                    <Card.Footer>
                        <CheckboxMaker taskCompleted={edits.taskCompleted}/>
                    </Card.Footer>
                </Card.Root>
            </div>
        )
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
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
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