import { Button } from "@chakra-ui/react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { deleteTasksThunk } from "../../../../store/slices/taskSlice/thunks";
import "../DeleteHistoryDialogStyle.scss";



export const DeleteAllTasksPermanentlyButton = () => {
  const dispatch = useDispatch<AppDispatch>();
    const handleDeleteAllTasks = () => dispatch(deleteTasksThunk());
  return (
    <Button
      variant="subtle"
      colorPalette="grey"
      className="DeleteAllTasksPermanentlyButton"
      aria-label="Search database"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteAllTasks();
      }}
    >
      <MdOutlineDeleteSweep /> Tøm papirkurv
    </Button>
  );
};