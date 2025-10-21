import { IconButton } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { taskObject } from "../../../../store/slices/taskSlice/taskSlice";
import { deleteTaskThunk } from "../../../../store/slices/taskSlice/thunks";
import "../DeleteHistoryDialogStyle.scss";

export const DeleteTaskPermanentlyButton = ({task}: {task: taskObject}) => {
    const dispatch = useDispatch<AppDispatch>();



  const handleDelete = () => dispatch(deleteTaskThunk(task));
  return (
    <IconButton
      size="xs"
      colorPalette="red"
      aria-label="Search database"
      className="DeleteTaskPermanentlyButton"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
    >
      <MdDeleteForever />
    </IconButton>
  );
};