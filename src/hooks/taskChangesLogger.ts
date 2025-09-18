import { useRef } from "react";
import { setTaskEditsLog } from "../store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { v4 as uuid } from 'uuid';
import { taskObject, taskEditsLog } from "../store/slices/taskSlice";
import TaskDataHandler from "../API/TaskDataHandler";

export default function useTaskChangeLogger(task: taskObject) {
    const loggedTask = useRef<taskObject>()
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

            const taskEditLog: taskEditsLog = {
                taskText: task.taskText,
                dateEdited: new Date,
                taskCompleted: task.taskCompleted,
                taskDeleted: task.taskDeleted,
                taskEditsUuid: task.taskUuid,
                taskUuid: uuid()
            }

            const taskEdit = await taskDataHandler.unloadtaskEdit(taskEditLog.taskUuid, taskEditLog)

            if (taskEdit == "SUCCESS") {
                dispatch(setTaskEditsLog({ taskUuid: taskEditLog.taskUuid, taskEditsLog: { taskText: taskEditLog.taskText, dateEdited: taskEditLog.dateEdited, taskCompleted: taskEditLog.taskCompleted, taskDeleted: taskEditLog.taskDeleted, taskEditsUuid: taskEditLog.taskUuid, taskUuid: taskEditLog.taskUuid } }))

            }

            logTask()
        }
    }
    const logTask = () => {
        loggedTask.current = { ...task }
    }
    return { logTask, logChanges }
}


