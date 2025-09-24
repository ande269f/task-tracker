import { UUIDTypes } from "uuid";
import axios from "../API/client";
import { TaskEdits } from "../store/slices/taskEditsSlice";
import { taskObject } from "../store/slices/taskSlice";
import { interactiveTaskOrder } from "../store/slices/interactiveTaskOrderSlice";

export interface taskDto {
  taskUuid: UUIDTypes;
  taskText: string;
  taskCompleted: boolean;
  taskDeleted: Date | null;
  taskCreated: Date;
}


export interface UserTaskDataDto {
    tasks: taskObject[],
    sortTasks: interactiveTaskOrder[],
  }



export default class TaskDataHandler {


  loadUserData = async () => {
    try {
      const response = await axios.get("data/loadUserData/");

      const userTaskData = response.data as UserTaskDataDto;

      console.assert(
      userTaskData.tasks.length === userTaskData.sortTasks.length,
      "Tasks og sortTasks er ikke samme længde!"
    );

      return userTaskData

    } catch (e) {
      console.log("load user data failed " + e);
      return "ERROR";
    }
  }


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



  unloadtaskEdit = async (taskEdits: TaskEdits) => {
    try {
      const response = await axios.post("data/unloadTaskEdit/", taskEdits);
      return response.data
    } catch (e) {
      console.log("loadtaskEdits failed " + e);
      return "ERROR";
    }
  }

  updateTask = async (task: taskDto) => {
    try {
      const response = await axios.post("data/updateTask/", task);
      return response.data;
    } catch (e) {
      console.log("unload tasks failed " + e);
      return "ERROR";
    }
  }

  
  updateTaskOrder = async (taskOrders: interactiveTaskOrder[]) => {
    try {
      const response = await axios.post("data/updateTaskOrder/", taskOrders);
      return response.data;
    } catch (e) {
      console.log("unload tasks failed " + e);
      return "ERROR";
    }
  }

    deleteTasks = async (tasks: taskObject[]) => {
    try {
      const response = await axios.delete("data/deleteTasks/", {data: tasks});
      return response.data;
    } catch (e) {
      console.log("delete tasks failed " + e);
      return "ERROR";
    }
  }



  
}
