import { Button, Group, Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { pushTask } from "../../store/slices/taskSlice/thunks";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { taskDto } from "../../store/slices/taskSlice/taskSlice";

const InputField = () => {
  const dispatch: AppDispatch = useDispatch();
  const [localInput, setLocalInput] = useState<string>("");
  const userState = useSelector((state: RootState) => state.UserState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      pushTask({
        task: {
          taskUuid: uuid(),
          taskText: localInput,
          taskCompleted: false,
          //fjerner timezone offset fra date objektet da det er drilsk
          taskCreated: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -1),

          taskDeleted: null,
        } as taskDto ,
        userId: userState.userId,
      })
    );
    setLocalInput("");
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
