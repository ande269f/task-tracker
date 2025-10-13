import { Box, IconButton, Menu } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { TaskCardContext } from "../TaskCard"; // Importér din context
import { useTaskOptionData } from "../../../hooks/taskOptionData";
import { TaskOptionStyling } from "./TaskActionsDropdown";

export const EditTaskOption = () => {
  const constext = useTaskOptionData();

  const handleEdit = () => {
    if (!constext) return;
    constext.setIsEditOff(!constext.isEditOff);
  };

    useEffect(() => {
      if (constext)
      if (!constext.isEditOff) {
        // Nu er textarea rendret og pointer-events = all
        requestAnimationFrame(() => {
          constext.inputRef.current?.focus();
        });
      } else {
        constext.inputRef.current?.blur();
      }
    }, [constext?.isEditOff]);

  return (
    <Menu.Item
      {...TaskOptionStyling}
      value="editTask"
      onClick={(e) => {
        e.stopPropagation();
        handleEdit();
      }}
    >
      <MdModeEdit />
      <Box>Redigér</Box>
    </Menu.Item>
  );
};
