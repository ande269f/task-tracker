import { UUIDTypes } from "uuid";
import axios from "../API/client";
import { setTaskEditsLog, taskEditsLog } from "../store/slices/taskSlice";

export interface taskDto {
  taskUuid: UUIDTypes;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
  taskCreated: Date;
}


export default class TaskDataHandler {
  unloadTasks = async (task: taskDto, userId: number | null) => {
    try {
      const token = localStorage.getItem("jwt") as string;
      if (typeof token != "string" && userId != null) {
        console.log(
          "token eksistere ikke eller er invalid - ellers så er iserId null"
        );
        return "ERROR";
      }

      const response = await axios.post("data/unloadTask/" + userId, task);
      return response.data;
    } catch (e) {
      console.log("unload tasks failed " + e);
      return "ERROR";
    }
  };

  loadTasks = async () => {
    try {
      const tasks = await axios.get("data/loadTasks/");
      return tasks.data
    } catch (e) {
      console.log("load tasks failed " + e);
      return "ERROR";
    }
  }

  loadtaskEdits = async (taskUuid: UUIDTypes) => {
    try {
      const taskEdits = await axios.get("data/loadTaskEdits/" + taskUuid);
      return taskEdits.data
    } catch (e) {
      console.log("loadtaskEdits failed " + e);
      return "ERROR";
    }
  }

  unloadtaskEdit = async (taskEdits: taskEditsLog) => {
    try {
      const response = await axios.post("data/unloadTaskEdit/", taskEdits);
      return response.data
    } catch (e) {
      console.log("loadtaskEdits failed " + e);
      return "ERROR";
    }
  }

  
}
