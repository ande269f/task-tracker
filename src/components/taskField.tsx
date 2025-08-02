import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Card, Checkbox, IconButton  } from "@chakra-ui/react"
import { MdDelete, MdModeEdit } from "react-icons/md";
import { setTaskDeleted, setTaskCompleted, taskObject, setTaskText, setTaskEditsLog } from "../store/slices/textInputSlice";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

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

const DetailsButtonMaker = ({showDetails}: {showDetails: Function}) => {
    return (
        <HiDotsHorizontal onClick={(e) => {e.stopPropagation(); showDetails();}}/>
    )

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

const CardMaker = ({item}: {item: taskObject}) => {
    const [isEditOff, setIsEditOff] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [loggedTask, setLoggedTask] = useState<taskObject>()


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
    const logChanges = () => {

        if (!loggedTask) return;
        
        //hvis der er sket en ændring, så log
        const hasChanged =
            loggedTask.taskText !== item.taskText ||
            loggedTask.taskCompleted !== item.taskCompleted ||
            loggedTask.taskDeleted !== item.taskDeleted;
        if (hasChanged) {
            console.log(item)
            dispatch(setTaskEditsLog({uuid: item.uuid, taskEditsLog: {taskText: item.taskText, dateEdited: new Date, taskCompleted: item.taskCompleted, taskDeleted: item.taskDeleted}}))
        }
    }
    const logTask = () => {
        setLoggedTask(item)

    }

    const showDetails = () => {
        console.log("hej")
    }


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
                                onBlur={logChanges}
                            />
                        </Card.Description>
                    </Card.Body>
                <Card.Footer>
                    <EditTaskButtonMaker handleEdit={() => {handleEdit(); logChanges();}}/>
                    <CheckboxMaker taskCompleted={item.taskCompleted}/>
                    <DeleteButtonMaker handleDelete={() => {handleDelete(); logChanges();}}/>
                    <DetailsButtonMaker showDetails={showDetails}/>
                </Card.Footer>
            </Card.Root>
        </div>
    )
    }
}

const TaskField = () => {
      const userInput = useSelector((state: RootState) => state.form);
      return (
        //printer alle inputs
        userInput.map((input) => 
        <div key={input.uuid.toString()}> {
            <CardMaker item={input}/>
        } 
        </div>
        ))
}

export default TaskField;