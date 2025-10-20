import { useContext } from "react";
import { TaskCardContext } from "../components/TaskCard/TaskCardContextProvider";


export const useTaskCardContext = () => {
      const context = useContext(TaskCardContext);
      if (!context) return null;
      const {dispatch, isEditOff, setIsEditOff, inputRef, task, logTaskEdit} = context;
      if (!dispatch || !task) return null;


    return {dispatch, isEditOff, setIsEditOff, inputRef, task, logTaskEdit};
}