import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Card, Checkbox, IconButton  } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { setTaskDeleted, setTaskCompleted, inputState } from "../store/slices/textInputSlice";
import { useDispatch } from "react-redux";


interface cardMakerProps extends inputState {}

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


const DeleteButtonMaker = ({handleDelete}: {handleDelete: Function}) => {
    return (
        <IconButton aria-label="Search database" onClick={(e) => {e.stopPropagation(); handleDelete();}}>
            <MdDelete />
        </IconButton>
    )
}

const CardMaker = ({item}: {item: cardMakerProps}) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = () => {
        dispatch(setTaskDeleted({uuid: item.uuid, taskDeleted: true}))
    }
    const handleComplete = () => {
        dispatch(setTaskCompleted({uuid: item.uuid, taskCompleted: !item.taskCompleted}))
    }

    if (!item.taskDeleted) {
            return (
        <Card.Root onClick={handleComplete}>
            <Card.Header />
                <Card.Body> 
                    <Card.Description>
                        {item.taskText}
                    </Card.Description>
                </Card.Body>
            <Card.Footer>
                <CheckboxMaker taskCompleted={item.taskCompleted}/>
                <DeleteButtonMaker handleDelete={handleDelete}/>
            </Card.Footer>
        </Card.Root>
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