import { useRef } from "react";
import { setTaskEditsLog } from "../store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {v4 as uuid} from 'uuid';
import { taskObject } from "../store/states/taskObjectState";

export default function useTaskChangeLogger(item: taskObject) {
        const loggedTask = useRef<taskObject>()
        const dispatch = useDispatch<AppDispatch>();

    const logChanges = () => {
        

        if (!loggedTask) return;
        
        //hvis der er sket en ændring, så log
        const hasChanged =
            loggedTask.current?.taskText !== item.taskText ||
            loggedTask.current?.taskCompleted !== item.taskCompleted ||
            loggedTask.current?.taskDeleted !== item.taskDeleted;
        if (hasChanged) {
            dispatch(setTaskEditsLog({uuid: item.uuid, taskEditsLog: {taskText: item.taskText, dateEdited: new Date, taskCompleted: item.taskCompleted, taskDeleted: item.taskDeleted, uuid: uuid()}}))
            logTask()
        }
    }
    const logTask = () => {
        loggedTask.current = {...item}
    }
    return {logTask, logChanges}
}


