import { TaskPageActions } from "../components/TaskPageActions/TaskPageActions";
import InputField from "../components/InputField";
import TaskField from "../components/taskField";

const TaskPage = () => {

  return (
    <>
      <InputField />
      <TaskPageActions />
      <TaskField />
    </>
  );
};

export default TaskPage;
