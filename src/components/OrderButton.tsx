import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { IconButton } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSortTaskState } from "../store/slices/sortTaskSlice";

const OrderButton = () => {
    const dispatch = useDispatch<AppDispatch>()
    const sortState = useSelector((state: RootState) => state.sortState);

    const handleOrder = () => {
        dispatch(setSortTaskState({sortDirection: !sortState.sortDirection, sortingState: "interactiveOrdering"}))
    }

    // conditional rendering af knaptype
    return (
        <IconButton aria-label="Order tasks" onClick={(e) => {e.stopPropagation(); handleOrder();}} variant="ghost">
            {sortState.sortDirection ? <FaSortUp /> : <FaSortDown />}  
        </IconButton>
    )

}

export default OrderButton