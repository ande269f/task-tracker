import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Card,
  IconButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDetailsDialogState, setDialogBoxTypeClosed } from "../../store/slices/detailsDialogSlice/detailsDialogSlice";
import TaskCheckbox from "../TaskCard/TaskCardProps/TaskCheckbox";
import { taskObject } from "../../store/slices/taskSlice/taskSlice";
import { FaArrowRotateLeft } from "react-icons/fa6";
import {
  setTaskDeleted,
  deleteTask,
} from "../../store/slices/taskSlice/taskSlice";
import { MdDeleteForever, MdOutlineDeleteSweep } from "react-icons/md";
import { toaster } from "../ui/toaster";
import {
  deleteTasksThunk,
  deleteTaskThunk,
} from "../../store/slices/taskSlice/thunks";
import "./DeleteHistoryDialogStyle.scss";
import { useEffect, useState } from "react";
import EmptyDataState from "../EmptyDataState/EmptyDataState";
import { BsTrash2 } from "react-icons/bs";

const RestoreTaskButton = ({ handleRestore }: { handleRestore: Function }) => {
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

const DeleteTaskPermanentlyButton = ({
  handleDelete,
}: {
  handleDelete: Function;
}) => {
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

const DeleteAllTasksPermanentlyButton = ({
  handleDelete,
}: {
  handleDelete: Function;
}) => {
  return (
    <Button
      variant="subtle"
      colorPalette="grey"
      className="DeleteAllTasksPermanentlyButton"
      aria-label="Search database"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
    >
      <MdOutlineDeleteSweep /> Tøm papirkurv
    </Button>
  );
};

const DeletedTask = ({ task }: { task: taskObject }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRestore = () =>
    dispatch(setTaskDeleted({ uuid: task.taskUuid, taskDeleted: null }));

  const handleDelete = () => dispatch(deleteTaskThunk(task));

  return (
    <>
      <Dialog.Description>
        {task.taskDeleted?.toLocaleString("en-UK")}
      </Dialog.Description>

      <Flex direction="row">
        <Card.Root
          width="100%"
          variant={task.taskCompleted ? "subtle" : "outline"}
          backgroundColor={task.taskCompleted ? "green.300" : "white"}
        >
          <Card.Header />
          <Card.Body>
            <Card.Description className="TaskCardPlainText">
              {task.taskText}
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <TaskCheckbox taskCompleted={task.taskCompleted} />
          </Card.Footer>
        </Card.Root>

        <Flex className="ButtonArea" direction="column">
          <RestoreTaskButton handleRestore={handleRestore} />
          <DeleteTaskPermanentlyButton handleDelete={handleDelete} />
        </Flex>
      </Flex>
    </>
  );
};

const DisplayDeletedTasks = ({ tasks }: { tasks: taskObject[] | null }) => {
  if (tasks)
    return (
      //printer alle slettede inputs
      tasks.map((task) => (
        <div key={task.taskUuid.toString()} className="DeletedTaskContainer">
          {task.taskDeleted ? <DeletedTask task={task} /> : null}
        </div>
      ))
    );
};

const DeleteHistoryDialog = () => {
  const [showPlaceholderBox, setShowPlaceholderBox] = useState<boolean>(false);
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const tasks = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // find alle tasks der er slettet
    const deletedTasks = tasks.tasks.filter((task) => task.taskDeleted != null);
    //hvis der ikke er nogen, vis PlaceholderBox
    setShowPlaceholderBox(deletedTasks.length == 0);
  }, [tasks.tasks]);

  const handleDeleteAllTasks = () => dispatch(deleteTasksThunk());

  return (
    <Dialog.Root
      key={"sm"}
      size={"sm"}
      open={detailsDialog.dialogboxOpened}
      onOpenChange={() =>
        dispatch(
          setDetailsDialogState({
            taskObject: detailsDialog.taskObject,
            dialogboxOpened: false,
            dialogboxType: "deleteHistoryDialog",
          })
        )
      }
    >
      <Dialog.Trigger asChild>
        <Button style={{ display: "none" }}></Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="DeleteHistoryDialogHeader DialogHeader">
              <Dialog.Title>To-do papirkurv</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="DeleteHistoryDialogBody DialogBody">
              <Box className="UpperCardArea">
                <DeleteAllTasksPermanentlyButton
                  handleDelete={handleDeleteAllTasks}
                />
              </Box>
              <Box className="LowerCardArea">
                {showPlaceholderBox ? (
                  <EmptyDataState
                    icon={<BsTrash2 />}
                    text={"Papirkurven er tom"}
                  />
                ) : (
                  <DisplayDeletedTasks tasks={tasks.tasks} />
                )}
              </Box>
            </Dialog.Body>

            <Dialog.Footer>

                <Button variant="subtle" focusRing="none" onClick={(e) => dispatch(setDialogBoxTypeClosed())} className="CancelDialogButton">
                  Cancel
                </Button>

            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xl" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteHistoryDialog;
