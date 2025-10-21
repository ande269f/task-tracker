import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";


interface TaskFieldStoreContext {
  userInput: RootState["form"];
  sortTask: RootState["sortTasks"];
  sortState: RootState["sortState"];
  dispatch: AppDispatch;
}

const TaskFieldContext = createContext<TaskFieldStoreContext | null>(null);


const TaskFieldContextProvider = ({children}: {children: React.ReactNode}) => {
const userInput = useSelector((state: RootState) => state.form);
  const sortTask = useSelector((state: RootState) => state.sortTasks);
  const sortState = useSelector((state: RootState) => state.sortState);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TaskFieldContext.Provider
      value={{ userInput, sortTask, sortState, dispatch }}
    >
      {children}
      
    </TaskFieldContext.Provider>
  );
};

export { TaskFieldContext, TaskFieldContextProvider };