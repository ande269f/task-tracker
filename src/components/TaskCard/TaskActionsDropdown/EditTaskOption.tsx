import { Box, Menu,  } from "@chakra-ui/react";
import {  useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { useTaskCardContext } from "../../../hooks/taskCardContext";
import { TaskOptionStyling } from "./TaskActionsDropdown";
import "../TaskCardStyles.scss";

export const EditTaskOption = () => {
  const context = useTaskCardContext();

  const handleEdit = () => {
    if (!context) return;
    context.setIsEditOff(!context.isEditOff);
  };

  useEffect(() => {
    if (context)
      if (!context.isEditOff) {
        // Nu er textarea rendret og pointer-events = all
        requestAnimationFrame(() => {
          context.inputRef.current?.focus();
        });
      } else {
        context.inputRef.current?.blur();
      }
  }, [context?.isEditOff]);

  return (
    <>
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


    </>
  );
};
