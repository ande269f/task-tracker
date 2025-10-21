import { IconButton } from "@chakra-ui/react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { UUIDTypes } from "uuid";
import { AppDispatch } from "../../../../store";
import { setTaskDeleted } from "../../../../store/slices/taskSlice/taskSlice";
import "../DeleteHistoryDialogStyle.scss";

export const RestoreTaskButton = ({taskUuid}: {taskUuid: UUIDTypes}) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRestore = () =>
    dispatch(setTaskDeleted({ uuid: taskUuid, taskDeleted: null }));

  return (
    <IconButton
      size="xs"
      backgroundColor="green.600"
      className="RestoreTaskButton"
      aria-label="Edit Task"
      onClick={(e) => {
        e.stopPropagation();
        handleRestore();
      }}
    >
      <FaArrowRotateLeft />
    </IconButton>
  );
};