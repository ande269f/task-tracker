import { UUIDTypes } from "uuid";
import axios from "../API/client";
import { TaskEdit } from "../store/slices/taskEditsSlice/taskEditsSlice";
import { taskDto, taskObject } from "../store/slices/taskSlice/taskSlice";
import { interactiveTaskOrder } from "../store/slices/taskOrderSlice/taskOrderSlice";

export interface UserTaskDataDto {
    tasks: taskDto[],
    sortTasks: interactiveTaskOrder[],
  }



export default class TaskDataHandler {


  static loadUserData = async () => {
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


  static unloadTasks = async (task: taskDto, userId: number | null) => {
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


  static loadtaskEdits = async (taskUuid: UUIDTypes) => {
    try {
      const response = await axios.get("data/loadTaskEdits/" + taskUuid);

      return response.data
    } catch (e) {
      console.log("loadtaskEdits failed " + e);
      return "ERROR";
    }
  }



  static unloadtaskEdit = async (taskEdits: TaskEdit) => {
    try {
      const response = await axios.post("data/unloadTaskEdit/", taskEdits);
      return response.data
    } catch (e) {
      console.log("loadtaskEdits failed " + e);
      return "ERROR";
    }
  }

  static updateTask = async (task: taskDto) => {
    try {
      const response = await axios.post("data/updateTask/", task);
      return response.data;
    } catch (e) {
      console.log("unload tasks failed " + e);
      return "ERROR";
    }
  }

  
  static updateTaskOrder = async (taskOrders: interactiveTaskOrder[]) => {
    try {
      const response = await axios.post("data/updateTaskOrder/", taskOrders);
      return response.data;
    } catch (e) {
      console.log("unload tasks failed " + e);
      return "ERROR";
    }
  }

    static deleteTasks = async (tasks: taskObject[]) => {
    try {
      const response = await axios.delete("data/deleteTasks/", {data: tasks});
      return response.data;
    } catch (e) {
      console.log("delete tasks failed " + e);
      return "ERROR";
    }
  }



  
}
