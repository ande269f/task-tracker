import { Button, Group, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setTextInput } from "../store/slices/taskSlice";
import { useState } from "react";
import { v4 as uuid, UUIDTypes } from "uuid";
import { toaster } from "./ui/toaster";
import TaskDataHandler, { taskDto } from "../API/TaskDataHandler";
import { taskObject } from "../store/slices/taskSlice";

const InputField = () => {
  const dispatch: AppDispatch = useDispatch();
  const [localInput, setLocalInput] = useState<string>("");
  const userInput = useSelector((state: RootState) => state.form);
  const userState = useSelector((state: RootState) => state.UserState);

  const duplicateDetected = (duplicateDetected: Boolean = false) => {
    userInput.tasks.forEach((element) => {
      if (element.taskText == localInput && element.taskDeleted === null) {
        duplicateDetected = true;
      }
    });
    return duplicateDetected;
  };

  // lav en matching der loader igennem alle states. hvis der er et match, smid en fejl
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //laver ny uuid til taskobjektet og sorteringslisten
    const newUuid: UUIDTypes = uuid();

    //opdatere taskObjekt og sortOrder
    const submitTask = async () => {
      const taskDataHandler = new TaskDataHandler();
      const task: taskDto = {
        taskUuid: newUuid,
        taskText: localInput,
        taskCompleted: false,
        taskCreated: new Date(),

        taskDeleted: null,
      };

      const response = await taskDataHandler.unloadTasks(task, userState.userId);

      if (response == "SUCCESS") {
        dispatch(
          setTextInput({
            taskText: task.taskText,
            taskCompleted: task.taskCompleted,
            taskCreated: task.taskCreated,
            taskUuid: task.taskUuid,
            taskDeleted: task.taskDeleted,
          })
        );
        setLocalInput("");
      } else {
        toaster.create({
          description: "Fejl. Opgaven kunne ikke gemmes! Der er gået noget galt med kontakt til serveren",
          type: "error"
        })
      }
    };

    if (localInput.trim() === "") {
    } else if (!duplicateDetected()) {
      submitTask();
    } else if (duplicateDetected()) {
      toaster.create({
        description: "Den indtastede task findes allerede",
        type: "warning",
      });
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group attached w="full" maxW="sm">
        <Input
          flex="1"
          id="textInput"
          value={localInput}
          placeholder="Indtast en todo"
          onChange={(e) => setLocalInput(e.target.value)}
        />
        <Button type="submit" bg="bg.subtle" variant="outline">
          Indsæt
        </Button>
      </Group>
    </form>
  );
};

export default InputField;
