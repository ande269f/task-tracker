import { interactiveTaskOrder } from "./taskOrderSlice";


export const determineInteractiveOrderDirection = (sortDirection: boolean, sortTasks: interactiveTaskOrder[]): interactiveTaskOrder[] => {
    if (sortDirection) {
        return sortTasks.sort((a, b) => b.sortOrder - a.sortOrder);
    } else {
        return sortTasks.sort((a, b) => a.sortOrder - b.sortOrder);
    }
}