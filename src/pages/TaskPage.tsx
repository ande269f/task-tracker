import { ActionBarMaker } from "../components/ActionBarMaker";
import InputField from "../components/InputField";
import TaskField from "../components/taskField";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData, } from "../store/slices/taskSlice";

const TaskPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const taskState = useSelector((state: RootState) => state.form);


  useEffect(() => {
    if (taskState.refreshed) {
      dispatch(loadUserData())
    }
  }, [taskState.refreshed, dispatch])

  return (
    <>
      <InputField />
      <ActionBarMaker />
      <TaskField />
    </>
  );
};

export default TaskPage;
