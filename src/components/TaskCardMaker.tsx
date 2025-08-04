import { AppDispatch } from "../store";
import { Card, Checkbox, IconButton, Button, Portal, CloseButton  } from "@chakra-ui/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { setTaskDeleted, setTaskCompleted, taskObject, setTaskText, setTaskEditsLog } from "../store/slices/textInputSlice";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import useTaskChangeLogger from "../hooks/taskChangesLogger";
import { Dialog } from "@chakra-ui/react" 

const CheckboxMaker = ({taskCompleted}: {taskCompleted: boolean}) => {
    return (
        <Checkbox.Root readOnly checked={taskCompleted}>
            <Checkbox.HiddenInput />
                <Checkbox.Control>
                    <Checkbox.Indicator />
                </Checkbox.Control>
            <Checkbox.Label />
        </Checkbox.Root>
    )
}

const DialogMaker = ({item}: {item: taskObject}) => {
    const [open, setOpen] = useState(false)
    return (
 <Dialog.Root lazyMount  key={"sm"} size={"sm"} open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button
                aria-label="Open details"
                onClick={(e) => { e.stopPropagation(); }}
                variant="ghost"
                >
                    <HiDotsHorizontal />
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
                      <Button onClick={(e) => { e.stopPropagation(); }} variant="outline">Cancel</Button>
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

const DetailsButtonMaker = () => {
  return (
    <Button
    aria-label="Open details"
    //onClick={(e) => { e.stopPropagation(); }}
    variant="ghost"
    >
        
    </Button>
  );
}
    //<HiDotsHorizontal />


const DeleteButtonMaker = ({handleDelete}: {handleDelete: Function}) => {
    return (
        <IconButton aria-label="Search database" onClick={(e) => {e.stopPropagation(); handleDelete();}}>
            <MdDelete />
        </IconButton>
    )
}

const EditTaskButtonMaker = ({handleEdit}: {handleEdit: Function}) => {
    return (
        <IconButton aria-label="Edit Task" onClick={(e) => {e.stopPropagation(); handleEdit();}}>
            <MdModeEdit />
        </IconButton>
    )
}

const TaskCardMaker = ({item}: {item: taskObject}) => {
    const {logTask, logChanges} = useTaskChangeLogger(item)
    const [isEditOff, setIsEditOff] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [toggleDialog, setToggleDialog] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        dispatch(setTaskDeleted({uuid: item.uuid, taskDeleted: true}))
    }
    const handleComplete = () => {
        if (isEditOff) {
            dispatch(setTaskCompleted({uuid: item.uuid, taskCompleted: !item.taskCompleted}))
        }
    }
    const handleEdit = () => {
        setIsEditOff(!isEditOff)
        isEditOff ? inputRef.current?.focus() : inputRef.current?.blur()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTaskText({uuid: item.uuid, taskText: e.target.value}))
    }

    useEffect(() => {
        logChanges();
    }, [item.taskCompleted, item.taskDeleted]);


    if (!item.taskDeleted) {
            return (
        <div >
            <Card.Root onClick={() => {handleComplete(); logTask();}}>
                <Card.Header />
                    <Card.Body> 
                        <Card.Description>
                            <input 
                                value={item.taskText} 
                                onChange={handleChange} 
                                readOnly={isEditOff} 
                                ref={inputRef} 
                                onBlur={logChanges} //håndtere logning af ændring i taskText anderledes end andre ændringer for at undgå hver nyt bogstav trigger en ny record
                            />
                        </Card.Description>
                    </Card.Body>
                <Card.Footer>
                    <EditTaskButtonMaker handleEdit={handleEdit}/>
                    <CheckboxMaker taskCompleted={item.taskCompleted}/>
                    <DeleteButtonMaker handleDelete={handleDelete}/>
                    <DialogMaker item={item}/>
                </Card.Footer>
            </Card.Root>
        </div>
    )
    }
}

export default TaskCardMaker;