import { ActionBarMaker } from "../components/ActionBarMaker";
import InputField from "../components/InputField";
import TaskField from "../components/taskField";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskDataHandler, { UserTaskDataDto } from "../API/TaskDataHandler";
import { setTasks } from "../store/slices/taskSlice";
import { setTaskOrder } from "../store/slices/interactiveTaskOrderSlice";
import Login from "../API/Login";

const TaskPage = () => {

  const taskState = useSelector((state: RootState) => state.form);

  if (taskState.loading) return <p>Loader tasks...</p>;
  if (taskState.error) return <p>Fejl: {taskState.error}</p>;

  return (
    <>
      <InputField />
      <ActionBarMaker />
      <TaskField />
    </>
  );
};

export default TaskPage;
