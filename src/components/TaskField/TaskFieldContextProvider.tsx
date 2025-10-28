import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { TaskSkeleton } from "../animations/TaskSkeleton";


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

  // Vis placeholder skeleton mens der loades
  if (userInput.loading === true) {
    return <TaskSkeleton howMany={1} className="TaskCard" height={86} />;
  }

  return (
    <TaskFieldContext.Provider
      value={{ userInput, sortTask, sortState, dispatch }}
    >
      {children}
      
    </TaskFieldContext.Provider>
  );
};

export { TaskFieldContext, TaskFieldContextProvider };