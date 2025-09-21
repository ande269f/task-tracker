import { AppDispatch } from "../store";
import { Card, IconButton, Button } from "@chakra-ui/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { setTaskDeleted, setTaskCompleted, setTaskText } from "../store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { DetailsButtonMaker } from "./DetailsButtonMaker";
import useTaskChangeLogger from "../hooks/taskChangesLogger";
import CheckboxMaker from "./CheckboxMaker";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { taskObject } from "../store/slices/taskSlice";




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

logTask()


    const [isEditOff, setIsEditOff] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        dispatch(setTaskDeleted({uuid: task.taskUuid, taskDeleted: new Date()}))
        logChanges();
    }
    
    const handleComplete = () => {
        if (isEditOff) {
            dispatch(setTaskCompleted({taskUuid: task.taskUuid, taskCompleted: !task.taskCompleted}))
        }
        logChanges();
    }
    const handleEdit = () => {
        setIsEditOff(!isEditOff)
        isEditOff ? inputRef.current?.focus() : inputRef.current?.blur()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTaskText({uuid: task.taskUuid, taskText: e.target.value}))
    }

    const showDialogBox = () => {
        dispatch(setDetailsDialogState({taskObject: task, dialogboxOpened: true, dialogboxType: "taskDetailsDialog"}))
    }



    if (!task.taskDeleted) {
            return (
        <div >
            <Card.Root onClick={() => {handleComplete(); }}>
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
                    <DetailsButtonMaker handleDetailsButtonMaker={showDialogBox}/>
                </Card.Footer>
            </Card.Root>
        </div>
    )
    }
}

export default TaskCardMaker;