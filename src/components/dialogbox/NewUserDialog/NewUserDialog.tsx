import {
  Button,
  Dialog,
  Portal,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { setDialogBoxTypeClosed } from "../../../store/slices/detailsDialogSlice/detailsDialogSlice";
import {

  setUserPassword,
} from "../../../store/slices/loginSlice/thunks";
import PasswordForm from "../../Forms/PasswordForm";

import { IoMdArrowRoundForward } from "react-icons/io";
import { DialogProse } from "./DialogProse";
import { PasswordProse } from "./PasswordProse";
import { CreateNewUserButton } from "./CreateNewUserButton";
import "./NewUserDialog.scss";

interface FormValue {
  password: string;
}



const NewUserDialog = () => {
  const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
  const user = useSelector((state: RootState) => state.UserState);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<{ password: string }>();

  useEffect(() => {
    //hvis brugeren har lavet en ny bruger og er logget ind, så vis password formen
    if (user.loginState == "SUCCESS") {
      setShowPasswordForm(true);
    }
  });

  const onSubmitPassword = async (data: FormValue) => {
    // skal rettes så password ikke er i url
    dispatch(
      setUserPassword({ username: user.username, password: data.password })
    );
  };

  return (
    <Dialog.Root
      key={"sm"}
      size={"sm"}
      open={detailsDialog.dialogboxOpened}
      onOpenChange={() => {
        dispatch(setDialogBoxTypeClosed());
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="DialogHeader">
              <Dialog.Title></Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="NewUserDialogBody DialogBody">
              {!showPasswordForm && <DialogProse />}
              {!showPasswordForm && (
                <Flex className="ButtonArea">
                  <Button
                    variant="subtle"
                    onClick={() => dispatch(setDialogBoxTypeClosed())}
                    className="CancelDialogButton"
                  >
                    Fortryd
                  </Button>

                  <CreateNewUserButton />
                </Flex>
              )}
              {showPasswordForm && (
                <FormProvider {...methods}>
                  <PasswordProse />

                  <form onSubmit={methods.handleSubmit(onSubmitPassword)}>
                    <PasswordForm />
                  </form>

                  <Button
                    variant="subtle"
                    focusRing="none"
                    onClick={() => dispatch(setDialogBoxTypeClosed())}
                    className="GoToTaskPageButton"
                  >
                    Fortsæt uden <IoMdArrowRoundForward />
                  </Button>
                </FormProvider>
              )}
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NewUserDialog;
