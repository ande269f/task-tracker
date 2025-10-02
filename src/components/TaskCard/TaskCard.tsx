import { AppDispatch, RootState } from "../../store";
import { Card, IconButton, Button } from "@chakra-ui/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import {
  setTaskDeleted,
  setTaskCompleted,
  setTaskText
} from "../../store/slices/taskSlice/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { DetailsButton } from "./DetailsButton";
import useTaskEditsLogger from "../../hooks/taskChangesLogger";
import TaskCheckbox from "./TaskCheckbox";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { taskObject } from "../../store/slices/taskSlice/taskSlice";

const DeleteButton = ({ handleDelete }: { handleDelete: Function }) => {
  return (
    <IconButton
      aria-label="Search database"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
    >
      <MdDelete />
    </IconButton>
  );
};

const EditTaskButton = ({ handleEdit }: { handleEdit: Function }) => {
  return (
    <IconButton
      aria-label="Edit Task"
      onClick={(e) => {
        e.stopPropagation();
        handleEdit();
      }}
    >
      <MdModeEdit />
    </IconButton>
  );
};

const TaskCard = ({ task }: { task: taskObject }) => {
  const { logTaskEdit } = useTaskEditsLogger(task);

  useEffect(() => {
    // kører første gang taskcard renderes, så derefter hver gang text complete eller delete ændrer sig
    logTaskEdit();
  }, [task.taskText, task.taskCompleted, task.taskDeleted]);

  const [isEditOff, setIsEditOff] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(setTaskDeleted({ uuid: task.taskUuid, taskDeleted: new Date() }));
  };

  const handleComplete = () => {
    if (isEditOff) {
      dispatch(
        setTaskCompleted({
          taskUuid: task.taskUuid,
          taskCompleted: !task.taskCompleted,
        })
      );
    }
  };
  const handleEdit = () => {
    setIsEditOff(!isEditOff);
    isEditOff ? inputRef.current?.focus() : inputRef.current?.blur();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTaskText({ uuid: task.taskUuid, taskText: e.target.value }));
  };

  const showDialogBox = () => {
    dispatch(
      setDetailsDialogState({
        taskObject: task,
        dialogboxOpened: true,
        dialogboxType: "taskDetailsDialog",
      })
    );
  };

  if (!task.taskDeleted) {
    return (
      <div>
        <Card.Root
          onClick={() => {
            handleComplete();
          }}
        >
          <Card.Header />
          <Card.Body>
            <Card.Description>
              <input
                value={task.taskText}
                onChange={handleChange}
                readOnly={isEditOff}
                ref={inputRef}
                onBlur={logTaskEdit} //håndtere logning af ændring i taskText anderledes end andre ændringer for at undgå hver nyt bogstav trigger en ny record
              />
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <EditTaskButton handleEdit={handleEdit} />
            <TaskCheckbox taskCompleted={task.taskCompleted} />
            <DeleteButton handleDelete={handleDelete} />
            <DetailsButton handleDetailsButton={showDialogBox} />
          </Card.Footer>
        </Card.Root>
      </div>
    );
  }
};

export default TaskCard;