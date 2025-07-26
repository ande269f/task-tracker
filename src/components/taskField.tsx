import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const taskField = () => {
      const userInput = useSelector((state: RootState) => state.form);
      return (
        <div> {userInput.taskText}, {userInput.taskState ? "hej" : "nej"} </div>
      )
}

export default taskField;