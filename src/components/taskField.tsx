import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCardMaker from "./TaskCardMaker"

const TaskField = () => {
      const userInput = useSelector((state: RootState) => state.form);
      return (
        //printer alle inputs
        userInput.map((input) => 
        <div key={input.uuid.toString()}> {
            <TaskCardMaker task={input}/>
        } 
        </div>
        ))
}

export default TaskField;