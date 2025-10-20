import { Button, Group, Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { pushTask } from "../store/slices/taskSlice/thunks";
import { useState } from "react";
import { v4 as uuid, UUIDTypes } from "uuid";
import { toaster } from "./ui/toaster";
import { taskDto } from "../store/slices/taskSlice/taskSlice";

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
      const task: taskDto = {
        taskUuid: newUuid,
        taskText: localInput,
        taskCompleted: false,
        //fjerner timezone offset fra date objektet da det er drilsk
        taskCreated: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, -1),

        taskDeleted: null,
      };

      dispatch(pushTask({ task: task, userId: userState.userId }));
      setLocalInput("");

      // toaster.create({
      //   description: "Fejl. Opgaven kunne ikke gemmes! Der er gået noget galt med kontakt til serveren",
      //   type: "error"
      // })
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
    <div id="InputForm">
      <form onSubmit={handleSubmit}>
        <Group attached w="full">
          <Textarea
            id="InputField"
            value={localInput}
            placeholder="Indtast en todo"
            autoresize
            variant={"subtle"}
            onChange={(e) => setLocalInput(e.target.value)}
            rows={1}
          />
          <Button
            type="submit"
            id="SubmitButton"
            bg="bg.subtle"
            rounded={"md"}
            variant="outline"
            backgroundColor="gray.200"
          >
            Opret
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default InputField;
