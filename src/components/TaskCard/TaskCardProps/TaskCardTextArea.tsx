import { Textarea } from "@chakra-ui/react";
import { useTaskCardContext } from "../../../hooks/taskCardContext";
import { setTaskText } from "../../../store/slices/taskSlice/taskSlice";
import "../TaskCardStyles.scss";
const TaskCardTextArea = () => {
      const context = useTaskCardContext();
      if (!context) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => 
    context.dispatch(setTaskText({ uuid: context.task.taskUuid, taskText: e.target.value }));

  return (
    <Textarea
      id={context.task.taskUuid.toString()}
      size={"xl"}
      className="TaskCardInputField Input"
      wordBreak={"break-all"}
      whiteSpace={"pre-wrap"}
      focusRing="none"
      pointerEvents={context.isEditOff ? "none" : "all"}
      borderWidth={0}
      autoresize
      value={context.task.taskText}
      onChange={handleChange}
      ref={context.inputRef}
      onBlur={() => {
        context.logTaskEdit(); // log ændringen
        context.setIsEditOff(true); // slå edit-mode fra
      }} //håndtere logning af ændring i taskText anderledes end andre ændringer for at undgå hver nyt bogstav trigger en ny record
    />
  );
};

export default TaskCardTextArea;
