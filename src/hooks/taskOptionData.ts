import { useContext } from "react";
import { TaskCardContext } from "../components/TaskCard/TaskCard";



export const useTaskOptionData = () => {
      const context = useContext(TaskCardContext);
      if (!context) return null;
      const {dispatch, isEditOff, setIsEditOff, inputRef, task} = context;
      if (!dispatch || !task) return null;


    return {dispatch, isEditOff, setIsEditOff, inputRef, task};
}