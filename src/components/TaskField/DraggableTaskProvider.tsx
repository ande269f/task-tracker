import React from "react";
import { Box } from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { handleSorting } from "../../utils/sortingUtils";
import TaskCardContextProvider from "../TaskCard/TaskCardContextProvider";
import { TaskFieldContext } from "./TaskFieldContextProvider";

type DragDropTaskContext = {
  innerRef: any;
  droppableProps: any;
  placeholder: React.ReactNode;
};

type Props = DragDropTaskContext & {
  children?: React.ReactNode;
};

export const DraggableTaskProvider = ({ innerRef, droppableProps, placeholder, children }: Props) => {
  const dataFromStore = useContext(TaskFieldContext);
  if (!dataFromStore) throw new Error("TaskContext not found");

  const { userInput, sortTask, sortState } = dataFromStore;

  const sortedUserInput = handleSorting({
    userInput: userInput.tasks,
    sortTask: sortTask,
    sortingState: sortState,
  });

  return (
    <div ref={innerRef} {...droppableProps} id="TaskField">
      {sortedUserInput.map((input, index) => (
        <Draggable
          draggableId={input.taskUuid.toString()}
          index={index}
          key={input.taskUuid.toString()}
          isDragDisabled={sortState.sortingState !== "interactiveOrdering"}
        >
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCardContextProvider task={input}>
                {children}
              </TaskCardContextProvider>
            </Box>
          )}
        </Draggable>
      ))}
      {placeholder}
    </div>
  );
};