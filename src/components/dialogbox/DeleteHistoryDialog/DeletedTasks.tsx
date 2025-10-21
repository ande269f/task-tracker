import { Dialog, Flex, Card } from "@chakra-ui/react";
import { taskObject } from "../../../store/slices/taskSlice/taskSlice";
import TaskCheckbox from "../../TaskCard/TaskCardProps/TaskCheckbox";
import { DeleteTaskPermanentlyButton } from "./Buttons/DeleteTaskPermanentlyButton";
import { RestoreTaskButton } from "./Buttons/RestoreTaskButton";
import "./DeleteHistoryDialogStyle.scss";

export const DeletedTasks = ({ tasks }: { tasks: taskObject[] | null }) => {
  if (tasks)
    return (
      //printer alle slettede inputs
      tasks.map((task) => (
        <div key={task.taskUuid.toString()} className="DeletedTaskContainer">
          {task.taskDeleted ? <DeletedTask task={task} /> : null}
        </div>
      ))
    );
};

const DeletedTask = ({ task }: { task: taskObject }) => {
  return (
    <>
      <Dialog.Description>
        {task.taskDeleted?.toLocaleString("en-UK")}
      </Dialog.Description>

      <Flex direction="row">
        <Card.Root
          width="100%"
          variant={task.taskCompleted ? "subtle" : "outline"}
          backgroundColor={task.taskCompleted ? "green.300" : "white"}
        >
          <Card.Header />
          <Card.Body>
            <Card.Description className="TaskCardPlainText">
              {task.taskText}
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <TaskCheckbox taskCompleted={task.taskCompleted} />
          </Card.Footer>
        </Card.Root>

        <Flex
          className="ButtonArea"
          alignItems={"center"}
          justifyContent={"center"}
          direction="column"
        >
          <RestoreTaskButton taskUuid={task.taskUuid} />
          <DeleteTaskPermanentlyButton task={task} />
        </Flex>
      </Flex>
    </>
  );
};
