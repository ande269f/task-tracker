import { useRef } from "react";
import { setTaskEditsLog, taskObject } from "../store/slices/textInputSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {v4 as uuid} from 'uuid';

export default function useTaskChangeLogger(item: taskObject) {
        const loggedTask = useRef<taskObject>()
        const dispatch = useDispatch<AppDispatch>();

    const logChanges = () => {
        
        //console.log("logChanges()")

        if (!loggedTask) return;
        
        //hvis der er sket en ændring, så log
        const hasChanged =
            loggedTask.current?.taskText !== item.taskText ||
            loggedTask.current?.taskCompleted !== item.taskCompleted ||
            loggedTask.current?.taskDeleted !== item.taskDeleted;
        if (hasChanged) {
            //console.log("item: ")
            //console.log(item)
            //console.log("loggedTask: ")
            //console.log(loggedTask)
            dispatch(setTaskEditsLog({uuid: item.uuid, taskEditsLog: {taskText: item.taskText, dateEdited: new Date, taskCompleted: item.taskCompleted, taskDeleted: item.taskDeleted, uuid: uuid()}}))
            logTask()
        }
    }
    const logTask = () => {
        //console.log("logTask()")
        loggedTask.current = {...item}

    }
    return {logTask, logChanges}
}


