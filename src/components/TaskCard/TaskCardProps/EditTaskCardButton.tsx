import { Button } from "@chakra-ui/react";
import { useTaskCardContext } from "../../../hooks/taskCardContext";
import "../TaskCardStyles.scss";
const EditTaskCardButton = () => {
  const context = useTaskCardContext();
  if (!context) return null;

  if (context.isEditOff) {
    return null;
  }

  return (
    <Button
      className="TextEditButton"
      animationName=" fade-in"
      animationDuration="0.5s"
      position="absolute"
      padding={"0.5rem"}
      zIndex={11} //så den rent visuelt ikke bliver påvirket at elementer under den
      colorPalette={"green"}
    >
      Gem ændringer
    </Button>
  );
};

export default EditTaskCardButton;
