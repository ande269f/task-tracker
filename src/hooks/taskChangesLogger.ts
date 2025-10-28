import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { v4 as uuid } from "uuid";
import { updateTask } from "../store/slices/taskSlice/thunks";
import { taskObject } from "../store/slices/taskSlice/taskSlice";
import { pushTaskEdit } from "../store/slices/taskEditsSlice/thunks";
import { TaskEdits } from "../store/slices/taskEditsSlice/taskEditsSlice";

export default function useTaskEditsLogger(task: taskObject) {
  const loggedTask = useRef<taskObject>({ ...task });
  const dispatch = useDispatch<AppDispatch>();

  const logTaskEdit = async () => {
    const prev = loggedTask.current;
    if (!prev) return;

    // Find ændringstype
    const updateType =
      task.taskDeleted !== prev.taskDeleted && task.taskDeleted === null
        ? "RESTORE"
        : task.taskDeleted !== prev.taskDeleted && task.taskDeleted !== null
        ? "DELETE"
        : task.taskCompleted !== prev.taskCompleted
        ? "COMPLETE"
        : task.taskText !== prev.taskText
        ? "UPDATE"
        : null;

    if (!updateType) return;

    const taskEdit: TaskEdits = {
      taskText: task.taskText,
      dateEdited: new Date(),
      taskCompleted: task.taskCompleted,
      taskDeleted: task.taskDeleted,
      taskEditsUuid: uuid(),
      taskUuid: task.taskUuid,
    };
    // sender taskedit til backend og opdaterer redux state
    dispatch(pushTaskEdit(taskEdit));

    // opdaterer selve tasken i backend
    dispatch(updateTask({ task, updateType })); // <-- forstår ikke hvorfor det her virker

    // opdater loggedTask til den nyeste state
    logTask();
  };
  const logTask = () => {
    loggedTask.current = { ...task };
  };
  return { logTaskEdit };
}
