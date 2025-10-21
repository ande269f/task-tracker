import { SettingsButton } from "./SettingsButton";
import OrderButton from "./OrderButton";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSortDirection } from "../../store/slices/sortTaskSlice/sortTaskSlice";
import "./style.scss"

export const TaskPageActions = () => {
        const dispatch = useDispatch<AppDispatch>()
        const sortState = useSelector((state: RootState) => state.sortState);
        const handleOrder = () => {
        dispatch(setSortDirection({sortDirection: !sortState.sortDirection}))
        }
    return (
        <Flex className="TaskPageActions" display={"inline-flex"} flexDirection={"row-reverse"}>
            <OrderButton handleOrder={handleOrder}/>
            <SettingsButton />
        </Flex>
    )
}