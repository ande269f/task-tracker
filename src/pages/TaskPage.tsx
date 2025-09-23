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
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.UserState);
  const taskState = useSelector((state: RootState) => state.form);

  useEffect(() => {
    const fetchTaskData = async () => {
      var taskData

      const login = new Login(loginState.username)
      const response = await login.checkLogin()

      if (response && response === "SUCCESS") {
        const taskDataHandler = new TaskDataHandler();
        taskData =
          (await taskDataHandler.loadUserData()) as UserTaskDataDto;
        
      } else {
        console.warn("Ingen bruger logget ind");
        navigate("/login");
      }

      if (taskData != undefined && taskData.sortTasks != undefined) {
        dispatch(setTasks(taskData.tasks));
        dispatch(setTaskOrder(taskData.sortTasks));
      } else {
        console.warn("brugerens task data er ikke loaded korrekt");
      }
    };
    fetchTaskData();
  }, [dispatch, loginState.username, loginState.loginState, navigate]);

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
