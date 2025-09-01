import TaskDetailsDialog from "./TaskDetailsDialog";
import DeleteHistoryDialog from "./DeleteHistoryDialog";
import {useSelector } from "react-redux";
import { RootState } from "../../store";




const DisplayDialog = () => {
    const detailsDialog = useSelector((state: RootState) => state.detailsOpener)

    const renderDialog = (dialogType: string | null): JSX.Element | undefined => {
        switch(dialogType) {
            case "taskDetailsDialog":
                return <TaskDetailsDialog />
            case "deleteHistoryDialog":
                return <DeleteHistoryDialog />
            default:
                return undefined
        }
    }

    return (
        renderDialog(detailsDialog.dialogboxType)
    )
}

export default DisplayDialog;