import { Box, Menu } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { setTaskDeleted } from "../../../store/slices/taskSlice/taskSlice";
import { useTaskCardContext } from "../../../hooks/taskCardContext";
import { TaskOptionStyling } from "./TaskActionsDropdown";
import "../TaskCardStyles.scss";

export const DeleteTaskOption = () => {
  const { dispatch, task } = useTaskCardContext() as { dispatch: any; task: any };


  return (
    <Menu.Item  {...TaskOptionStyling} color= "red.500"
      value="deleteTask"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setTaskDeleted({ uuid: task.taskUuid, taskDeleted: new Date() }));
      }}
    >
      <MdDelete />
      <Box> Slet</Box>
    </Menu.Item>
  );
};
