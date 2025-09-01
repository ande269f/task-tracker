import { Dialog, Button, Portal } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice";

type dialogboxContent = {
    Content: React.ComponentType
}

const Dialogbox = ({Content}: dialogboxContent) => {
    const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
    const dispatch = useDispatch<AppDispatch>();

    

    return (
        <Dialog.Root  key={"sm"} size={"sm"} open={detailsDialog.dialogboxOpened} onOpenChange={() => dispatch(setDetailsDialogState({taskObject: detailsDialog.taskObject, dialogboxOpened: false, dialogboxType: null}))}>
                    <Dialog.Trigger asChild>
                        <Button style={{ display: "none" }}>
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Content/>
                        </Dialog.Content>
                    </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
    )
}

export default Dialogbox;