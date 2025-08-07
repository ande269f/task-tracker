import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCardMaker from "./TaskCardMaker";
import { Droppable, Draggable, DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box } from "@chakra-ui/react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createContext, useContext, useState } from 'react';
import { updateSortOrder } from "../store/slices/sortTasksSlice";
import { interactiveTaskSort } from "../utils/sortManager";

// TaskField printer alle task komponenterne i en liste ved map()
// TaskField bruger @hello-pangea/dnd til at håndtere brugerens egen ændring i rækkefølge
// @hello-pangea/dnd dokumentation -> https://github.com/hello-pangea/dnd?tab=readme-ov-file


interface TaskPrinterProps {
  innerRef: any;
  droppableProps: any;
  placeholder: React.ReactNode;
}

interface TaskContext {
  userInput: RootState["form"]
  sortTask: RootState["sortTasks"]
  dispatch: AppDispatch
}

const DataFromStore = createContext<TaskContext | null>(null);

const TaskField = () => {
  const userInput = useSelector((state: RootState) => state.form);
  const sortTask = useSelector((state: RootState) => state.sortTasks);
  const dispatch = useDispatch<AppDispatch>()


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // brugeren droppede udenfor liste

    const fromIndex = source.index;
    const toIndex = destination.index;

    dispatch(updateSortOrder({ from: fromIndex, to: toIndex }));
};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DataFromStore.Provider value={{userInput, sortTask, dispatch}}>
        <DroppableTaskField/>
      </DataFromStore.Provider>
    </DragDropContext>
  )
}

const DroppableTaskField = () => {
  return (
    <Droppable droppableId="droppable-tasks">
      {(provided) => (
        <DraggableTaskPrinter
          innerRef={provided.innerRef}
          droppableProps={provided.droppableProps}
          placeholder={provided.placeholder}
        />
      )}
    </Droppable>
  );
};


const DraggableTaskPrinter = ({ innerRef, droppableProps, placeholder }: TaskPrinterProps) => {
  const dataFromStore = useContext(DataFromStore);
  if (!dataFromStore) throw new Error("TaskContext not found");

  // snupper userInput fra dataFromStore
  const {userInput} = dataFromStore
  const {sortTask} = dataFromStore

  const sortedUserInput = interactiveTaskSort(userInput, sortTask)
  

  return (
    <div ref={innerRef} {...droppableProps}>
      {sortedUserInput.map((input, index) => (
        <Draggable draggableId={input.uuid.toString()} index={index}  key={input.uuid.toString()}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCardMaker task={input} />
            </Box>
          )}
        </Draggable>
      ))}
      {placeholder}
    </div>
  );
};





export default TaskField;
