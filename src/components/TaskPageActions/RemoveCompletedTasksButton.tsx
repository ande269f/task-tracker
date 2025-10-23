import { Button } from "@chakra-ui/react";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { setTaskDeleted } from "../../store/slices/taskSlice/taskSlice";
import "./style.scss";
import { Confetti } from "../animations/Confetti";
import { setAnimation } from "../../store/slices/animationSlice/animationSlice";

const RemoveCompletedTasksButton = () => {
  const [showButton, setShowButton] = useState<Boolean>(false);
  const tasks = useSelector((state: RootState) => state.form.tasks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //gennemgår tasks for nogle der er completed, men ikke deleted - returnere true
    setShowButton(
      tasks.some((task) => task.taskCompleted && !task.taskDeleted)
    );
  }, [tasks]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const completedTasks = tasks.filter(
      (task) => task.taskCompleted && !task.taskDeleted
    );
    completedTasks.map((task) =>
      dispatch(setTaskDeleted({ uuid: task.taskUuid, taskDeleted: new Date() }))
    );

    dispatch(setAnimation("confetti"));
  };

  if (!showButton) return null;

  return (
    <Button
      className={"RemoveFinishedTasksButton"}
      aria-label="RemoveFinishedTasksButton"
      onClick={(e) => {
        handleClick(e);
      }}
      animationName=" fade-in"
      animationDuration="0.2s"
      variant="subtle"
      backgroundColor="green.300"
    >
      Fjern to-do's <MdOutlineRemoveDone />
    </Button>
  );
};

export default RemoveCompletedTasksButton;
