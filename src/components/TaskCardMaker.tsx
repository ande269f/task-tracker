import { AppDispatch } from "../store";
import { Card, Checkbox, IconButton, Button } from "@chakra-ui/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { setTaskDeleted, setTaskCompleted, taskObject, setTaskText } from "../store/slices/textInputSlice";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import useTaskChangeLogger from "../hooks/taskChangesLogger";
import DialogMaker from "./DialogMaker";
import CheckboxMaker from "./CheckboxMaker";




const DetailsButtonMaker = ({task}: {task: taskObject}) => {
    const [displayDialog, setDisplayDialog] = useState<boolean>(false)
  return (
    <div>
        <Button
        aria-label="Open details"
        onClick={(e) => { e.stopPropagation(); setDisplayDialog(!displayDialog)}}
        variant="ghost"
        >
            <HiDotsHorizontal />
        </Button>
        <DialogMaker task={task} displayDialog={displayDialog} setDisplayDialog={setDisplayDialog} />
    </div>
  );
}


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

const TaskCardMaker = ({task}: {task: taskObject}) => {
    const {logTask, logChanges} = useTaskChangeLogger(task)
    const [isEditOff, setIsEditOff] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        dispatch(setTaskDeleted({uuid: task.uuid, taskDeleted: true}))
    }
    const handleComplete = () => {
        if (isEditOff) {
            dispatch(setTaskCompleted({uuid: task.uuid, taskCompleted: !task.taskCompleted}))
        }
    }
    const handleEdit = () => {
        setIsEditOff(!isEditOff)
        isEditOff ? inputRef.current?.focus() : inputRef.current?.blur()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTaskText({uuid: task.uuid, taskText: e.target.value}))
    }

    useEffect(() => {
        logChanges();
    }, [task.taskCompleted, task.taskDeleted]);


    if (!task.taskDeleted) {
            return (
        <div >
            <Card.Root onClick={() => {logTask();}}>
                <Card.Header />
                    <Card.Body> 
                        <Card.Description>
                            <input 
                                value={task.taskText} 
                                onChange={handleChange} 
                                readOnly={isEditOff} 
                                ref={inputRef} 
                                onBlur={logChanges} //håndtere logning af ændring i taskText anderledes end andre ændringer for at undgå hver nyt bogstav trigger en ny record
                            />
                        </Card.Description>
                    </Card.Body>
                <Card.Footer>
                    <EditTaskButtonMaker handleEdit={handleEdit}/>
                    <CheckboxMaker taskCompleted={task.taskCompleted}/>
                    <DeleteButtonMaker handleDelete={handleDelete}/>
                    <DetailsButtonMaker task={task}/>
                </Card.Footer>
            </Card.Root>
        </div>
    )
    }
}

export default TaskCardMaker;