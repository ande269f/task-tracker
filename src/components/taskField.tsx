import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCardMaker from "./TaskCardMaker";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";
import { Box } from "@chakra-ui/react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createContext, useContext } from "react";
import { updateSortOrder } from "../store/slices/interactiveTaskOrderSlice";
import { handleSorting } from "../utils/sortingUtils";
import TaskDataHandler from "../API/TaskDataHandler";

// TaskField printer alle task komponenterne i en liste ved map()
// TaskField bruger @hello-pangea/dnd til at håndtere brugerens egen ændring i rækkefølge
// @hello-pangea/dnd dokumentation -> https://github.com/hello-pangea/dnd?tab=readme-ov-file

interface TaskPrinterProps {
  innerRef: any;
  droppableProps: any;
  placeholder: React.ReactNode;
}

interface TaskContext {
  userInput: RootState["form"];
  sortTask: RootState["sortTasks"];
  sortState: RootState["sortState"];
  dispatch: AppDispatch;
}

const DataFromStore = createContext<TaskContext | null>(null);

const TaskField = () => {
  const userInput = useSelector((state: RootState) => state.form);
  const sortTask = useSelector((state: RootState) => state.sortTasks);
  const sortState = useSelector((state: RootState) => state.sortState);
  const dispatch = useDispatch<AppDispatch>();

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // brugeren droppede udenfor liste

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    dispatch(
      updateSortOrder({
        from: fromIndex,
        to: toIndex,
        sortDirection: sortState.sortDirection,
      })
    );

    const taskDataHandler = new TaskDataHandler();
    const response = await taskDataHandler.updateTaskOrder(sortTask);
    if (response != "SUCCESS") {
      console.warn("rækkefølge er ikke opdateret");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DataFromStore.Provider
        value={{ userInput, sortTask, dispatch, sortState }}
      >
        <DroppableTaskField />
      </DataFromStore.Provider>
    </DragDropContext>
  );
};

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

const DraggableTaskPrinter = ({
  innerRef,
  droppableProps,
  placeholder,
}: TaskPrinterProps) => {
  const dataFromStore = useContext(DataFromStore);
  if (!dataFromStore) throw new Error("TaskContext not found");

  // snupper userInput fra dataFromStore
  const { userInput } = dataFromStore;
  const { sortTask } = dataFromStore;
  const { sortState } = dataFromStore;

  const sortedUserInput = handleSorting({
    userInput: userInput.tasks,
    sortTask: sortTask,
    sortingState: sortState,
  });

  if (sortTask.length != 0 && sortedUserInput.length == 0) {
    // test - hvis sorttask ikke er tom men den sorterede liste er tom, så er der et problem
    console.error("Problem med sortering!!");
  }
  if (userInput.tasks.length != 0 && sortedUserInput.length == 0) {
    // test - hvis sorttask ikke er tom men den sorterede liste er tom, så er der et problem
    console.error("Problem med sortering!!");
  }

  return (
    <div ref={innerRef} {...droppableProps}>
      {sortedUserInput.map((input, index) => (
        <Draggable
          draggableId={input.taskUuid.toString()}
          index={index}
          key={input.taskUuid.toString()}
          isDragDisabled={
            sortState.sortingState == "interactiveOrdering" ? false : true
          }
        >
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
