import { Dialog, Button, CloseButton, Card } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { taskObject, taskEditsLog } from "../../store/states/taskObjectState";
import CheckboxMaker from "../CheckboxMaker";



const TaskDetailsDialog = () => {
    const detailsDialog = useSelector((state: RootState) => state.detailsOpener);
    const dispatch = useDispatch<AppDispatch>();

    const TaskChange = ({taskEditsLog}: {taskEditsLog: taskEditsLog}) => {
                return (
            <div >
                <Card.Root>
                    <Card.Header />
                        <Card.Body> 
                            <Card.Description>
                                <input 
                                    value={taskEditsLog.taskText} 
                                    readOnly={true} 
                                />
                            </Card.Description>
                        </Card.Body>
                    <Card.Footer>
                        <CheckboxMaker taskCompleted={taskEditsLog.taskCompleted}/>
                    </Card.Footer>
                </Card.Root>
            </div>
        )
}

const DisplayTaskChanges = ({task}: {task: taskObject | null}) => {
    if (task)
      return (
        //printer alle inputs
        task.taskEditsLog.map((taskChanges) => 
        <div key={taskChanges.uuid.toString()}> {
            <TaskChange taskEditsLog={taskChanges}/>
        } 
        </div>
        ))
}


    return (
        <>
            <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header><Dialog.Body>
                    <DisplayTaskChanges task={detailsDialog.taskObject} />
                </Dialog.Body><Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                </Dialog.Footer><Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </Dialog.CloseTrigger>
            
        </>
    )
}
export default TaskDetailsDialog