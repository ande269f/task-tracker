import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const taskField = () => {
      const userInput = useSelector((state: RootState) => state.form);
      return (
        //printer alle inputs
        userInput.map((input) => <div key=""> {userInput[0] 
            ? `${ input.taskText}, ${input.taskState ? "hej" : "nej"}` : "ingen tekst fundet"} 
        </div>
        ))
}

export default taskField;