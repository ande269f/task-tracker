import { Dialog, Card } from "@chakra-ui/react";
import { TaskEdit } from "../../../store/slices/taskEditsSlice/taskEditsSlice";
import { dateTaskEditsSort } from "../../../utils/sortingUtils";
import TaskCheckbox from "../../TaskCard/TaskCardProps/TaskCheckbox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TaskSkeleton } from "../../animations/TaskSkeleton";
import { TbTimeDurationOff } from "react-icons/tb";
import EmptyDataState from "../../EmptyDataState/EmptyDataState";

const TaskChange = ({ taskEdit }: { taskEdit: TaskEdit }) => {
  return (
    <div>
      <Dialog.Description>
        {taskEdit.dateEdited?.toLocaleString("en-UK")}
      </Dialog.Description>
      <Card.Root>
        <Card.Header />
        <Card.Body>
          <Card.Description className="TaskCardPlainText">
            {taskEdit.taskText}
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <TaskCheckbox taskCompleted={taskEdit.taskCompleted} />
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

const TaskChanges = ({ taskEdits }: { taskEdits: TaskEdit[] }) => {
  const isLoading = useSelector((state: RootState) => state.taskEdits.loading);

  if (isLoading) {
    return <TaskSkeleton howMany={1} className="TaskEdit" height={70} />;
  }

  if (taskEdits.length === 0) {
    return <EmptyDataState
      icon={<TbTimeDurationOff />}
      text={"Denne to-do har ikke noget historik endnu"}
    />;
  }

  const sortedTaskEdits = dateTaskEditsSort(taskEdits);
  return (
    //printer alle inputs
    sortedTaskEdits.map((taskEdit) => (
      <div key={taskEdit.taskEditsUuid.toString()} className={"TaskEdit"}>
        {<TaskChange taskEdit={taskEdit} />}
      </div>
    ))
  );
};

export default TaskChanges;
