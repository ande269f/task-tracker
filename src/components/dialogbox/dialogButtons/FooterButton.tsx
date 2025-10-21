import { Button } from "@chakra-ui/react";
import { setDialogBoxTypeClosed } from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { useDispatch } from "react-redux";
import "./dialogButtonsStyle.scss";
export const FooterButton = () => {
  const dispatch = useDispatch();
  return (
      <Button
        variant="subtle"
        focusRing="none"
        onClick={() => dispatch(setDialogBoxTypeClosed())}
        className="CancelDialogButton"
      >
        Cancel
      </Button>
  );
};
