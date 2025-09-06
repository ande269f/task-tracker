import { useBeforeunload } from "react-beforeunload";
import { ActionBarMaker } from "../components/ActionBarMaker";
import InputField from "../components/InputField";
import TaskField from "../components/TaskField";

const TaskPage = () => {
  useBeforeunload((event) => {
    console.log("hej");
    event.preventDefault();
  });
  return (
    <>
      <InputField />
      <ActionBarMaker />
      <TaskField />
    </>
  );
};

export default TaskPage