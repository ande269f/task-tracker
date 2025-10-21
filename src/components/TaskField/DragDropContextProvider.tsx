import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { pushSortOrder } from "../../store/slices/taskOrderSlice/thunks";
import { TaskFieldContext } from "./TaskFieldContextProvider";
import { DroppableTaskField } from "./DroppableTaskField";
import { useContext } from "react";

// TaskField printer alle task komponenterne i en liste ved map()
// TaskField bruger @hello-pangea/dnd til at håndtere brugerens egen ændring i rækkefølge
// @hello-pangea/dnd dokumentation -> https://github.com/hello-pangea/dnd?tab=readme-ov-file

export interface DragDropTaskContext {
  innerRef: any;
  droppableProps: any;
  placeholder: React.ReactNode;
}

const DragDropContextProvider = ({children}: {children: React.ReactNode}) => {
  const taskFieldContext = useContext(TaskFieldContext);
  if (!taskFieldContext) return null;

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // brugeren droppede udenfor liste

    taskFieldContext.dispatch(
      pushSortOrder({
        from: result.source.index,
        to: result.destination.index,
        sortDirection: taskFieldContext.sortState.sortDirection,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableTaskField>
        {/* DraggableTaskProvider wrapper her */}
        {children}
      </DroppableTaskField>
    </DragDropContext>
  );
};

export default DragDropContextProvider;
