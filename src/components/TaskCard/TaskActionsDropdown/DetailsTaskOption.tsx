import { Menu, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { setDetailsDialogState } from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { TaskCardContext } from "../TaskCard";
import { useTaskOptionData } from "../../../hooks/taskOptionData";
import { TaskOptionStyling } from "./TaskActionsDropdown";

export const DetailsTaskOption = () => {
  const { dispatch, task } = useTaskOptionData() as {
    dispatch: any;
    task: any;
  };

  return (
    <Menu.Item {...TaskOptionStyling}
      value="detailsTask"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          setDetailsDialogState({
            taskObject: task,
            dialogboxOpened: true,
            dialogboxType: "taskDetailsDialog",
          })
        );
      }}
    >
      <CgDetailsMore />
      <Box>Detaljer</Box>
    </Menu.Item>
  );
};
