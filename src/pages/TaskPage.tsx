import { useBeforeunload } from "react-beforeunload";
import { ActionBarMaker } from "../components/ActionBarMaker";
import DisplayDialog from "../components/dialogbox/DisplayDialog";
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
      <DisplayDialog />
    </>
  );
};

export default TaskPage