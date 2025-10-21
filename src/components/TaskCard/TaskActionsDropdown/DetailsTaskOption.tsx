import { Menu, Box } from "@chakra-ui/react";
import { CgDetailsMore } from "react-icons/cg";
import { setDetailsDialogState } from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { useTaskCardContext } from "../../../hooks/taskCardContext";
import { TaskOptionStyling } from "./TaskActionsDropdown";
import "../TaskCardStyles.scss";
export const DetailsTaskOption = () => {
  const { dispatch, task } = useTaskCardContext() as {
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
