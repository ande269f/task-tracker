import { SettingsButton } from "./SettingsButton";
import OrderButton from "./OrderButton";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSortDirection } from "../../store/slices/sortTaskSlice/sortTaskSlice";
import RemoveCompletedTasksButton from "./RemoveCompletedTasksButton";
import "./style.scss"

export const TaskPageActions = () => {
        const dispatch = useDispatch<AppDispatch>()
        const sortState = useSelector((state: RootState) => state.sortState);
        const tasks = useSelector((state: RootState) => state.form)

        const handleOrder = () => {
        dispatch(setSortDirection({sortDirection: !sortState.sortDirection}))
        }

        const completedTasks = tasks.tasks.filter((task) => task.taskCompleted)
        


    return (
        <Flex className="TaskPageActions">
            <OrderButton handleOrder={handleOrder}/>
            <SettingsButton />
            <RemoveCompletedTasksButton />
            
        </Flex>
    )
}