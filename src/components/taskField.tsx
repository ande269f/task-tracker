import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Card, Checkbox, IconButton  } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { UUIDTypes } from "uuid";
import { setTaskDeleted } from "../store/slices/textInputSlice";
import { useDispatch } from "react-redux";

interface cardMakerProps {
    date: Date;
    uuid: UUIDTypes;
    taskText: string;
    taskCompleted: boolean;
    taskDeleted: boolean;
}

const CheckboxMaker = () => {
    return (
        <Checkbox.Root>
            <Checkbox.HiddenInput />
                <Checkbox.Control>
                    <Checkbox.Indicator />
                </Checkbox.Control>
            <Checkbox.Label />
        </Checkbox.Root>
    )
}

const DeleteButtonMaker = ({handleDelete}: {handleDelete: () => void}) => {
    return (
        <IconButton aria-label="Search database" onClick={handleDelete}>
            <MdDelete />
        </IconButton>
    )
}

const CardMaker = ({item}: {item: cardMakerProps}) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = () => {
        dispatch(setTaskDeleted({uuid: item.uuid, taskDeleted: true}))
    }

    if (!item.taskDeleted) {
            return (
        <Card.Root>
            <Card.Header />
                <Card.Body> 
                    <Card.Description>
                        {item.taskText}
                    </Card.Description>
                </Card.Body>
            <Card.Footer>
                <CheckboxMaker/>
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