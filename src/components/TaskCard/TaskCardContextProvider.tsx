

import { createContext, useRef, useState, type ReactNode } from 'react';
import { AppDispatch } from '../../store';
import { taskObject } from '../../store/slices/taskSlice/taskSlice';
import { useDispatch } from 'react-redux';
import useTaskEditsLogger from '../../hooks/taskChangesLogger';


type TaskCardContextType = {
  dispatch?: AppDispatch;
  isEditOff: boolean;
  setIsEditOff: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  task?: taskObject;
  logTaskEdit: () => void;
};

export const TaskCardContext = createContext<TaskCardContextType | undefined>(
  undefined
);

const TaskCardContextProvider = ({children, task}: { children: ReactNode, task: taskObject } ) => {


  const { logTaskEdit } = useTaskEditsLogger(task);
  const [isEditOff, setIsEditOff] = useState<boolean>(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
        return (
          <TaskCardContext.Provider
            value={{
              dispatch,
              isEditOff,
              setIsEditOff,
              inputRef,
              task,
              logTaskEdit,
            }}
          >
            {children}
          </TaskCardContext.Provider>
        )
}

export default TaskCardContextProvider;