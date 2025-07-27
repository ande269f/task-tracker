import { useSelector } from "react-redux";
import { RootState } from "../store";

const taskField = () => {
      const userInput = useSelector((state: RootState) => state.form);
      return (
        //printer alle inputs
        userInput.map((input) => <div key={input.uuid.toString()}> {userInput[0] 
            ? `${ input.taskText}, ${input.taskState ? "hej" : "nej"}, ${input.date}` : "ingen tekst fundet"} 
        </div>
        ))
}

export default taskField;