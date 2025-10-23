import { TaskPageActions } from "../components/TaskPageActions/TaskPageActions";
import InputField from "../components/InputField/InputField";
import TaskField from "../components/TaskField/TaskField";
import "./TaskPage.scss";
import RemoveCompletedTasksButton from "../components/TaskPageActions/RemoveCompletedTasksButton";
import TaskCard from "../components/TaskCard/TaskCard";
import { Confetti } from "../components/animations/Confetti";

const TaskPage = () => {
  return (
    <div className="TaskPageBackground">
      <div id="TaskPage">
        <InputField />
        <TaskPageActions />
        <RemoveCompletedTasksButton />
        <Confetti />

          <TaskField>
            <TaskCard />
          </TaskField>
      </div>
    </div>
  );
};

export default TaskPage;
