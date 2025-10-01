
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { v4 as uuid } from "uuid";
import { taskObject, updateTask } from "../store/slices/taskSlice";
import { addTaskEdits, TaskEdits } from "../store/slices/taskEditsSlice";

export default function useTaskEditsLogger(task: taskObject) {
  const loggedTask = useRef<taskObject>({ ...task });
  const dispatch = useDispatch<AppDispatch>();

  const logTaskEdit = async () => {
    if (!loggedTask) return;

    //hvis der er sket en ændring, så log
    const hasChanged =
      loggedTask.current?.taskText !== task.taskText ||
      loggedTask.current?.taskCompleted !== task.taskCompleted ||
      loggedTask.current?.taskDeleted !== task.taskDeleted;
    if (hasChanged) {

      const taskEdit: TaskEdits = {
        taskText: task.taskText,
        dateEdited: new Date(),
        taskCompleted: task.taskCompleted,
        taskDeleted: task.taskDeleted,
        taskEditsUuid: uuid(),
        taskUuid: task.taskUuid,
      };
      // sender taskedit til backend og opdaterer redux state
      dispatch(addTaskEdits(taskEdit));

      // opdaterer selve tasken i backend
      dispatch(updateTask(task)); // <-- forstår ikke hvorfor det her virker

      // opdater loggedTask til den nyeste state
      logTask();
    }
  };
  const logTask = () => {
    loggedTask.current = { ...task };
  };
  return { logTaskEdit };
}
