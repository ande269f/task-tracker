import { taskObject } from "./taskObjectState";

export default interface DetailsDialogState {
    taskObject: taskObject | null;
    dialogboxOpened: boolean;
    dialogboxType: string | null;
};