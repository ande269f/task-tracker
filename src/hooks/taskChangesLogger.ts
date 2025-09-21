
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { v4 as uuid } from "uuid";
import { taskObject } from "../store/slices/taskSlice";
import TaskDataHandler from "../API/TaskDataHandler";
import { setTaskEdits, TaskEdits } from "../store/slices/taskEditsSlice";

export default function useTaskChangeLogger(task: taskObject) {
  const loggedTask = useRef<taskObject>({ ...task });
  const dispatch = useDispatch<AppDispatch>();
  const taskDataHandler = new TaskDataHandler();

  const logChanges = async () => {
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

      const response = await taskDataHandler.unloadtaskEdit(taskEdit);
      if (response == "SUCCESS") {
        const taskEdits = await taskDataHandler.loadtaskEdits(task.taskUuid);

        try {
          dispatch(setTaskEdits(taskEdits));
        } catch (e) {
          console.error("fejl ved dispatch af logchanges " + e);
        }
      }

      logTask();
    }
  };
  const logTask = () => {
    loggedTask.current = { ...task };
  };
  return { logTask, logChanges };
}
