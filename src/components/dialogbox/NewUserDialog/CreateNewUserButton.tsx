import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { createNewUser } from "../../../store/slices/loginSlice/thunks";
import "./NewUserDialog.scss";

export const CreateNewUserButton = () => {
  const user = useSelector((state: RootState) => state.UserState);
  const dispatch = useDispatch<AppDispatch>();
  const handleCreateNewUser = async () => {
    if (user.username) dispatch(createNewUser({ username: user.username }));
  };
  return (
    <Button
      className="CreateNewUserButton"
      colorPalette={"green"}
      aria-label="create-new-user"
      onClick={(e) => {
        e.stopPropagation();
        handleCreateNewUser();
      }}
    >
      <FaPlus /> Opret bruger
    </Button>
  );
};
