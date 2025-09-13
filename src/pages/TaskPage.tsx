import { useBeforeunload } from "react-beforeunload";
import { ActionBarMaker } from "../components/ActionBarMaker";
import InputField from "../components/InputField";
import TaskField from "../components/TaskField";
import "./TaskPage.scss"
import { Flex } from "@chakra-ui/react";

const TaskPage = () => {
  useBeforeunload((event) => {
    console.log("hej");
    event.preventDefault();
  });
  return (
    <div id="TaskPage">
      <Flex id="flexbox-top-part">
        <InputField />
        <ActionBarMaker />
      </Flex>


      <TaskField />
    </div>
  );
};

export default TaskPage