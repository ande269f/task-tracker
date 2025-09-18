
import { ActionBarMaker } from "../components/ActionBarMaker";
import InputField from "../components/InputField";
import TaskField from "../components/TaskField";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Login from "../API/Login";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import TaskDataHandler, { taskDto } from "../API/TaskDataHandler";
import { setTextInput } from "../store/slices/taskSlice";

const TaskPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.UserState);

  useEffect(() => {
    const checkLogin = async () => {
      const login = new Login(loginState.username);
      const response = await login.checkLogin();
      if (response != "SUCCESS") {
        navigate("/login");

        toaster.create({
          description: "Tilgå denne side kræver et login",
          type: "error"
        })
      } else {
        const taskDataHandler = new TaskDataHandler() 
        const tasks = await taskDataHandler.loadTasks();

        tasks.forEach((task: taskDto) =>
        dispatch(setTextInput({
          taskCreated: task.taskCreated,
          taskDeleted: task.taskDeleted,
          taskCompleted: task.taskCompleted,
          taskText: task.taskText,
          taskUuid: task.taskUuid,
          taskEditsLog: []
        })))



      }
    };

    checkLogin()
  });

  return (
    <>
      <InputField />
      <ActionBarMaker />
      <TaskField />
    </>
  );
};

export default TaskPage;
