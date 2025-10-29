import { Textarea } from "@chakra-ui/react";
import { useTaskCardContext } from "../../../hooks/taskCardContext";
import { setTaskText } from "../../../store/slices/taskSlice/taskSlice";
import "../TaskCardStyles.scss";
import { useState } from "react";
const TaskCardTextArea = () => {
  
      const context = useTaskCardContext();
      if (!context) return null;
      const [localText, setLocalText] = useState<string>(context.task.taskText  );

  return (
    <Textarea
      id={context.task.taskUuid.toString()}
      size={"xl"}
      className="TaskCardInputField Input"
      wordBreak={"break-word"}
      whiteSpace={"pre-wrap"}
      focusRing="none"
      pointerEvents={context.isEditOff ? "none" : "all"}
      borderWidth={0}
      autoresize
      value={localText}
      onChange={(e) => setLocalText(e.target.value)}
      ref={context.inputRef}
      onBlur={() => {

        context.setIsEditOff(true); // slå edit-mode fra
        context.dispatch(setTaskText({ uuid: context.task.taskUuid, taskText: localText }));
        context.logTaskEdit(); // log ændringen
      }} //håndtere logning af ændring i taskText anderledes end andre ændringer for at undgå hver nyt bogstav trigger en ny record
    />
  );
};

export default TaskCardTextArea;
