import { TaskPageActions } from "../components/TaskPageActions/TaskPageActions";
import InputField from "../components/InputField";
import TaskField from "../components/taskField";
import { Flex } from "@chakra-ui/react";
import "./TaskPage.scss";

const TaskPage = () => {
  return (
    <div className="TaskPageBackground">
      <div id="TaskPage">
        <Flex id="flexbox-top-part">
          <InputField />
          <TaskPageActions />
        </Flex>
        <Flex id="flexbox-bottom-part">
        <TaskField />
        </Flex>

      </div>
    </div>
  );
};

export default TaskPage;
