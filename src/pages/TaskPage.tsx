import { TaskPageActions } from "../components/TaskPageActions/TaskPageActions";
import InputField from "../components/InputField";
import TaskField from "../components/taskField";
import { Flex } from "@chakra-ui/react";
import "./TaskPage.scss";
import RemoveCompletedTasksButton from "../components/TaskPageActions/RemoveCompletedTasksButton";

const TaskPage = () => {
  return (
    <div className="TaskPageBackground">
      <div id="TaskPage">
        <InputField />
        <TaskPageActions />
        <RemoveCompletedTasksButton />

        <TaskField />
      </div>
    </div>
  );
};

export default TaskPage;
