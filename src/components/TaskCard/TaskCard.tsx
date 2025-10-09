import { AppDispatch } from "../../store";
import { Card, Button, Textarea, Grid, GridItem, Box } from "@chakra-ui/react";
import {
  setTaskCompleted,
  setTaskText,
} from "../../store/slices/taskSlice/taskSlice";
import { useDispatch } from "react-redux";
import {
  useState,
  useRef,
  useEffect,
  createContext,
} from "react";
import useTaskEditsLogger from "../../hooks/taskChangesLogger";
import TaskCheckbox from "./TaskCheckbox";
import { taskObject } from "../../store/slices/taskSlice/taskSlice";
import { TaskActionsDropdown } from "./TaskActionsDropdown/TaskActionsDropdown";

type TaskCardContextType = {
  dispatch?: AppDispatch;
  isEditOff: boolean;
  setIsEditOff: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  task?: taskObject;
};

export const TaskCardContext = createContext<TaskCardContextType | undefined>(
  undefined
);

const TaskCard = ({ task }: { task: taskObject }) => {
  const { logTaskEdit } = useTaskEditsLogger(task);
  const [isEditOff, setIsEditOff] = useState<boolean>(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // kører første gang taskcard renderes,
    // så derefter hver gang text complete eller delete ændrer sig
    logTaskEdit();
  }, [task.taskText, task.taskCompleted, task.taskDeleted]);

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setTaskText({ uuid: task.taskUuid, taskText: e.target.value }));
  };

  if (!task.taskDeleted) {
    return (
      <TaskCardContext.Provider
        value={{
          dispatch,
          isEditOff,
          setIsEditOff,
          inputRef,
          task,
        }}
      >
        <Box className="TaskCard">
          <Card.Root
            variant={task.taskCompleted ? "subtle" : "outline"}
            backgroundColor={task.taskCompleted ? "green.300" : "white"}
            onClick={() => {
              handleComplete();
            }}
          >
            <Card.Header />
            <Card.Body>
              <Grid templateColumns="1fr auto" alignItems="center" gap={2}>
                <GridItem className="TaskCardTaskText">
                  <Textarea
                    id={task.taskUuid.toString()}
                    size={"xl"}
                    className="TaskCardInputField Input"
                    focusRing="none"
                    pointerEvents={isEditOff ? "none" : "all"}
                    borderWidth={0}
                    autoresize
                    value={task.taskText}
                    onChange={handleChange}
                    ref={inputRef}
                    onBlur={() => {
                      logTaskEdit(); // log ændringen
                      setIsEditOff(true); // slå edit-mode fra
                    }} //håndtere logning af ændring i taskText anderledes end andre ændringer for at undgå hver nyt bogstav trigger en ny record
                  />
                </GridItem>
                <GridItem height={"100%"}>
                  <TaskActionsDropdown />
                  <TaskCheckbox taskCompleted={task.taskCompleted} />
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>
        </Box>

        {!isEditOff && (
          <Button className="TextEditButton"
          animationName=" fade-in" 
          animationDuration="0.5s"
          position="absolute"
          padding={"0.5rem"}
          zIndex={11} //så den rent visuelt ikke bliver påvirket at elementer under den
          colorPalette={"green"}
          >
            Gem ændringer
          </Button>
        )}
      </TaskCardContext.Provider>
    );
  }
};

export default TaskCard;
