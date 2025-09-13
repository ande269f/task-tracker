import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { IconButton } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSortDirection } from "../store/slices/sortTaskSlice";

const OrderButton = ({handleOrder}: {handleOrder: Function}) => {
    const sortState = useSelector((state: RootState) => state.sortState);

    // conditional rendering af knaptype
    return (
        <IconButton id="orderButton" aria-label="Order tasks" onClick={(e) => {e.stopPropagation(); handleOrder();}} variant="ghost">
            {sortState.sortDirection ? <FaSortUp /> : <FaSortDown />}  
        </IconButton>
    )

}

export default OrderButton