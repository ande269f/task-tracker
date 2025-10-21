import { TaskFieldContextProvider } from "./TaskFieldContextProvider";
import DragDropContextProvider from "./DragDropContextProvider";

// TaskField printer alle task komponenterne i en liste ved map()
// TaskField bruger @hello-pangea/dnd til at håndtere brugerens egen ændring i rækkefølge
// @hello-pangea/dnd dokumentation -> https://github.com/hello-pangea/dnd?tab=readme-ov-file

export interface DragDropTaskContext {
  innerRef: any;
  droppableProps: any;
  placeholder: React.ReactNode;
}

const TaskField = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="TaskField">
      <TaskFieldContextProvider>
        <DragDropContextProvider>{children}</DragDropContextProvider>
      </TaskFieldContextProvider>
    </div>
  );
};

export default TaskField;
