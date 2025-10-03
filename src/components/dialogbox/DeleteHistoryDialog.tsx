import { Dialog, Button, Portal, CloseButton, Card, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice/detailsDialogSlice";
import TaskCheckbox from "../TaskCard/TaskCheckbox";
import { taskObject } from "../../store/slices/taskSlice/taskSlice";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { setTaskDeleted, deleteTask } from "../../store/slices/taskSlice/taskSlice";
import { MdDeleteForever, MdOutlineDeleteSweep } from "react-icons/md";
import { toaster } from "../ui/toaster";
import { deleteTasksThunk, deleteTaskThunk } from "../../store/slices/taskSlice/thunks";

const RestoreTaskButtonMaker = ({handleRestore}: {handleRestore: Function}) => {
    return (
        <IconButton aria-label="Edit Task" onClick={(e) => {e.stopPropagation(); handleRestore();}}>
            <FaArrowRotateLeft />
        </IconButton>
    )
}

const DeleteTaskPermanentlyButtonMaker = ({handleDelete}: {handleDelete: Function}) => {
    return (
        <IconButton aria-label="Search database" onClick={(e) => {e.stopPropagation(); handleDelete();}}>
            <MdDeleteForever />
        </IconButton>
    )
}

const DeleteAllTasksPermanentlyButtonMaker = ({handleDelete}: {handleDelete: Function}) => {
    return (
        <Button aria-label="Search database" onClick={(e) => {e.stopPropagation(); handleDelete();}}>
            <MdOutlineDeleteSweep /> Ryd papirkurv
        </Button>
    )
}


const DeletedTask = ({ task }: { task: taskObject }) => {
    const dispatch = useDispatch<AppDispatch>()

    const handleRestore = () => 
      dispatch(setTaskDeleted({uuid: task.taskUuid, taskDeleted: null}))

    const handleDelete = () => 
      dispatch(deleteTaskThunk(task))


  return (
    <div>
      <Dialog.Description> {task.taskDeleted?.toLocaleString('en-UK')} </Dialog.Description>
      <Card.Root>
        <Card.Header />
        <Card.Body>
          <Card.Description>
            <input value={task.taskText} readOnly={true} />
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <TaskCheckbox taskCompleted={task.taskCompleted} />
          <RestoreTaskButtonMaker handleRestore={handleRestore} />
          <DeleteTaskPermanentlyButtonMaker handleDelete={handleDelete}/>



        </Card.Footer>
      </Card.Root>
    </div>
  );
};

const DisplayDeletedTasks = ({ tasks }: { tasks: taskObject[] | null }) => {
  if (tasks)
    return (
      //printer alle slettede inputs
      tasks.map((task) => (
        <div key={task.taskUuid.toString()}>
          {" "}
          {(task.taskDeleted) ? <DeletedTask task={task} /> : null}
        </div>
      ))
    );
};


const DeleteHistoryDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener)
  const tasks = useSelector((state: RootState) => state.form)
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteAllTasks = () => {
    tasks.tasks.forEach(task => {
      if (task.taskDeleted) {
        dispatch(deleteTasksThunk())

      }

    })

    toaster.create({
      description: "Papirkurven er ryddet",
      type: "success",
    })
  }



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
            <Dialog.Header>
              <Dialog.Title>Slettede To-do's</Dialog.Title>
              
            </Dialog.Header>
            
            <Dialog.Body>
              <DeleteAllTasksPermanentlyButtonMaker handleDelete={handleDeleteAllTasks}/>
              <DisplayDeletedTasks tasks={tasks.tasks} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteHistoryDialog;