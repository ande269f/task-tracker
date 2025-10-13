import loginHandlers from "./loginHandlers";
import taskDataHandlers from "./taskDataHandlers";

export const handlers = [...loginHandlers, ...taskDataHandlers]