import { http, HttpResponse } from "msw";
import { v4 as uuid, UUIDTypes } from "uuid";
import { UserTaskDataDto } from "../../API/TaskDataHandler";
import { TaskEdit } from "../../store/slices/taskEditsSlice/taskEditsSlice";
import { interactiveTaskOrder } from "../../store/slices/taskOrderSlice/taskOrderSlice";
import { taskObject } from "../../store/slices/taskSlice/taskSlice";

const task1Uuid: UUIDTypes = uuid();
const task2Uuid: UUIDTypes = uuid();
const task3Uuid: UUIDTypes = uuid();
const taskEdit1Uuid: UUIDTypes = uuid();
const taskEdit2Uuid: UUIDTypes = uuid();
const taskEdit3Uuid: UUIDTypes = uuid();
// Mock database
let tasks: taskObject[] = [
    {
        taskCreated: new Date(),
        taskUuid: task1Uuid,
        taskText: "Demo task 1",
        taskCompleted: false,
        taskDeleted: null,
    },
    {
        taskCreated: new Date(),
        taskUuid: task2Uuid,
        taskText: "Demo task 2",
        taskCompleted: true,
        taskDeleted: null,
    },
    {
        taskCreated: new Date(),
        taskUuid: task3Uuid,
        taskText: "Demo task 3",
        taskCompleted: true,
        taskDeleted: new Date(),
    },

];

let taskEdits: TaskEdit[] = [
    {
        dateEdited: new Date(),
        taskText: "Demo task 1",
        taskCompleted: false,
        taskDeleted: null,
        taskEditsUuid: taskEdit1Uuid,
        taskUuid: task1Uuid,
    },
        {
        dateEdited: new Date(),
        taskText: "Demo task 1",
        taskCompleted: true,
        taskDeleted: null,
        taskEditsUuid: taskEdit2Uuid,
        taskUuid: task1Uuid,
    },

        {
        dateEdited: new Date(),
        taskText: "Demo task 4",
        taskCompleted: false,
        taskDeleted: null,
        taskEditsUuid: taskEdit3Uuid,
        taskUuid: task1Uuid,
    },

]

let taskOrders: interactiveTaskOrder[] = tasks.map((t, i) => ({
    sortOrder: i,
    uuid: t.taskUuid,
}));

// --- Handlers ---
const taskDataHandlers = [

    // --- loadUserData ---
    http.get("*/data/loadUserData/", () => {
        const response: UserTaskDataDto = {
            tasks: tasks.map(t => ({
                taskUuid: t.taskUuid,
                taskText: t.taskText,
                taskCompleted: t.taskCompleted,
                taskDeleted: t.taskDeleted ? t.taskDeleted.toISOString() : null,
                taskCreated: t.taskCreated.toISOString(),
            })),
            sortTasks: taskOrders,
        };
        return HttpResponse.json(response);
    }),

    // --- unloadTasks ---
    http.post("*/data/unloadTask/:userId", async () => {
        // const task: taskDto = await request.json();
        // const userId = request.params.userId;

        // const newTask: taskObject = {
        //     taskCreated: new Date(task.taskCreated),
        //     taskUuid: task.taskUuid,
        //     taskText: task.taskText,s
        //     taskCompleted: task.taskCompleted,
        //     taskDeleted: task.taskDeleted ? new Date(task.taskDeleted) : null,
        // };

        // tasks.push(newTask);
        // taskOrders.push({ sortOrder: taskOrders.length, uuid: newTask.taskUuid });

        return HttpResponse.json({ status: "SUCCESS" });
    }),

    // --- loadTaskEdits ---
    http.get("*/data/loadTaskEdits/:taskUuid", () => {
        return HttpResponse.json(taskEdits);
    }),

    // --- unloadTaskEdit ---
    http.post("*/data/unloadTaskEdit/", async () => {
        return HttpResponse.json("SUCCESS");
    }),

    // --- updateTask ---
    http.post("*/data/updateTask/", async () => {
        // const taskUpdate: taskDto = await request.json();
        // const taskIndex = tasks.findIndex(t => t.taskUuid === taskUpdate.taskUuid);
        // if (taskIndex >= 0) {
        //     tasks[taskIndex] = {
        //         ...tasks[taskIndex],
        //         taskText: taskUpdate.taskText,
        //         taskCompleted: taskUpdate.taskCompleted,
        //         taskDeleted: taskUpdate.taskDeleted ? new Date(taskUpdate.taskDeleted) : null,
        //     };
        //     return HttpResponse.json({ status: "SUCCESS" });
        // }
        // return HttpResponse.json({ status: "ERROR" });
        return HttpResponse.json({ status: "SUCCESS" });
    }),

    // --- updateTaskOrder ---
    http.post("*/data/updateTaskOrder/", async () => {
        // const newOrders: interactiveTaskOrder[] = await request.json();
        // taskOrders = newOrders;
        return HttpResponse.json({ status: "SUCCESS" });
    }),

    // --- deleteTasks ---
    http.delete("*/data/deleteTasks/", async () => {
        // const deletedTasks: taskObject[] = (await request.json()) as taskObject[];
        // deletedTasks.forEach(d => {
        //     const idx = tasks.findIndex(t => t.taskUuid === d.taskUuid);
        //     if (idx >= 0) tasks.splice(idx, 1);

        //     const orderIdx = taskOrders.findIndex(o => o.uuid === d.taskUuid);
        //     if (orderIdx >= 0) taskOrders.splice(orderIdx, 1);

        //     delete taskEdits[d.taskUuid];
        // });
        return HttpResponse.json({ status: "SUCCESS" });
    }),
];

export default taskDataHandlers;
