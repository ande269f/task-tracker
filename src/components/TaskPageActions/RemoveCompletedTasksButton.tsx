import { Button } from "@chakra-ui/react";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { setTaskDeleted } from "../../store/slices/taskSlice/taskSlice";

const RemoveCompletedTasksButton = () => {
  const [showButton, setShowButton] = useState<Boolean>(false)
  const tasks = useSelector((state: RootState) => state.form.tasks)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
      //gennemgår tasks for nogle der er completed, men ikke deleted - returnere true
      setShowButton(tasks.some(task => (task.taskCompleted && !task.taskDeleted)));
  }, [tasks])

  if (!showButton) return null 

  const handleClick = () => {
    const completedTasks = tasks.filter((task) => task.taskCompleted && !task.taskDeleted)
    completedTasks.map((task) => dispatch(setTaskDeleted({ uuid: task.taskUuid, taskDeleted: new Date() })))
  }

  return (
    <Button
      className="RemoveFinishedTasksButton"
      aria-label="RemoveFinishedTasksButton"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      variant="subtle"
      backgroundColor="green.300"
    >
      Fjern to-do's <MdOutlineRemoveDone />
    </Button>
  );
};

export default RemoveCompletedTasksButton;
