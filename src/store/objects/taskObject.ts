import { UUIDTypes } from "uuid";


export interface taskEditsLog {
        dateEdited: Date;
        taskText: string;
        taskCompleted: boolean;
        taskDeleted: boolean;
        uuid: UUIDTypes;
    }

export interface taskObject {
    dateCreated: Date
    uuid: UUIDTypes;
    taskText: string;
    taskCompleted: boolean;
    taskDeleted: boolean;
    taskEditsLog: taskEditsLog[];
    manuelSortOrder: number
}