import { Checkbox } from "@chakra-ui/react";

const removeBackground = {
  border: "none",
  bg: "transparent",
};

const centerCheckbox = {
  position: "absolute",
  top: "50%",
  right: "20px",
  transform: "translateY(-50%)",
};

const TaskCheckbox = ({ taskCompleted }: { taskCompleted: boolean }) => {
  return (
    <Checkbox.Root
      {...centerCheckbox}
      readOnly
      checked={taskCompleted}
      variant={"subtle"}
    >
      <Checkbox.Control {...removeBackground}>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label />
    </Checkbox.Root>
  );
};

export default TaskCheckbox;
