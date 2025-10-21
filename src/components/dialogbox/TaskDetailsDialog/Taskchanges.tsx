import { Dialog, Card } from "@chakra-ui/react";
import { TaskEdits } from "../../../store/slices/taskEditsSlice/taskEditsSlice";
import { dateTaskEditsSort } from "../../../utils/sortingUtils";
import TaskCheckbox from "../../TaskCard/TaskCardProps/TaskCheckbox";




const TaskChange = ({ taskEdit }: { taskEdit: TaskEdits }) => {
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

const TaskChanges = ({
  taskEdits,
}: {
  taskEdits: TaskEdits[];
}) => {
  const sortedTaskEdits = dateTaskEditsSort(taskEdits);
  return (
    //printer alle inputs
    sortedTaskEdits.map((taskEdit) => (
      <div key={taskEdit.taskEditsUuid.toString()}>
        {<TaskChange taskEdit={taskEdit} />}
      </div>
    ))
  );
};

export default TaskChanges;