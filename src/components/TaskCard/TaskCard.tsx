
import { Card,Grid, GridItem, Box } from "@chakra-ui/react";
import {
  setTaskCompleted,
} from "../../store/slices/taskSlice/taskSlice";
import { } from "react-redux";
import { useEffect } from "react";

import TaskCheckbox from "./TaskCardProps/TaskCheckbox";

import { TaskActionsDropdown } from "./TaskActionsDropdown/TaskActionsDropdown";
import EditTaskCardButton from "./TaskCardProps/EditTaskCardButton";
import TaskCardTextArea from "./TaskCardProps/TaskCardTextArea";

import { useTaskCardContext } from "../../hooks/taskCardContext";

const TaskCard = () => {
  const context = useTaskCardContext();
  if (!context) return null;


  useEffect(() => {
    context.logTaskEdit();
  }, [context.task.taskText, context.task.taskCompleted, context.task.taskDeleted]);

  const handleComplete = () => {
    if (context.isEditOff) {
      context.dispatch(
        setTaskCompleted({
          taskUuid: context.task.taskUuid,
          taskCompleted: !context.task.taskCompleted,
        })
      );
    }
  };

  if (context.task.taskDeleted) return null;

  return (
    <>
      <Box className="TaskCard">
          <Card.Root
            variant={context.task.taskCompleted ? "subtle" : "outline"}
            backgroundColor={context.task.taskCompleted ? "green.300" : "white"}
            onClick={() => {
              handleComplete();
            }}
          >
            <Card.Body>
              <Grid templateColumns="1fr auto" alignItems="center" gap={2}>
                <GridItem className="TaskCardTaskText">
                  <TaskCardTextArea />
                </GridItem>
                <GridItem height={"100%"}>
                  <TaskActionsDropdown />
                  <TaskCheckbox taskCompleted={context.task.taskCompleted} />
                </GridItem>
              </Grid>
            </Card.Body>
          </Card.Root>
        </Box>
        <EditTaskCardButton />
      </>
    );
  }


export default TaskCard;
