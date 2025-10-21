import TaskDetailsDialog from "./TaskDetailsDialog/TaskDetailsDialog";
import DeleteHistoryDialog from "./DeleteHistoryDialog/DeleteHistoryDialog";
import {useSelector } from "react-redux";
import { RootState } from "../../store";
import NewUserDialog from "./NewUserDialog/NewUserDialog";
import "./DialogBox.scss"

const DisplayDialog = () => {
    const detailsDialog = useSelector((state: RootState) => state.detailsOpener)

    const renderDialog = (dialogType: string | null): JSX.Element | undefined => {
        switch(dialogType) {
            case "taskDetailsDialog":
                return <TaskDetailsDialog />
            case "deleteHistoryDialog":
                return <DeleteHistoryDialog />
            case "newUserDialog":
                return <NewUserDialog />
            default:
                return undefined
        }
    }

    return (
        <div className="Dialog">
        {renderDialog(detailsDialog.dialogboxType)}

        </div>    
    )
}

export default DisplayDialog;