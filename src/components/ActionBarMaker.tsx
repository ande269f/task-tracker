import { SettingsButtonMaker } from "./SettingsButtonMaker";
import OrderButton from "./OrderButton"
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSortDirection } from "../store/slices/sortTaskSlice";


export const ActionBarMaker = () => {
        const dispatch = useDispatch<AppDispatch>()
        const sortState = useSelector((state: RootState) => state.sortState);

        const handleOrder = () => {
        dispatch(setSortDirection({sortDirection: !sortState.sortDirection}))
        }

        const handleSettings = () => {
            console.log("hej");
        }

    return (
        <Flex>
            <OrderButton handleOrder={handleOrder}/>
            <SettingsButtonMaker handleSettings={handleSettings}/>
        </Flex>
    )
}